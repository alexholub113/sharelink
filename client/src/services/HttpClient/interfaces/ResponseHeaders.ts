export interface ResponseHeaders {
    get(name: string): string | null;

    has(name: string): boolean;
}