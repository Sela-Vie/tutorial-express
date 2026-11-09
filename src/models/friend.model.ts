// friend.model.ts

// A friend row as the database returns it.
export type Friend = {
    id: number;
    user_id: number | null;
    name_identifier: string;
    name_full: string | null;
    description: string | null;
    created_at: Date;
    updated_at: Date;
};

// The fields that a POST request must or can send.
export type CreateFriendInput = {
    user_id?: number | null;
    name_identifier: string;
    name_full?: string | null;
    description?: string | null;
};

// Every field is optional because PATCH changes only the fields that it receives.
export type UpdateFriendInput = {
    user_id?: number | null;
    name_identifier?: string;
    name_full?: string | null;
    description?: string | null;
};
