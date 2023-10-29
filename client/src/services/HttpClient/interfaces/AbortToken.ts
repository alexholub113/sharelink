export type AbortCallback = () => void;

export interface AbortToken {
    isAborted: boolean;
    onAbort(cb: AbortCallback): void;
    abort(): void;
}