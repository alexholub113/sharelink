import { HttpResponse } from '../interfaces/HttpResponse.ts';

export interface ResponseInterceptor {
    fulfilled?: (response: HttpResponse<unknown>) => Promise<void>;
    rejected?: (error: Error) => Promise<{ handled: boolean }>;
}