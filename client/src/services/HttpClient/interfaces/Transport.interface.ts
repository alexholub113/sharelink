import { HttpRequestOptions } from './HttpRequestOptions';
import { HttpResponse } from './HttpResponse';

export default interface TransportInterface<RequestOptions> {
    request: <T>(url: string, config: RequestOptions) => Promise<HttpResponse<T>>;
    get: <T>(path: string) => Promise<HttpResponse<T>>;
    put<TRequestBody, TResponse>(url: string, body: TRequestBody | undefined): Promise<HttpResponse<TResponse>>;
    post: <TResponse, TBody>(path: string, body: TBody | undefined) => Promise<HttpResponse<TResponse>>;
    delete<T>(url: string): Promise<HttpResponse<T>>;
}
export type TransportRequestOptions<RequestOptions> = RequestOptions & {
    boundedContext?: string;
};
export type TransportClient = TransportInterface<HttpRequestOptions>;

export type Transport = TransportInterface<TransportRequestOptions<HttpRequestOptions>>;