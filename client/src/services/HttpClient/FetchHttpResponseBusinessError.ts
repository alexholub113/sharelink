class FetchHttpResponseBusinessError extends Error {
    public readonly code: string;
    constructor(code: string, message?: string) {
        super(message);

        this.code = code;
    }
}

export default FetchHttpResponseBusinessError;