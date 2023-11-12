import TransportInterface from './interfaces/Transport.interface.ts';
import { HttpResponse } from './interfaces/HttpResponse.ts';
import FetchHttpResponseError from './errors/FetchHttpResponseError.ts';
import FetchHttpResponse from './FetchHttpResponse.ts';
import { ResponseInterceptor } from './Interceptors';
import BrowserUnauthorizedResponseInterceptor
    from './Interceptors/BrowserUnauthorizedResponseInterceptor.ts';
import BrowserCleanAuthSessionInterceptor
    from './Interceptors/BrowserCleanAuthSessionInterceptor.ts';
import FetchHttpResponseBusinessError from './errors/FetchHttpResponseBusinessError.ts';
import FetchHttpResponseValidationError from './errors/FetchHttpResponseValidationError.ts';

const responseInterceptors: ResponseInterceptor[] = [
    new BrowserCleanAuthSessionInterceptor(),
    new BrowserUnauthorizedResponseInterceptor(),
];
export default class HttpClient implements TransportInterface<RequestInit> {

    public post<TRequestBody, TResponse>(url: string, body: TRequestBody): Promise<HttpResponse<TResponse>> {
        const headers = new Headers();
        headers.append('content-type', 'application/json');
        return this.request(url, { body: JSON.stringify(body), method: 'POST', headers });
    }

    public get<T>(url: string): Promise<HttpResponse<T>> {
        return this.request(url, { method: 'GET' });
    }

    public async request<T = unknown>(url: string, config: RequestInit): Promise<HttpResponse<T>> {
        return await responseInterceptors.reduce(async (promise, responseInterceptor) => {
            try {
                const result = await promise;
                if (responseInterceptor.fulfilled) {
                    await responseInterceptor.fulfilled(result);
                }

                return result;
            } catch (error) {
                if (error instanceof Error && responseInterceptor.rejected) {
                    const result = await responseInterceptor.rejected(error);
                    (error as FetchHttpResponseError).handled = result.handled;
                }
                throw (error);
            }
        }, this.requestInternal<T>(url, config));
    }

    private async requestInternal<T = unknown>(url: string, config: RequestInit): Promise<HttpResponse<T>> {
        const response = await fetch(url, {...config, credentials: 'include' });

        await this.handleResponseErrorIfAny(response);

        return FetchHttpResponse.create<T>(response);
    }

    private async handleResponseErrorIfAny(response: Response): Promise<void> {
        const ERROR_HEADER = 'z-error-code';
        if (response.ok && !response.headers.has(ERROR_HEADER)) {
            return;
        }

        const responseBody = await response.text();

        if (responseBody) {
            let error = null;
            try {
                error = JSON.parse(responseBody)
            } catch (e: any) {
            }

            if (error && error.status === 400) {
                switch (error.type) {
                    case 'validation_error':
                        throw new FetchHttpResponseValidationError(error.errors);
                    case 'business_error':
                        throw new FetchHttpResponseBusinessError(error.code, error.message);
                }
            }
        }

        throw new FetchHttpResponseError('Request error', response.status);
    }
}