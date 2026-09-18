# Sanctuary Pastor — Paddle Live Account Status

Created/verified against the **live** Paddle API on the current date. All objects were created programmatically in your live account.

## Products (already existed)

| Product ID | Name |
| ---------- | ---- |
| `pro_01m2tccc378nwhpmg32p6z9mfy` | Weekly |
| `pro_01m2tcdbk145gvjwwvzpwv4kd7` | Monthly |
| `pro_01m2tce3qq0z74t5vzr0wzvc7y` | Yearly |

## Prices (created — status: active)

| Plan | Price ID | Amount | Billing cycle |
| ---- | -------- | ------ | ------------- |
| Weekly | `pri_01m2tf9kms7nsmqx6ew0zeejzh` | $9.99 USD | every 7 days |
| Monthly | `pri_01m2tfa62bgv6ptt5b1sb5awez` | $25.00 USD | every month |
| Yearly | `pri_01m2tfab8b676df0bfhhmg11mc` | $100.00 USD | every year |

These are mapped in `.env`:
- `VITE_PADDLE_PRICE_WEEKLY` / `PADDLE_PRICE_WEEKLY`
- `VITE_PADDLE_PRICE_MONTHLY` / `PADDLE_PRICE_MONTHLY`
- `VITE_PADDLE_PRICE_YEARLY` / `PADDLE_PRICE_YEARLY`

## Webhook notification destination (created)

- ID: `ntfset_01m2tfez3vhhqc0m0g6c9q5sj0`
- Destination: `https://SanctuaryPastor.com/api/paddle-webhook`
- Subscribed: transaction.completed, transaction.billed, transaction.payment_failed, subscription.created, subscription.activated, subscription.updated, subscription.canceled, subscription.past_due, subscription.paused, subscription.resumed, subscription.trialing
- Secret (in `.env` → `PADDLE_WEBHOOK_SECRET_KEY`): `pdl_ntfset_...` — keep private

## Client-side token (created)

- ID: `ctkn_01m2tfgee7v33x3x9ysf22whhc`
- Token (in `.env` → `VITE_PADDLE_CLIENT_TOKEN`): `live_4685d6f936b7eae3acc46dc5415`
- Safe to be public (client-side tokens are meant for browser use).

## API key

- `PADDLE_API_KEY` in `.env` — used server-side for `/api/paddle-verify`.

## Verification completed

- Webhook rejects malformed/missing signatures (401/400/408) and accepts valid HMAC-SHA256 signed payloads (200).
- `/api/paddle-verify` parses JSON body and validates transaction IDs.
- `npm run lint` and `npm run build` both pass.

## Remaining to do

1. Deploy the updated `server.ts` (webhook + verify routes) to Vercel/the host.
2. Make sure Vercel env vars include all `*.env` values (use the **live** values now, since the account is live).
3. Confirm `https://SanctuaryPastor.com/api/paddle-webhook` is reachable before going live with real traffic.
4. Optional: persist subscription state in a real database (the project currently gates premium access via browser localStorage — not secure for production entitlements).