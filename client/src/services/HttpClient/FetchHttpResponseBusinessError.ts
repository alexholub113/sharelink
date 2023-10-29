class FetchHttpResponseBusinessError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default FetchHttpResponseBusinessError;