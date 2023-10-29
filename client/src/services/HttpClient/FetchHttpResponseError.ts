export default class FetchHttpResponseError extends Error {
    public readonly status: number;

    public readonly code: string;

    public readonly details: object;

    constructor(message: string, status: number, details: object) {
        super(message);
        this.status = status;
        this.details = details;
        this.code = this.constructor.name;
    }
}