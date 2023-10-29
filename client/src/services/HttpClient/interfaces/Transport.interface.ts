import { HttpRequestOptions } from './HttpRequestOptions';
import { HttpResponse } from './HttpResponse';

export default interface TransportInterface<RequestOptions> {
    request: <T>(url: string, config: RequestOptions) => Promise<HttpResponse<T>>;
    get: <T>(path: string) => Promise<HttpResponse<T>>;
    post: <TResponse, TBody>(path: string, body: TBody) => Promise<HttpResponse<TResponse>>;
}
export type TransportRequestOptions<RequestOptions> = RequestOptions & {
    boundedContext?: string;
};
export type TransportClient = TransportInterface<HttpRequestOptions>;

export type Transport = TransportInterface<TransportRequestOptions<HttpRequestOptions>>;