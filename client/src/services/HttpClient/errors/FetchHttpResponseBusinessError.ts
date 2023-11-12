import FetchHttpResponseError from './FetchHttpResponseError.ts';

class FetchHttpResponseBusinessError extends FetchHttpResponseError {
    constructor(code: string, message: string) {
        super(message, 400, code);
    }
}

export default FetchHttpResponseBusinessError;