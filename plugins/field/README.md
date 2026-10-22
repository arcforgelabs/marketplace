# Field

## OpenClaw

The OpenClaw product integration is the native plugin at `plugins/field/openclaw` (`@arcforgelabs/openclaw-field`). The operator points it at their Field origin and authenticates with `openclaw mcp login`. Quote and catalog tools come from Field MCP. Do not install a Field CLI or long-lived bearer into an OpenClaw Gateway.

See `plugins/field/openclaw/README.md`.

## Portable lane (not listed)

This folder also holds a Field CLI and operating skill for coding agents. The marketplace catalogs no longer list it, so Codex, Claude Code and Cursor do not offer it. To use it, run `node plugins/field/scripts/install-field-cli.js` from a checkout of this repo.

## Authenticate

Authenticate once in your own terminal, using your Field service origin:

```bash
field auth login --url https://field.example.com
```

Enter the service key through the hidden prompt. It is stored locally at `~/.config/field/token` with user-only permissions. Never commit it, paste it into a conversation, or add it to this plugin.

## Verify setup

```bash
field auth status
field email-templates list
field email-templates show invoice standard
```

Setup is complete only when `field auth status` identifies the expected service account and `field email-templates list` returns the live template catalogue. If either fails, repair setup before operational work begins.

## Updates

- **Codex:** run `codex plugin marketplace upgrade arc-forge-agents`, then update Field.
- **Claude Code:** run `/plugin marketplace update arc-forge-agents`, then update Field in `/plugin`.
- **Cursor:** enable Auto Refresh on the imported marketplace.

Start a new agent conversation after updating.
