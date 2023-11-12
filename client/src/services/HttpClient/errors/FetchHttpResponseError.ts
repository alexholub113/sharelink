export default class FetchHttpResponseError extends Error {
    public readonly status: number;

    public readonly code: string;

    public handled = false;

    constructor(message: string, status: number, code?: string) {
        super(message);
        this.status = status;
        this.code = code ?? this.constructor.name;
    }
}