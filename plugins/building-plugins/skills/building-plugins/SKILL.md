---
name: building-plugins
description: "Create Claude Code plugins: manifests, skills, hooks, MCPs."
source: user
category: meta
---

# Building Plugins

Create properly structured Claude Code plugins for distributing extensions to teams and publishing to marketplaces. This skill provides templates, validation, and guidance based on official Claude Code plugin architecture.

## Overview

Claude Code plugins are distribution packages that bundle multiple components (commands, agents, skills, hooks, MCP servers) for easy sharing and installation. This skill ensures plugins follow official structure requirements and best practices.

**Critical Distinction**: Plugins are for DISTRIBUTION (sharing with teams), NOT for personal skill organization. For managing personal skill libraries, use simple archival to `archived-skills/` directory instead.

## When to Use This Skill

Use this skill when:
- Creating a plugin to share custom workflows with a team
- Packaging related capabilities (e.g., "AWS Development Suite" with skills + commands + hooks)
- Publishing extensions to Claude Code marketplaces
- Setting up a custom plugin marketplace for team/organization
- Bundling MCP server integrations with supporting components

Do NOT use this skill for:
- Organizing personal skill libraries (use archival instead)
- Selectively loading/unloading skills to reduce context (not plugin purpose)
- "Unplugging" skill groups temporarily (plugins are additive, not subtractive)

## Core Capabilities

### 1. Plugin Structure Requirements

Every plugin MUST follow this exact structure:

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json          # REQUIRED manifest file
├── commands/                 # Optional: slash commands (markdown files)
├── agents/                   # Optional: subagent definitions (markdown files)
├── skills/                   # Optional: Agent Skills (with SKILL.md)
├── hooks/                    # Optional: event handlers
│   └── hooks.json
└── .mcp.json                # Optional: MCP server definitions
```

**Critical Requirements**:
- ALL directories MUST be at plugin root, NOT inside `.claude-plugin/`
- `plugin.json` is the ONLY required file (minimum: `{"name": "plugin-name"}`)
- All file paths must be relative and begin with `./`
- Hook scripts require executable permissions (`chmod +x`)

See `references/official_plugin_structure.md` for complete details.

### 2. Manifest Creation

Minimum valid manifest:

```json
{
  "name": "plugin-name"
}
```

Full manifest with all fields:

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "Brief plugin purpose",
  "author": "Name or Organization",
  "homepage": "https://github.com/user/plugin",
  "repository": "https://github.com/user/plugin",
  "license": "MIT",
  "keywords": ["tag1", "tag2"],

  "commands": "./commands/",
  "agents": "./agents/",
  "hooks": "./hooks/hooks.json",
  "mcpServers": "./.mcp.json"
}
```

**Note**: Skills do NOT need to be declared in manifest - they're auto-discovered from `skills/` directory.

See `references/manifest_schema.md` for field descriptions and validation rules.

### 3. Distribution Strategies

Distribute plugins via:

**GitHub (Recommended)**:
1. Push plugin to GitHub repository
2. Create `.claude-plugin/marketplace.json` in repository root
3. Users install via: `/plugin marketplace add user/repo`

**Local Testing**:
- Create test marketplace with `marketplace.json`
- Point to local plugin directory
- Test before public distribution

**Team Sharing**:
- Git repository (private or public)
- Shared filesystem
- Archive file (.zip or .tar.gz)

See `references/marketplace_guide.md` for advanced distribution strategies.

## Creating a Plugin: Step-by-Step

### Step 1: Plan Plugin Contents

Identify what components the plugin should bundle:

- **Commands**: What slash commands will users invoke? (e.g., `/deploy`, `/test`)
- **Agents**: What specialized subagents are needed? (e.g., `deployment-validator.md`)
- **Skills**: What domain knowledge should Claude have? (e.g., `aws-patterns/`)
- **Hooks**: What automation should run on events? (e.g., pre-commit linting)
- **MCP Servers**: What external tools to integrate? (e.g., database access)

Example: "React Testing Suite" plugin might include:
- Skills: `playwright-patterns/` (testing best practices)
- Commands: `/test` (run test suite), `/component` (generate test for component)
- Hooks: Pre-commit hook to run tests
- Agents: `test-debugger.md` (analyze test failures)

### Step 2: Create Directory Structure

Use the provided template as starting point:

```bash
cp -r ~/.claude/skills/building-plugins/assets/plugin-template my-plugin
cd my-plugin
```

Or create from scratch:

```bash
mkdir -p my-plugin/.claude-plugin
mkdir -p my-plugin/{commands,agents,skills,hooks}
touch my-plugin/.claude-plugin/plugin.json
```

### Step 3: Create Manifest

Edit `.claude-plugin/plugin.json` with plugin metadata:

```json
{
  "name": "react-testing-suite",
  "version": "1.0.0",
  "description": "Playwright testing patterns and automation for React projects",
  "author": "Your Name",
  "repository": "https://github.com/user/react-testing-suite",
  "license": "MIT",
  "keywords": ["react", "testing", "playwright"],

  "commands": "./commands/",
  "agents": "./agents/",
  "hooks": "./hooks/hooks.json"
}
```

**Naming Convention**: Use kebab-case (lowercase with hyphens)

### Step 4: Add Components

#### Commands (Optional)

Create markdown files in `commands/` directory:

```markdown
# commands/test.md
Run the Playwright test suite with optional filters.

Usage: /test [filter]

Examples:
- /test - Run all tests
- /test LoginPage - Run tests matching "LoginPage"
```

#### Agents (Optional)

Create agent definition markdown files in `agents/` directory (standard agent format).

#### Skills (Optional)

Create skill directories with SKILL.md in `skills/` directory:

```
skills/
└── playwright-patterns/
    ├── SKILL.md
    ├── references/
    │   └── best_practices.md
    └── scripts/
        └── setup_playwright.sh
```

Use the `skill-creator` skill to create properly structured skills.

#### Hooks (Optional)

Create `hooks/hooks.json`:

```json
{
  "PreToolUse": "./scripts/pre_tool.sh",
  "PostToolUse": "./scripts/post_tool.sh",
  "SessionStart": "./scripts/session_start.sh"
}
```

Create corresponding hook scripts and make executable:

```bash
chmod +x hooks/scripts/*.sh
```

#### MCP Servers (Optional)

Create `.mcp.json` at plugin root following MCP server configuration format.

### Step 5: Test Locally

Before distribution, test the plugin locally:

```bash
# Create local marketplace
mkdir -p test-marketplace/.claude-plugin
```

Create `test-marketplace/.claude-plugin/marketplace.json`:

```json
{
  "name": "test-marketplace",
  "owner": "your-name",
  "plugins": [
    {
      "name": "my-plugin",
      "source": "../my-plugin",
      "description": "Test plugin",
      "version": "1.0.0"
    }
  ]
}
```

Add marketplace and install plugin:

```bash
/plugin marketplace add /path/to/test-marketplace
/plugin install my-plugin@test-marketplace
```

Verify installation:

```bash
/help  # Should show new commands
```

Test all components work as expected.

### Step 6: Distribute

#### GitHub Distribution (Recommended)

1. Push plugin to GitHub repository
2. Create `.claude-plugin/marketplace.json` in repository root:

```json
{
  "name": "my-marketplace",
  "owner": "github-username",
  "plugins": [
    {
      "name": "my-plugin",
      "source": "./",
      "description": "Plugin description",
      "version": "1.0.0",
      "author": "Your Name",
      "repository": "https://github.com/user/my-plugin",
      "license": "MIT"
    }
  ]
}
```

3. Users install via: `/plugin marketplace add user/repo`

#### Team Distribution

Share plugin directory via:
- Git repository (private or public)
- Shared filesystem
- Archive file (.zip or .tar.gz)

Users add marketplace pointing to plugin location.

## Best Practices

### Plugin Design
- **Single Responsibility**: Each plugin should serve one clear purpose
- **Self-Contained**: Include all dependencies and documentation
- **Minimal Manifest**: Only declare custom paths if using non-default locations
- **Semantic Versioning**: Use semver for version numbers (major.minor.patch)

### Testing
- Test all components individually before bundling
- Verify commands appear in `/help` after installation
- Test agents load and execute correctly
- Validate hooks trigger at expected events
- Check MCP servers connect successfully

### Documentation
- Include comprehensive README.md in plugin root
- Document installation steps clearly
- Provide usage examples for all commands
- List any prerequisites or dependencies
- Explain configuration options if any

### Marketplace Management
- Keep marketplace.json updated with latest versions
- Use `strict: false` for simple plugins (reduces redundancy)
- Group related plugins in themed marketplaces
- Provide clear descriptions (users scan these)

### Security
- Review all code before distribution
- Avoid hardcoded credentials or secrets
- Document any permissions required
- Use hooks responsibly (avoid destructive operations)

## Troubleshooting

### Plugin Not Loading

**Symptom**: Plugin installed but components not appearing

**Solutions**:
- Verify `.claude-plugin/plugin.json` exists and is valid JSON
- Check all directories are at plugin root (not inside `.claude-plugin/`)
- Confirm marketplace.json `source` path is correct
- Try uninstall and reinstall: `/plugin uninstall name` then `/plugin install name@marketplace`

### Commands Not Showing in /help

**Symptom**: Commands installed but not listed in `/help`

**Solutions**:
- Verify commands are markdown files (.md extension)
- Check `commands` path in manifest points to correct directory
- Restart Claude Code session
- Check for naming conflicts with existing commands

### Skills Not Loading

**Symptom**: Plugin skills not being used by Claude

**Solutions**:
- Verify each skill has valid SKILL.md with proper frontmatter
- Skills directory should be `skills/` (plural) at plugin root
- Skills are auto-discovered (don't need manifest declaration)
- Check skill name doesn't conflict with existing skills

### Hooks Not Triggering

**Symptom**: Hook scripts not executing on events

**Solutions**:
- Verify hook scripts have executable permissions: `chmod +x hooks/scripts/*.sh`
- Check hooks.json path in manifest is correct
- Confirm hook script paths in hooks.json are relative and start with `./`
- Check Claude Code logs for hook errors

## Resources

This skill includes reference documentation and example templates:

### references/
- `official_plugin_structure.md` - Complete directory structure requirements
- `manifest_schema.md` - All plugin.json fields and validation rules
- `marketplace_guide.md` - Distribution and marketplace creation strategies

### assets/
- `plugin-template/` - Basic plugin directory structure to copy
- `manifest-examples/` - Example plugin.json files for different plugin types
- `marketplace-template.json` - Example marketplace.json configuration

## Quick Reference

```bash
# Create plugin structure
mkdir -p my-plugin/.claude-plugin
mkdir -p my-plugin/{commands,agents,skills,hooks}

# Create manifest
echo '{"name": "my-plugin", "version": "1.0.0"}' > my-plugin/.claude-plugin/plugin.json

# Test locally
/plugin marketplace add /path/to/test-marketplace
/plugin install my-plugin@test-marketplace

# Distribute via GitHub
# 1. Push plugin to GitHub
# 2. Add .claude-plugin/marketplace.json
# 3. Users install: /plugin marketplace add user/repo
```

## Official Documentation

- [Claude Code Plugins](https://code.claude.com/docs/en/plugins.md)
- [Plugin Reference](https://code.claude.com/docs/en/plugins-reference.md)
- [Plugin Marketplaces](https://code.claude.com/docs/en/plugin-marketplaces.md)
