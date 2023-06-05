export declare class UserinfoError extends Error {
    message: string;
    code: number;
    constructor(message: string, code: number);
    getErrorMessage(): string;
}
