# Yotai

## v1

1. On account creation create sqlite db for account
2. Store metadata about tables in postgres 
3. Export `/db/query` endpoint to execute sql directly on sqlite db
4. Wrapper to create/modify tables in sqlite for user

Later:
1. On account creation, create new storage bucket for user
2. Implement `/parse` endpoint
   1. Implement parser interface to process raw data into markdown 
   2. Implement transformer interface to transform markdown into one of the lists
3. Implement live react to ui

### API

The Yotai API lets the user interact 

| Method | Endpoint                  | Description                                                                                   |
|--------|---------------------------|-----------------------------------------------------------------------------------------------|
| GET    | `/account`                | Return details of the user account                                                            |
| GET    | `/lists`                  | Returns all the `lists` for the authenticated account                                         |
| POST   | `/lists`                  | Create a new list                                                                             |
| POST   | `/lists/parse`            | Parses arbitrary data submitted to the endpoint into each list that it is applicable to       |
| POST   | `/lists/query`            | Execute a `sql` or natural language query the lists                                           |
| POST   | `/lists/:listId/parse`    | Parses arbitrary data submitted to the endpoint into a specific `:listId`                     |
| GET    | `/db`                     | Provides a low level interface to the underlying db that powers lists                         |
| POST   | `/db/query`               | Takes an arbitrary `sql` query to execute on the user's db                                    |
| GET    | `/store`                  | Get details about the account store                                                           |
| GET    | `/store/items`            | Lists items from the store                                                                    |
| GET    | `/store/items/:itemId`    | Gets the details of a specific item in the store                                              |
| GET    | `/store/items/:path`      | Gets the details of an item at a given path in the store                                              |
| PUT    | `/store`                  | Upload an item                                                                                              |
| GET    | `/apps`                   |                                                                                               |
| POST   | `/apps`                   |                                                                                               |

### Stack

- Postgres (Supabase)
- Sqlite (Cloudflare D1)
- Deno (Deno sub-hosting for running user-defined code)
- Nextjs (Main webapp)
- Hono API server (Cloudflare)
- Kysely (query builder)
- Notifications (novu)
- Codemirror (code editor)
- Inngest background jobs
- OpenPanel
