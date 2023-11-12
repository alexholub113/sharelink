import FetchHttpResponseBusinessError from '../services/HttpClient/errors/FetchHttpResponseBusinessError.ts';
import FetchHttpResponseError from '../services/HttpClient/errors/FetchHttpResponseError.ts';
import FetchHttpResponseValidationError from '../services/HttpClient/errors/FetchHttpResponseValidationError.ts';

export const handleError = (error: unknown): { errorMessage?: string } => {
    if (error instanceof FetchHttpResponseBusinessError) {
        return {
            errorMessage: error.message
        };
    }

    if (error instanceof FetchHttpResponseValidationError) {
        const validationError = error as FetchHttpResponseValidationError;
        return {
            errorMessage: validationError.errors[0],
        };
    }

    if (error instanceof FetchHttpResponseError) {
        if (error.handled) {
            return {};
        }
        return {
            errorMessage: error.message
        };
    }

    return {
        errorMessage: "Server failed to process the request"
    };
}