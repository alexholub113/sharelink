import { HttpResponse } from './interfaces/HttpResponse';
import { ResponseHeaders } from './interfaces/ResponseHeaders';
import FetchResponseHeaders from './FetchResponseHeaders';
import ContentTypes from './ContentTypes.ts';

export default class FetchHttpResponse<T> implements HttpResponse<T> {
    public readonly status: number;

    public readonly headers: ResponseHeaders;

    public readonly statusText: string;

    public readonly url: string;

    public readonly ok: boolean;

    public readonly data: T;

    constructor(private fetchResponse: Response, responseData: T) {
        this.headers = new FetchResponseHeaders(this.fetchResponse.headers);
        this.status = this.fetchResponse.status;
        this.statusText = this.fetchResponse.statusText;
        this.url = this.fetchResponse.url;
        this.ok = this.fetchResponse.ok;
        this.data = responseData;
    }

    public json<T>(): Promise<T> {
        // eslint-disable-next-line no-console
        console.warn('[response.json()] is deprecated and is a subject to removal in a future major release. '
            + 'Please use [response.data] property instead');
        // eslint-enable-next-line no-console

        return (typeof this.data !== 'undefined') ? Promise.resolve(this.data) : this.fetchResponse.json();
    }

    public static async create<T>(fetchResponse: Response): Promise<FetchHttpResponse<T>> {
        const responseData = await FetchHttpResponse.parseBody<T>(fetchResponse);
        return new FetchHttpResponse<T>(fetchResponse, responseData);
    }

    private static async parseBody<T>(fetchResponse: Response): Promise<T> {
        const contentType = fetchResponse.headers.get('Content-Type');

        if (!contentType) {
            // eslint-disable-next-line no-console
            console.warn('Received Content-Type is empty');
            // eslint-enable-next-line no-console
            return undefined as unknown as T;
        }

        if (contentType.toLowerCase().includes(ContentTypes.JSON)) {
            return fetchResponse.json();
        }

        // eslint-disable-next-line no-console
        console.warn(`Received unsupported Content-Type: "${contentType || ''}"`);
        // eslint-enable-next-line no-console

        return undefined as unknown as T;
    }
}