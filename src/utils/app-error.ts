// app-error.ts

// An error with an HTTP status code. The error middleware sends this error to the client.
export class AppError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
    }
}
