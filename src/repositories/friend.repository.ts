// friend.repository.ts

import pool from '../config/database';
import { CreateFriendInput, Friend, UpdateFriendInput } from '../models/friend.model';

const COLUMNS: string =
    'id, user_id, name_identifier, name_full, description, created_at, updated_at';

export async function findAllFriends(): Promise<Friend[]> {
    const result = await pool.query<Friend>(`SELECT ${COLUMNS} FROM friends ORDER BY id`);

    return result.rows;
}

export async function findFriendById(id: number): Promise<Friend | null> {
    const result = await pool.query<Friend>(`SELECT ${COLUMNS} FROM friends WHERE id = $1`, [id]);

    return result.rows[0] ?? null;
}

export async function createFriend(input: CreateFriendInput): Promise<Friend> {
    const result = await pool.query<Friend>(
        `INSERT INTO friends (user_id, name_identifier, name_full, description)
         VALUES ($1, $2, $3, $4)
         RETURNING ${COLUMNS}`,
        [
            input.user_id ?? null,
            input.name_identifier,
            input.name_full ?? null,
            input.description ?? null,
        ]
    );

    return result.rows[0];
}

export async function updateFriend(id: number, input: UpdateFriendInput): Promise<Friend | null> {
    // Build the SET clause from fixed column names, so user data never becomes SQL.
    const fields: string[] = [];
    const values: unknown[] = [];

    if (input.user_id !== undefined) {
        values.push(input.user_id);
        fields.push(`user_id = $${values.length}`);
    }

    if (input.name_identifier !== undefined) {
        values.push(input.name_identifier);
        fields.push(`name_identifier = $${values.length}`);
    }

    if (input.name_full !== undefined) {
        values.push(input.name_full);
        fields.push(`name_full = $${values.length}`);
    }

    if (input.description !== undefined) {
        values.push(input.description);
        fields.push(`description = $${values.length}`);
    }

    // The validator rejects an empty input, but keep this guard near the SQL.
    if (fields.length === 0) {
        return findFriendById(id);
    }

    values.push(id);

    const result = await pool.query<Friend>(
        `UPDATE friends
         SET ${fields.join(', ')}
         WHERE id = $${values.length}
         RETURNING ${COLUMNS}`,
        values
    );

    return result.rows[0] ?? null;
}

export async function deleteFriend(id: number): Promise<boolean> {
    const result = await pool.query(`DELETE FROM friends WHERE id = $1`, [id]);

    return (result.rowCount ?? 0) > 0;
}
