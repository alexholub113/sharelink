export default class FetchResponseHeaders {
    constructor(private fetchHeaders: Headers) {
    }

    public get(name: string): string | null {
        return this.fetchHeaders.get(name);
    }

    public has(name: string): boolean {
        return this.fetchHeaders.has(name);
    }
}