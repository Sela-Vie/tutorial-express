import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('users', {
        id: 'id', // shorthand for serial primary key
        email: {
            type: 'varchar(255)',
            notNull: true,
            unique: true,
        },
        password_hash: {
            type: 'text',
            notNull: true,
        },
        user_name: {
            type: 'varchar(100)',  
        },
        age: {
            type: 'integer',
            check: 'age >= 0',
        },
        is_active: {
            type: 'boolean',
            notNull: true,
            default: true,
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });

    // The UNIQUE constraint on email already creates an index, so no extra index is needed.

    // Example of a related table with a foreign key
    pgm.createTable('friends', {
        id: 'id',
        user_id: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'CASCADE',
        },
        name_identifier: { 
            type: 'varchar(200)', 
            notNull: true 
        },
        name_full: { 
            type: 'varchar(200)', 
            notNull: false 
        },
        description: { 
            type: 'text' 
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    pgm.createIndex('friends', 'user_id');

    // One function sets updated_at on every UPDATE. Both tables use it.
    pgm.createFunction(
        'set_updated_at',
        [],
        {
            returns: 'trigger',
            language: 'plpgsql',
            replace: true,
        },
        `
        BEGIN
            NEW.updated_at = current_timestamp;
            RETURN NEW;
        END;
        `
    );

    pgm.createTrigger('users', 'users_set_updated_at', {
        when: 'BEFORE',
        operation: 'UPDATE',
        level: 'ROW',
        function: 'set_updated_at',
    });

    pgm.createTrigger('friends', 'friends_set_updated_at', {
        when: 'BEFORE',
        operation: 'UPDATE',
        level: 'ROW',
        function: 'set_updated_at',
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    // Drop the triggers first, then the function they call.
    pgm.dropTrigger('friends', 'friends_set_updated_at');
    pgm.dropTrigger('users', 'users_set_updated_at');
    pgm.dropFunction('set_updated_at', []);

    // Drop the child table first because of the foreign key.
    pgm.dropTable('friends');
    pgm.dropTable('users');
}
