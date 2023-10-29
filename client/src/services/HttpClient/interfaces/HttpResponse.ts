import { ResponseHeaders } from './ResponseHeaders';

export interface HttpResponse<T = any> {
    readonly status: number;
    readonly headers: ResponseHeaders;
    readonly statusText?: string;
    readonly url: string;
    readonly ok: boolean;
    readonly data: T;
    json<T>(): Promise<T>;
}