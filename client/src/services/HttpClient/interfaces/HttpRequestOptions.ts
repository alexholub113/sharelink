import { AbortToken } from './AbortToken';
import { RequestHeaders } from '../RequestHeaders.ts';

type RequestCredentials = 'omit' | 'same-origin' | 'include';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';

type HeadersObj = Record<string, string>;
// TODO: change HeadersObj to native Headers class, as current implementation may lead to tricky bugs as
//  HTTP headers are case insensitive while JS object keys are case sensitive
type RequestHeadersModifier = (headersModifierData: { headers?: HeadersObj }) => { headers?: HeadersObj };

interface HttpRequestOptionsBase {
    url?: string;
    method?: RequestMethod;
    timeout?: number;
    search?: {
        [key: string]: any | any[];
    };
    body?: any;
    abortToken?: AbortToken;
    credentials?: RequestCredentials;
    requestHeadersModifiers?: RequestHeadersModifier[];
    useReverseErrorCodeFormat?: boolean;
}

/**
 * @deprecated Please use {@link HttpRequestOptions2}
 */
export interface HttpRequestOptions extends HttpRequestOptionsBase {
    // TODO: change HeadersObj to native Headers class, as current implementation may lead to tricky bugs as
    //  HTTP headers are case insensitive while JS object keys are case sensitive
    //  However this will cause breaking change (this is public interface). So it should be planned properly.
    //  First steps for transition - done below
    headers?: HeadersObj;
}

export interface HttpRequestOptions2 extends HttpRequestOptionsBase {
    headers?: HeadersObj | RequestHeaders;
}