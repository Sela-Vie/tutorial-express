// friend.validator.ts

import { CreateFriendInput, UpdateFriendInput } from '../models/friend.model';
import { AppError } from '../utils/app-error';

// The friends table stores name_identifier and name_full as varchar(200).
const MAX_NAME_LENGTH = 200;

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readBody(body: unknown): Record<string, unknown> {
    if (!isRecord(body)) {
        throw new AppError(400, 'The request body must be a JSON object');
    }

    return body;
}

function readString(value: unknown, field: string, maxLength?: number): string {
    if (typeof value !== 'string') {
        throw new AppError(400, `${field} must be a string`);
    }

    const trimmed: string = value.trim();

    if (trimmed === '') {
        throw new AppError(400, `${field} must not be empty`);
    }

    if (maxLength !== undefined && trimmed.length > maxLength) {
        throw new AppError(400, `${field} must have at most ${maxLength} characters`);
    }

    return trimmed;
}

function readNullableString(value: unknown, field: string, maxLength?: number): string | null {
    if (value === null) {
        return null;
    }

    return readString(value, field, maxLength);
}

function readPositiveInteger(value: unknown, field: string): number {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
        throw new AppError(400, `${field} must be a positive integer`);
    }

    return value;
}

function readNullablePositiveInteger(value: unknown, field: string): number | null {
    if (value === null) {
        return null;
    }

    return readPositiveInteger(value, field);
}

export function parseFriendId(value: unknown): number {
    const id: number = typeof value === 'string' ? Number(value) : Number.NaN;

    if (!Number.isInteger(id) || id < 1) {
        throw new AppError(400, 'The friend id must be a positive integer');
    }

    return id;
}

export function parseCreateFriendInput(body: unknown): CreateFriendInput {
    const data: Record<string, unknown> = readBody(body);

    const input: CreateFriendInput = {
        name_identifier: readString(data.name_identifier, 'name_identifier', MAX_NAME_LENGTH),
    };

    // user_id is optional because the friends table allows NULL for local testing without login.
    if (data.user_id !== undefined) {
        input.user_id = readNullablePositiveInteger(data.user_id, 'user_id');
    }

    if (data.name_full !== undefined) {
        input.name_full = readNullableString(data.name_full, 'name_full', MAX_NAME_LENGTH);
    }

    if (data.description !== undefined) {
        input.description = readNullableString(data.description, 'description');
    }

    return input;
}

export function parseUpdateFriendInput(body: unknown): UpdateFriendInput {
    const data: Record<string, unknown> = readBody(body);
    const input: UpdateFriendInput = {};

    if (data.user_id !== undefined) {
        input.user_id = readNullablePositiveInteger(data.user_id, 'user_id');
    }

    if (data.name_identifier !== undefined) {
        input.name_identifier = readString(data.name_identifier, 'name_identifier', MAX_NAME_LENGTH);
    }

    if (data.name_full !== undefined) {
        input.name_full = readNullableString(data.name_full, 'name_full', MAX_NAME_LENGTH);
    }

    if (data.description !== undefined) {
        input.description = readNullableString(data.description, 'description');
    }

    if (Object.keys(input).length === 0) {
        throw new AppError(400, 'Send at least one field to update');
    }

    return input;
}
