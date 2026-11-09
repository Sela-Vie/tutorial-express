# Friends API

Base URL: `http://localhost:3100`

All requests and responses use JSON. Send `Content-Type: application/json` with a request body.

The `friends` table comes from the migration `migrations/1794222567521_create-friends-table.ts`. A friend can belong to a row in `users` through `user_id`. `user_id` is nullable, so you can use this API without login.

## Response format

A successful response has this shape:

```json
{
  "success": true,
  "data": {}
}
```

An error response has this shape:

```json
{
  "success": false,
  "error": "Message"
}
```

## Friend object

| Field | Type | Notes |
|-|-|-|
| `id` | integer | Primary key. Read-only. |
| `user_id` | integer or null | Optional. Must reference an existing user when set. |
| `name_identifier` | string | Required. Maximum 200 characters. |
| `name_full` | string or null | Optional. Maximum 200 characters. |
| `description` | string or null | Optional. Text. |
| `created_at` | timestamp | Set by the database. Read-only. |
| `updated_at` | timestamp | Set by a database trigger on each update. Read-only. |

## Endpoints

| Method | Path | Action | Success |
|-|-|-|-|
| GET | `/friends` | List all friends | 200 |
| GET | `/friends/:id` | Get one friend | 200 |
| POST | `/friends` | Create a friend | 201 |
| PATCH | `/friends/:id` | Update one or more fields | 200 |
| DELETE | `/friends/:id` | Delete a friend | 200 |

### GET /friends

Return all friends, ordered by `id`.

```bash
curl http://localhost:3100/friends
```

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": null,
      "name_identifier": "ada",
      "name_full": "Ada Lovelace",
      "description": "first friend",
      "created_at": "2026-11-09T14:07:42.191Z",
      "updated_at": "2026-11-09T14:07:42.191Z"
    }
  ]
}
```

### GET /friends/:id

Return one friend.

```bash
curl http://localhost:3100/friends/1
```

| Status | Cause |
|-|-|
| 200 | The friend exists |
| 400 | The id is not a positive integer |
| 404 | The friend does not exist |

### POST /friends

Create a friend. `name_identifier` is required. `user_id`, `name_full`, and `description` are optional. Omit `user_id` or send `null` to create a friend with no owner.

```bash
curl -X POST http://localhost:3100/friends \
  -H 'Content-Type: application/json' \
  -d '{
    "name_identifier": "ada",
    "name_full": "Ada Lovelace",
    "description": "first friend"
  }'
```

```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": null,
    "name_identifier": "ada",
    "name_full": "Ada Lovelace",
    "description": "first friend",
    "created_at": "2026-11-09T14:07:42.191Z",
    "updated_at": "2026-11-09T14:07:42.191Z"
  }
}
```

| Status | Cause |
|-|-|
| 201 | The friend was created |
| 400 | The body is invalid, or a non-null `user_id` does not reference an existing user |

### PATCH /friends/:id

Update one or more fields. Send at least one field. A field that you do not send keeps its current value. Send `null` for `user_id`, `name_full`, or `description` to clear that field.

```bash
curl -X PATCH http://localhost:3100/friends/1 \
  -H 'Content-Type: application/json' \
  -d '{"description": "updated friend"}'
```

```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": null,
    "name_identifier": "ada",
    "name_full": "Ada Lovelace",
    "description": "updated friend",
    "created_at": "2026-11-09T14:07:42.191Z",
    "updated_at": "2026-11-09T14:07:42.220Z"
  }
}
```

| Status | Cause |
|-|-|
| 200 | The friend was updated |
| 400 | The body is invalid, no field was sent, or a non-null `user_id` does not reference an existing user |
| 404 | The friend does not exist |

### DELETE /friends/:id

Delete one friend.

```bash
curl -X DELETE http://localhost:3100/friends/1
```

```json
{
  "success": true,
  "data": null
}
```

| Status | Cause |
|-|-|
| 200 | The friend was deleted |
| 400 | The id is not a positive integer |
| 404 | The friend does not exist |

## Validation rules

| Field | Rule |
|-|-|
| `user_id` | Optional. Must be `null` or a positive integer. |
| `name_identifier` | Must be a string. The trimmed value must not be empty. Maximum 200 characters. |
| `name_full` | Must be a string or `null`. The trimmed value must not be empty. Maximum 200 characters. |
| `description` | Must be a string or `null`. The trimmed value must not be empty. No maximum length. |
| Body | Must be a JSON object, not an array or a primitive value. |
| PATCH body | Must hold at least one of the fields above. |

The validator trims spaces from string values before it saves them.

## Error messages

| Status | Message |
|-|-|
| 400 | `The request body is not valid JSON` |
| 400 | `The request body must be a JSON object` |
| 400 | `user_id must be a positive integer` |
| 400 | `name_identifier must be a string` |
| 400 | `name_identifier must not be empty` |
| 400 | `name_identifier must have at most 200 characters` |
| 400 | `Send at least one field to update` |
| 400 | `The friend id must be a positive integer` |
| 400 | `The related user does not exist` |
| 404 | `Friend <id> does not exist` |
| 409 | `A record with the same value already exists` |
| 500 | `Internal server error` |

A 409 can occur only if a unique constraint is added to the `friends` table later. The current schema has no unique constraint on this table.
