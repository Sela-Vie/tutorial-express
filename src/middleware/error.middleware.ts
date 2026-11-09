// error.middleware.ts

import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error';

// The PostgreSQL error fields that this middleware reads.
type DatabaseError = Error & {
    code?: string;
    detail?: string;
};

function sendError(res: Response, statusCode: number, message: string): void {
    res.status(statusCode).json({
        success: false,
        error: message,
    });
}

// Express identifies an error handler by its four parameters. Keep _next.
export function errorHandler(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    if (error instanceof AppError) {
        sendError(res, error.statusCode, error.message);
        return;
    }

    // express.json() throws a SyntaxError when the body is not valid JSON.
    if (error instanceof SyntaxError) {
        sendError(res, 400, 'The request body is not valid JSON');
        return;
    }

    const databaseError = error as DatabaseError;

    // 23503 = foreign key violation. The most likely cause is a missing user.
    if (databaseError.code === '23503') {
        sendError(res, 400, 'The related user does not exist');
        return;
    }

    // 23505 = unique violation.
    if (databaseError.code === '23505') {
        sendError(res, 409, 'A record with the same value already exists');
        return;
    }

    console.error(error);
    sendError(res, 500, 'Internal server error');
}
