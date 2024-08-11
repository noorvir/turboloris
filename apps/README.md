# Yotai

## v1

- Store metadata about tables in postgres postgres 
- Wrapper to create/modify tables in sqlite for user

### API

The Yotai API lets the user interact 

- `GET /account`
- `GET /lists`
- `POST /lists`
- `POST /lists/query`
- `GET /store?path=/path/to/item`
- `PUT /store`
- `POST /events`
- `GET /apps`
- `POST /apps`


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