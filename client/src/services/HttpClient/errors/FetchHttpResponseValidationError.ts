import FetchHttpResponseError from './FetchHttpResponseError.ts';

class FetchHttpResponseValidationError extends FetchHttpResponseError {
    constructor(public readonly errors: string[]) {
        super(errors[0], 400, "ValidationError");
    }
}

export default FetchHttpResponseValidationError;