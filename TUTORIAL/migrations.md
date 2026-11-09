### MIGRATIONS

pre requisites
```
npm install node-pg-migrate
```
note: `npm run migrate` is an alias for `node-pg-migrate`
|command|description|
|-|-|
|`npm run migrate:create "$MIGRATION_NAME"`|creates the migration file|
|`npm run migrate:up`| run all the migrations |
|`npm run migrate:up 1`| run only the next one |
|`npm run migrate:down`| roll back the last one|
|`npm run migrate:down 2`| roll back the last two |
|`npm run migrate:redo`| down then up for the last one|
|`npm run migrate:up -- --to "$MIGRATION_NAME"` | runs only that specific migration |