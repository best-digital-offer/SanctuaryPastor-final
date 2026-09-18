# Sanctuary Pastor — Paddle Sandbox Setup

The pricing page now uses Paddle Checkout instead of the previous simulated card form. The realistic fictional AI pastor experience is unchanged.

## 0. Connect the Paddle MCP server

The Paddle MCP server gives your AI agent direct access to your Paddle account so it can create products/prices, configure webhooks, and simulate events. See <https://developer.paddle.com/sdks/ai/paddle-mcp/>.

This project already includes the connection config:

- `opencode.json` — for opencode (uses `{env:PADDLE_SANDBOX_API_KEY}`)
- `.mcp.json` — for VS Code / Cursor / any `mcpServers`-compatible client

Set `PADDLE_SANDBOX_API_KEY` (sandbox keys start with `pdl_sdbx_`) in your shell profile or IDE. Restart your AI client after changing MCP config.

Example prompt you can give your agent:

> Using paddle-sandbox, create three Sanctuary Pastor subscription plans: Weekly at $9.99 USD every 7 days, Monthly at $25 USD every 1 month, and Yearly at $100 USD every 1 year. Use the SaaS tax category. Return the resulting product and price IDs in a table. Do not create anything in live.

## 1. Create the three Paddle products/prices

Create recurring prices in Paddle Sandbox:

- Weekly: USD 9.99 every 7 days
- Monthly: USD 25 every 1 month
- Yearly: USD 100 every 1 year

## 2. Create a client-side token

In Paddle Sandbox, create a client-side token and put it into:

`VITE_PADDLE_CLIENT_TOKEN`

This token is intended for frontend checkout use. Never put a Paddle API key into a VITE_ variable.

## 3. Add the three price IDs

Set:

`VITE_PADDLE_PRICE_WEEKLY=pri_...`
`VITE_PADDLE_PRICE_MONTHLY=pri_...`
`VITE_PADDLE_PRICE_YEARLY=pri_...`

## 4. Configure the webhook endpoint

Create a Paddle notification destination pointing to:

`https://SanctuaryPastor.com/api/paddle-webhook`

Subscribe at minimum to:

- transaction.completed
- subscription.created
- subscription.updated
- subscription.canceled
- subscription.past_due
- subscription.paused
- subscription.resumed

Copy the notification destination secret into:

`PADDLE_WEBHOOK_SECRET_KEY`

The endpoint is registered in both the Express server (`server.ts`) and the Vercel serverless runtime (`api/paddle-webhook.ts`). It verifies Paddle's `Paddle-Signature` using HMAC-SHA256 and a short timestamp tolerance before accepting the event.

> Note: The Express server registers `/api/paddle-webhook` with a raw-body parser before `express.json()` so signature verification works in local/dev use too.

## 5. Transaction verification

After `checkout.completed`, the client calls `POST /api/paddle-verify` (registered in both `server.ts` and `api/paddle-verify.ts`) with `{ transactionId, email, userId }`. It looks the transaction up via the Paddle REST API, checks status/customer/identity, and returns the resolved `plan`.

Requires `PADDLE_API_KEY` (sandbox `pdl_sdbx_...`).

## 6. Vercel variables

Add the same variables under Vercel Project Settings > Environment Variables:

- `VITE_PADDLE_CLIENT_TOKEN`
- `VITE_PADDLE_PRICE_WEEKLY`
- `VITE_PADDLE_PRICE_MONTHLY`
- `VITE_PADDLE_PRICE_YEARLY`
- `VITE_PADDLE_ENVIRONMENT` (sandbox)
- `PADDLE_API_KEY`
- `PADDLE_WEBHOOK_SECRET_KEY`
- `PADDLE_ENVIRONMENT` (sandbox)
- `PADDLE_PRICE_WEEKLY`, `PADDLE_PRICE_MONTHLY`, `PADDLE_PRICE_YEARLY`

Use Sandbox values for Preview/Development. Only switch to production values after Paddle approves the merchant account and the live domain/payment configuration.

## Important production note

This current project stores user/subscription state in browser localStorage. The Paddle checkout and signed webhook endpoint are integrated, but a truly production-grade entitlement system should persist Paddle customer/subscription status in a server-side database and grant/revoke premium access from webhook events. Do not treat a browser-only `isPaid` flag as a secure entitlement mechanism.
