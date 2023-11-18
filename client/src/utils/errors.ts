import FetchHttpResponseBusinessError from '../services/HttpClient/errors/FetchHttpResponseBusinessError.ts';
import FetchHttpResponseError from '../services/HttpClient/errors/FetchHttpResponseError.ts';
import FetchHttpResponseValidationError from '../services/HttpClient/errors/FetchHttpResponseValidationError.ts';

export const handleError = (error: unknown): string | undefined => {
    if (error instanceof FetchHttpResponseBusinessError) {
        return error.message;
    }

    if (error instanceof FetchHttpResponseValidationError) {
        const validationError = error as FetchHttpResponseValidationError;
        return validationError.errors[0];
    }

    if (error instanceof FetchHttpResponseError) {
        if (error.handled) {
            return;
        }
        return error.message;
    }

    return "Server failed to process the request";
}