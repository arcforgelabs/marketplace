# Plugin Manifest Schema (plugin.json)

## Minimum Valid Manifest

```json
{
  "name": "plugin-name"
}
```

The `name` field is the ONLY required field.

## Complete Schema

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "Brief plugin purpose description",
  "author": "Name or Organization",
  "homepage": "https://example.com",
  "repository": "https://github.com/user/plugin",
  "license": "MIT",
  "keywords": ["tag1", "tag2", "tag3"],

  "commands": "./commands/",
  "agents": "./agents/",
  "hooks": "./hooks/hooks.json",
  "mcpServers": "./.mcp.json"
}
```

## Field Descriptions

### Required Fields

#### `name` (string, required)

Unique identifier for the plugin.

**Format**: kebab-case (lowercase with hyphens)

**Examples**:
- ✅ `"react-testing-suite"`
- ✅ `"aws-deployment-tools"`
- ❌ `"React Testing Suite"` (spaces not allowed)
- ❌ `"react_testing_suite"` (underscores not preferred)

**Rules**:
- Must be unique across all installed plugins
- Cannot contain spaces or special characters
- Use kebab-case for consistency

### Optional Metadata Fields

#### `version` (string, optional)

Plugin version number.

**Format**: Semantic versioning (major.minor.patch)

**Examples**:
- `"1.0.0"` - Initial release
- `"1.1.0"` - New features added
- `"1.1.1"` - Bug fixes
- `"2.0.0"` - Breaking changes

**Semantic Versioning Guide**:
- **Major** (X.0.0): Breaking changes, incompatible API changes
- **Minor** (1.X.0): New features, backwards-compatible
- **Patch** (1.0.X): Bug fixes, no new features

#### `description` (string, optional)

Brief explanation of plugin purpose (1-2 sentences).

**Guidelines**:
- Keep under 200 characters
- Focus on what the plugin does, not how
- Include primary use case

**Examples**:
- ✅ `"Playwright testing patterns and automation for React projects"`
- ✅ `"AWS deployment tools with Terraform integration and cost optimization"`
- ❌ `"A plugin"` (too vague)
- ❌ `"This plugin provides commands for testing and agents for debugging and skills for patterns..."` (too long)

#### `author` (string, optional)

Plugin creator name or organization.

**Examples**:
- `"Jane Smith"`
- `"Acme Corp"`
- `"jane@example.com"`

#### `homepage` (string, optional)

URL to plugin documentation or homepage.

**Examples**:
- `"https://github.com/user/plugin#readme"`
- `"https://docs.example.com/plugins/my-plugin"`

#### `repository` (string, optional)

URL to plugin source code repository.

**Examples**:
- `"https://github.com/user/plugin"`
- `"https://gitlab.com/org/plugin"`

#### `license` (string, optional)

Software license identifier.

**Common Values**:
- `"MIT"` - Permissive open source
- `"Apache-2.0"` - Permissive with patent grant
- `"GPL-3.0"` - Copyleft open source
- `"Proprietary"` - Closed source

**See**: [SPDX License List](https://spdx.org/licenses/) for standard identifiers

#### `keywords` (array of strings, optional)

Tags for plugin discovery and search.

**Guidelines**:
- 3-5 keywords recommended
- Use lowercase
- Include related technologies, use cases

**Examples**:
```json
["react", "testing", "playwright", "automation"]
["aws", "terraform", "devops", "deployment"]
["documentation", "markdown", "templates"]
```

### Component Path Fields

**Note**: These are optional if using default locations. Only declare if using non-standard paths.

#### `commands` (string, optional)

Path to commands directory.

**Default**: `./commands/` (auto-discovered if not specified)

**Example**:
```json
{
  "commands": "./custom-commands/"
}
```

**When to declare**:
- Using non-standard directory name
- Otherwise, omit (default is used)

#### `agents` (string, optional)

Path to agents directory.

**Default**: `./agents/` (auto-discovered if not specified)

**Example**:
```json
{
  "agents": "./custom-agents/"
}
```

#### `hooks` (string, optional)

Path to hooks configuration file.

**Default**: `./hooks/hooks.json` (auto-discovered if not specified)

**Example**:
```json
{
  "hooks": "./config/hooks.json"
}
```

#### `mcpServers` (string, optional)

Path to MCP server configuration file.

**Default**: `./.mcp.json` (auto-discovered if not specified)

**Example**:
```json
{
  "mcpServers": "./config/mcp.json"
}
```

## Special Cases

### Skills

Skills are **automatically discovered** from the `skills/` directory. They do NOT need to be declared in the manifest.

❌ **Don't do this**:
```json
{
  "skills": "./skills/"    // Not needed!
}
```

✅ **Just create the directory**:
```
plugin/
├── .claude-plugin/plugin.json
└── skills/
    └── my-skill/
        └── SKILL.md
```

### Minimal Manifest

For simple plugins following standard structure:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "What this plugin does"
}
```

No need to declare component paths if using defaults.

## Validation

### JSON Syntax

Verify JSON is valid:

```bash
cat .claude-plugin/plugin.json | python3 -m json.tool
```

Should print formatted JSON with no errors.

### Required Fields

Check `name` field exists:

```bash
cat .claude-plugin/plugin.json | grep '"name"'
```

### Path Format

All paths must:
- Be relative (not absolute)
- Start with `./`
- Point to existing files/directories

❌ **Invalid**:
```json
{
  "commands": "/absolute/path/commands/",      // Absolute path
  "hooks": "hooks/hooks.json"                  // Missing ./
}
```

✅ **Valid**:
```json
{
  "commands": "./commands/",
  "hooks": "./hooks/hooks.json"
}
```

## Best Practices

### 1. Keep It Minimal

Only include fields you actually need:

**Over-specified** (verbose):
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "commands": "./commands/",        // Default path, unnecessary
  "agents": "./agents/",            // Default path, unnecessary
  "hooks": "./hooks/hooks.json"     // Default path, unnecessary
}
```

**Clean** (concise):
```json
{
  "name": "my-plugin",
  "version": "1.0.0"
}
```

### 2. Use Semantic Versioning

Maintain clear version history:

- `1.0.0` → Initial release
- `1.1.0` → Add new commands
- `1.1.1` → Fix command bug
- `2.0.0` → Rename commands (breaking change)

### 3. Descriptive Names and Descriptions

Help users discover your plugin:

❌ **Vague**:
```json
{
  "name": "tools",
  "description": "Various tools"
}
```

✅ **Specific**:
```json
{
  "name": "aws-deployment-tools",
  "description": "Terraform-based AWS deployment with cost optimization and security scanning"
}
```

### 4. Include Repository for Open Source

Make it easy to report issues:

```json
{
  "name": "my-plugin",
  "repository": "https://github.com/user/my-plugin",
  "homepage": "https://github.com/user/my-plugin#readme"
}
```

## Examples by Plugin Type

### Minimal Plugin

```json
{
  "name": "hello-world"
}
```

### Command-Only Plugin

```json
{
  "name": "build-tools",
  "version": "1.0.0",
  "description": "Build and deployment commands for common stacks",
  "author": "DevOps Team"
}
```

### Full-Featured Plugin

```json
{
  "name": "aws-development-suite",
  "version": "2.1.0",
  "description": "Complete AWS development toolkit with Terraform, testing, and deployment automation",
  "author": "Cloud Engineering",
  "repository": "https://github.com/acme/aws-dev-suite",
  "license": "MIT",
  "keywords": ["aws", "terraform", "devops", "ci-cd"],
  "homepage": "https://acme.com/docs/aws-dev-suite"
}
```

### Plugin with Custom Paths

```json
{
  "name": "custom-structure",
  "version": "1.0.0",
  "commands": "./cmd/",
  "hooks": "./config/event-handlers.json",
  "mcpServers": "./config/mcp-servers.json"
}
```

## Common Mistakes

### 1. Missing Name Field

❌ **Invalid**:
```json
{
  "version": "1.0.0",
  "description": "My plugin"
}
```

### 2. Invalid JSON

❌ **Invalid**:
```json
{
  name: "my-plugin",           // Missing quotes around key
  "version": 1.0.0,            // Missing quotes around value
  "keywords": ["test",]        // Trailing comma
}
```

✅ **Valid**:
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "keywords": ["test"]
}
```

### 3. Declaring Skills

❌ **Unnecessary**:
```json
{
  "name": "my-plugin",
  "skills": "./skills/"        // Not a valid field!
}
```

Skills are auto-discovered. No declaration needed.

## References

- [JSON Specification](https://www.json.org/)
- [Semantic Versioning](https://semver.org/)
- [SPDX Licenses](https://spdx.org/licenses/)
- [Official Plugin Reference](https://code.claude.com/docs/en/plugins-reference.md)
