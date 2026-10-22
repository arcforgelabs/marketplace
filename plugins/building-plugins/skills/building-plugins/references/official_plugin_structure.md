# Official Claude Code Plugin Structure

## Required Directory Layout

Every plugin MUST have this base structure:

```
plugin-name/
├── .claude-plugin/               # Required directory
│   └── plugin.json              # Required manifest file
├── commands/                     # Optional: slash commands
├── agents/                       # Optional: subagent definitions
├── skills/                       # Optional: Agent Skills
├── hooks/                        # Optional: event handlers
│   └── hooks.json
└── .mcp.json                    # Optional: MCP server config
```

## Critical Requirements

### 1. Directory Placement

**ALL component directories MUST be at the plugin root**, NOT inside `.claude-plugin/`:

✅ **Correct**:
```
my-plugin/
├── .claude-plugin/plugin.json
├── commands/
└── skills/
```

❌ **Incorrect**:
```
my-plugin/
└── .claude-plugin/
    ├── plugin.json
    ├── commands/          # Wrong! Must be at root
    └── skills/            # Wrong! Must be at root
```

### 2. Manifest Location

The `plugin.json` file MUST be at `.claude-plugin/plugin.json` (not at root, not elsewhere).

### 3. File Paths

All paths in configuration files must be:
- **Relative** (not absolute)
- **Start with `./`** (explicit relative indicator)

Example:
```json
{
  "commands": "./commands/",
  "hooks": "./hooks/hooks.json"
}
```

### 4. Executable Permissions

Hook scripts MUST have executable permissions:

```bash
chmod +x hooks/scripts/*.sh
```

## Component Directories

### commands/

Contains markdown files that define slash commands users can invoke.

**Structure**:
```
commands/
├── deploy.md
├── test.md
└── build.md
```

**File Format**: Each .md file defines one command. File name = command name.

**Example** (`commands/deploy.md`):
```markdown
Deploy the application to the specified environment.

Usage: /deploy [environment]

Arguments:
- environment (optional): staging or production (default: staging)

Examples:
- /deploy
- /deploy production
```

### agents/

Contains markdown files that define specialized subagents.

**Structure**:
```
agents/
├── deployment-validator.md
└── test-analyzer.md
```

**File Format**: Standard Claude Code agent definition format (same as `~/.claude/agents/`).

### skills/

Contains skill directories (each with its own SKILL.md and resources).

**Structure**:
```
skills/
├── aws-patterns/
│   ├── SKILL.md
│   ├── references/
│   └── scripts/
└── deployment-strategies/
    ├── SKILL.md
    └── references/
```

**File Format**: Each subdirectory is a complete skill following standard skill structure.

**Auto-Discovery**: Skills are automatically discovered from `skills/` directory. No need to declare in `plugin.json`.

### hooks/

Contains event handler configuration and scripts.

**Structure**:
```
hooks/
├── hooks.json           # Configuration file
└── scripts/
    ├── pre_tool.sh
    └── session_start.sh
```

**Configuration** (`hooks/hooks.json`):
```json
{
  "PreToolUse": "./scripts/pre_tool.sh",
  "PostToolUse": "./scripts/post_tool.sh",
  "SessionStart": "./scripts/session_start.sh",
  "SessionEnd": "./scripts/session_end.sh"
}
```

**Available Events**:
- `PreToolUse` - Before any tool is executed
- `PostToolUse` - After any tool completes
- `SessionStart` - When session begins
- `SessionEnd` - When session ends

**Script Requirements**:
- Must have executable permissions (`chmod +x`)
- Paths in hooks.json must be relative and start with `./`
- Scripts receive event context as environment variables

### .mcp.json

MCP (Model Context Protocol) server configuration at plugin root.

**Structure**: Standard MCP configuration format.

**Example**:
```json
{
  "mcpServers": {
    "database": {
      "command": "node",
      "args": ["./mcp-servers/database/index.js"],
      "env": {
        "DB_HOST": "localhost"
      }
    }
  }
}
```

## Environment Variables

Plugins have access to:

- `${CLAUDE_PLUGIN_ROOT}` - Absolute path to the plugin directory

Use in hook scripts:
```bash
#!/bin/bash
PLUGIN_ROOT="${CLAUDE_PLUGIN_ROOT}"
echo "Running from ${PLUGIN_ROOT}"
```

## Optional vs Required

**Required**:
- `.claude-plugin/` directory
- `.claude-plugin/plugin.json` file
- `name` field in plugin.json

**Optional (include only what you need)**:
- `commands/` - If providing slash commands
- `agents/` - If providing subagents
- `skills/` - If providing domain knowledge
- `hooks/` - If providing event automation
- `.mcp.json` - If integrating external tools

**Minimum Valid Plugin**:
```
minimal-plugin/
└── .claude-plugin/
    └── plugin.json         # {"name": "minimal-plugin"}
```

## Default Paths

If you follow the standard structure, you don't need to declare paths in `plugin.json`:

**These are auto-discovered**:
- `./commands/` → Commands directory
- `./agents/` → Agents directory
- `./skills/` → Skills directory
- `./hooks/hooks.json` → Hooks configuration
- `./.mcp.json` → MCP configuration

**Only declare paths if using non-standard locations**.

## Validation Checklist

Before distribution, verify:

- [ ] `.claude-plugin/plugin.json` exists and is valid JSON
- [ ] All component directories at plugin root (not inside `.claude-plugin/`)
- [ ] All paths in config files are relative and start with `./`
- [ ] Hook scripts have executable permissions (`chmod +x`)
- [ ] No absolute paths in any configuration
- [ ] `name` field exists in plugin.json
- [ ] Skills have valid SKILL.md with frontmatter
- [ ] Commands are markdown files (.md extension)

## Common Mistakes

### 1. Component Directories Inside .claude-plugin/

❌ **Wrong**:
```
plugin/
└── .claude-plugin/
    ├── plugin.json
    └── commands/          # Wrong location!
```

✅ **Correct**:
```
plugin/
├── .claude-plugin/plugin.json
└── commands/              # Correct location!
```

### 2. Missing ./ Prefix

❌ **Wrong**:
```json
{
  "commands": "commands/",
  "hooks": "hooks/hooks.json"
}
```

✅ **Correct**:
```json
{
  "commands": "./commands/",
  "hooks": "./hooks/hooks.json"
}
```

### 3. Hook Scripts Not Executable

❌ **Wrong**:
```bash
-rw-r--r-- hooks/scripts/pre_tool.sh
```

✅ **Correct**:
```bash
-rwxr-xr-x hooks/scripts/pre_tool.sh
```

Fix with: `chmod +x hooks/scripts/*.sh`

### 4. Declaring Skills in Manifest

❌ **Unnecessary**:
```json
{
  "name": "my-plugin",
  "skills": "./skills/"      # Not needed!
}
```

✅ **Correct**:
```json
{
  "name": "my-plugin"
  // Skills are auto-discovered
}
```

## References

- [Official Plugin Documentation](https://code.claude.com/docs/en/plugins.md)
- [Plugin Reference](https://code.claude.com/docs/en/plugins-reference.md)
