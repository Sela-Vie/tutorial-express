// database.ts

import { Pool } from 'pg';

// Use DATABASE_URL when it is set. Otherwise build the config from the DB_* variables.
const connectionString: string | undefined = process.env.DATABASE_URL;

const pool: Pool = new Pool(
    connectionString
        ? { connectionString }
        : {
              host: process.env.DB_HOST ?? 'localhost',
              port: Number(process.env.DB_PORT) || 5432,
              database: process.env.DB_NAME ?? 'postgres',
              user: process.env.DB_USER_NAME ?? 'postgres',
              password: process.env.DB_PASSWORD ?? 'postgres',
          }
);

// An idle client can fail after the pool is created. Log the error and keep the process alive.
pool.on('error', (error: Error): void => {
    console.error('Unexpected database error', error);
});

export default pool;
