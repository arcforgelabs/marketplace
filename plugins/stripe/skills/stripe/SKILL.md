---
name: stripe
description: "Stripe billing: customers, invoices, subscriptions, payments."
---

# Using Stripe CLI

Full read + write access to Stripe from the terminal. Typed commands cover common reads; the `api` command is a raw passthrough to any v1 resource (create/update/delete included).

## Architecture

- **Binary**: `~/.local/bin/stripe` (install with `components/cli/install.sh stripe`)
- **Runtime**: Bun (TypeScript) — source at `components/cli/stripe`
- **Auth**: resolved via the shared **SecretsRef** mechanism (`components/cli/_shared/secretsref.ts`), in order:
  1. `STRIPE_API_KEY` — literal env var (dev/CI)
  2. `STRIPE_API_KEY_REF` — a SecretsRef env var, e.g. `bw:<item-id>#Secret Key | CLI`
  3. `~/.config/arc-forge/stripe.json` → `{ "api_key_ref": "bw:<item-id>#<field>" }` (preferred — stores a *reference*, not the key). Legacy `{ "api_key": "..." }` / `stripe-cli.json` still read.
  4. `bw:<STRIPE_BW_ITEM>` default Bitwarden item, if the vault is unlocked
- **Secrets**: the key lives in Bitwarden, not on disk. Unlock the vault so `bw` can read it: `eval "$(bitwarden-guard export)"`. **Not** OpenBao. Never print the key.
- **Note**: the command is `stripe`. If the official Stripe CLI is also installed, ensure `~/.local/bin` precedes it on `PATH`, or rename.

## CLI Reference

```bash
stripe <command> [options]
```

| Command | Description |
|---------|-------------|
| `stripe customers` | List customers |
| `stripe customers --limit 10` | Limit results |
| `stripe customer <id>` | Get customer details |
| `stripe invoices` | List invoices |
| `stripe invoices --status paid` | Filter by status |
| `stripe invoice <id>` | Get invoice with line items |
| `stripe subscriptions` | List subscriptions |
| `stripe subscriptions --status active --limit 10` | List subscriptions by status |
| `stripe overview <customer-id>` | Customer overview (details + subs + invoices) |
| `stripe health` | Check API connectivity (and live/test mode) |
| `stripe api get <path> [k=v]` | Raw GET — any v1 resource (e.g. `api get products limit=5`) |
| `stripe api post <path> [k=v]` | Raw POST — create/update (e.g. `api post products name='X'`) |
| `stripe api delete <path>` | Raw DELETE (e.g. `api delete products/prod_123`) |

`api` params use Stripe's form syntax, including bracket notation for nested fields, e.g. `'recurring[interval]=month'`, `'metadata[product_line]=dictate'`. Quote values containing spaces or brackets.

## Output

All commands output JSON to stdout. The list commands return `{ "<kind>": [ ... ] }`
(e.g. `{ "invoices": [...] }`). Errors output JSON with exit code 1.

## Gotchas

- `api post`/`api delete` MUTATE data. With a live key they hit the live account — confirm intent before running, and prefer test-mode keys for experiments.
- Uses Stripe REST API v1 with Bearer auth.
- Be explicit about live vs test mode. Object IDs can exist only in one mode; a 404 may mean the wrong key mode is active. `stripe health` reports `api_mode`.
- Invoice status: draft, open, paid, uncollectible, void.
- Reference a Bitwarden item by **id** in a SecretsRef when the name is ambiguous (`bw get` errors "More than one result"); names that appear in multiple items' URIs collide.
