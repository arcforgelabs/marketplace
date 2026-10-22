# Plugin Marketplace Guide

## Overview

Marketplaces are catalogs that make plugins discoverable and installable. They're defined by a `marketplace.json` file that lists available plugins and their sources.

## Marketplace Structure

```json
{
  "name": "marketplace-name",
  "owner": "maintainer-name",
  "strict": false,
  "plugins": [
    {
      "name": "plugin-one",
      "source": "./plugin-one",
      "description": "What plugin-one does",
      "version": "1.0.0",
      "author": "Author Name"
    },
    {
      "name": "plugin-two",
      "source": "https://github.com/user/plugin-two",
      "description": "What plugin-two does"
    }
  ]
}
```

## Required Fields

### Marketplace Level

- `name` - Marketplace identifier (kebab-case)
- `owner` - Maintainer contact or organization
- `plugins` - Array of plugin entries

### Plugin Entry

- `name` - Plugin identifier
- `source` - Where to find the plugin

## Source Types

### Relative Paths (Same Repository)

```json
{
  "name": "local-plugin",
  "source": "./plugins/local-plugin"
}
```

Use when marketplace and plugin are in the same repository.

### GitHub Repositories

```json
{
  "name": "remote-plugin",
  "source": "https://github.com/user/plugin-repo"
}
```

Use for plugins hosted separately on GitHub.

### Alternative Git Services

```json
{
  "name": "gitlab-plugin",
  "source": "https://gitlab.com/org/plugin"
}
```

Any git URL works (GitLab, Bitbucket, etc.).

### Local Development Paths

```json
{
  "name": "dev-plugin",
  "source": "/absolute/path/to/plugin"
}
```

Use for local testing only (not for distribution).

## Strict Mode

### strict: false (Recommended)

When `strict: false`, the marketplace entry serves as the complete plugin manifest if no `plugin.json` exists in the plugin directory.

**Benefits**:
- Reduces redundancy (no need for both marketplace entry and plugin.json)
- Simpler for small plugins
- Metadata lives in one place

**Example**:
```json
{
  "name": "my-marketplace",
  "strict": false,
  "plugins": [
    {
      "name": "simple-plugin",
      "source": "./simple-plugin",
      "version": "1.0.0",
      "description": "This metadata is used if plugin.json doesn't exist"
    }
  ]
}
```

### strict: true

When `strict: true`, plugins MUST have their own `plugin.json` file.

**Use When**:
- Plugins are maintained independently
- Enforcing strict validation
- Plugins may be distributed elsewhere

## Distribution Strategies

### Strategy 1: Monorepo (Recommended for Teams)

Keep marketplace and all plugins in one repository:

```
my-marketplace/
├── .claude-plugin/
│   └── marketplace.json
├── plugins/
│   ├── plugin-one/
│   │   ├── .claude-plugin/plugin.json
│   │   └── commands/
│   ├── plugin-two/
│   │   ├── .claude-plugin/plugin.json
│   │   └── skills/
│   └── plugin-three/
│       └── .claude-plugin/plugin.json
└── README.md
```

**marketplace.json**:
```json
{
  "name": "team-marketplace",
  "owner": "acme-corp",
  "plugins": [
    {
      "name": "plugin-one",
      "source": "./plugins/plugin-one"
    },
    {
      "name": "plugin-two",
      "source": "./plugins/plugin-two"
    },
    {
      "name": "plugin-three",
      "source": "./plugins/plugin-three"
    }
  ]
}
```

**Installation**:
```bash
/plugin marketplace add acme-corp/my-marketplace
/plugin install plugin-one@team-marketplace
```

**Benefits**:
- Single repository to maintain
- Atomic updates across plugins
- Easy to keep plugins in sync

### Strategy 2: Distributed (Open Source)

Marketplace catalogs plugins from different repositories:

```
awesome-plugins/
└── .claude-plugin/
    └── marketplace.json
```

**marketplace.json**:
```json
{
  "name": "awesome-plugins",
  "owner": "community",
  "plugins": [
    {
      "name": "react-toolkit",
      "source": "https://github.com/user1/react-toolkit",
      "description": "React development tools",
      "author": "User One"
    },
    {
      "name": "aws-helpers",
      "source": "https://github.com/user2/aws-helpers",
      "description": "AWS deployment automation",
      "author": "User Two"
    }
  ]
}
```

**Installation**:
```bash
/plugin marketplace add community/awesome-plugins
/plugin install react-toolkit@awesome-plugins
```

**Benefits**:
- Curated collection from multiple sources
- Plugin authors maintain independently
- Community-driven

### Strategy 3: Plugin-as-Marketplace (Single Plugin)

Plugin serves as its own marketplace:

```
my-plugin/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── commands/
└── skills/
```

**marketplace.json**:
```json
{
  "name": "my-plugin-marketplace",
  "owner": "author",
  "plugins": [
    {
      "name": "my-plugin",
      "source": "./"
    }
  ]
}
```

**Installation**:
```bash
/plugin marketplace add author/my-plugin
/plugin install my-plugin@my-plugin-marketplace
```

**Benefits**:
- Simple for single-plugin distribution
- Users discover via marketplace, not manual install

## Marketplace Metadata Best Practices

### Complete Plugin Entries

Provide rich metadata to help users discover plugins:

```json
{
  "name": "aws-deployment-tools",
  "source": "https://github.com/acme/aws-tools",
  "version": "2.1.0",
  "description": "Terraform-based AWS deployment with cost optimization",
  "author": "Acme DevOps Team",
  "repository": "https://github.com/acme/aws-tools",
  "homepage": "https://acme.com/docs/aws-tools",
  "license": "MIT",
  "keywords": ["aws", "terraform", "devops", "deployment"]
}
```

### Consistent Naming

Use descriptive, searchable names:

❌ **Vague**:
```json
{"name": "tools", "description": "Various tools"}
```

✅ **Specific**:
```json
{"name": "react-testing-tools", "description": "Playwright testing automation for React"}
```

### Group by Theme

Organize marketplaces around themes or teams:

**Examples**:
- `acme-frontend-tools` - React, Vue, testing tools
- `acme-devops-suite` - CI/CD, deployment, monitoring
- `acme-security-tools` - Security scanning, compliance

### Keep Updated

Regularly update plugin versions:

```json
{
  "plugins": [
    {
      "name": "my-plugin",
      "source": "./my-plugin",
      "version": "1.2.0"    // Update when plugin changes
    }
  ]
}
```

## Testing Marketplaces

### Local Testing

Create test marketplace before publishing:

```bash
# Create test structure
mkdir -p test-marketplace/.claude-plugin
cat > test-marketplace/.claude-plugin/marketplace.json << 'EOF'
{
  "name": "test-marketplace",
  "owner": "me",
  "plugins": [
    {
      "name": "my-plugin",
      "source": "../my-plugin",
      "description": "Test plugin"
    }
  ]
}
EOF

# Add marketplace
/plugin marketplace add /absolute/path/to/test-marketplace

# Install plugin
/plugin install my-plugin@test-marketplace

# Verify
/help  # Should show plugin commands
```

### GitHub Testing

Test from GitHub before announcing:

1. Push marketplace to GitHub (can be private repo)
2. Test installation from GitHub URL:
   ```bash
   /plugin marketplace add your-username/test-marketplace
   ```
3. Verify all plugins install correctly
4. Check for path errors or missing files

## Common Marketplace Patterns

### Organization-Wide Marketplace

```json
{
  "name": "acme-engineering",
  "owner": "Acme Corp",
  "strict": true,
  "plugins": [
    {
      "name": "coding-standards",
      "source": "./plugins/coding-standards",
      "description": "Acme coding standards enforcement"
    },
    {
      "name": "deployment-tools",
      "source": "./plugins/deployment-tools",
      "description": "Standardized deployment workflows"
    },
    {
      "name": "security-scanner",
      "source": "./plugins/security-scanner",
      "description": "Pre-commit security scanning"
    }
  ]
}
```

### Community Curated List

```json
{
  "name": "awesome-claude-plugins",
  "owner": "community",
  "plugins": [
    {
      "name": "react-toolkit",
      "source": "https://github.com/user1/react-toolkit",
      "description": "React development patterns and testing",
      "author": "User One",
      "homepage": "https://user1.github.io/react-toolkit"
    },
    {
      "name": "python-ml-tools",
      "source": "https://github.com/user2/python-ml",
      "description": "Machine learning workflow automation",
      "author": "User Two"
    }
  ]
}
```

### Personal Productivity Suite

```json
{
  "name": "my-productivity-tools",
  "owner": "myusername",
  "strict": false,
  "plugins": [
    {
      "name": "quick-commands",
      "source": "./quick-commands",
      "description": "Frequently used project commands"
    },
    {
      "name": "templates",
      "source": "./templates",
      "description": "Code and document templates"
    }
  ]
}
```

## Security Considerations

### Review Before Adding

Always review marketplace and plugin contents before adding:

```bash
# Clone marketplace first
git clone https://github.com/user/marketplace
cd marketplace

# Review marketplace.json
cat .claude-plugin/marketplace.json

# Review plugin sources if local
cat plugins/*/. claude-plugin/plugin.json

# Check for suspicious code
grep -r "eval\|exec\|rm -rf" .
```

### Trust Model

- **Trust marketplace owner**: They control which plugins are listed
- **Trust plugin authors**: They write the code that executes
- **Verify sources**: Check GitHub repositories, licenses
- **Test in isolation**: Use test marketplace before production

### Private Marketplaces

For sensitive/proprietary plugins:

1. Use private GitHub repository
2. Require authentication
3. Limit access to team members
4. Review all plugin updates

```bash
# Private marketplace requires GitHub auth
/plugin marketplace add acme-corp/private-marketplace  # Requires repo access
```

## Troubleshooting

### Marketplace Not Found

**Symptom**: `/plugin marketplace add user/repo` fails

**Solutions**:
- Verify repository exists and is accessible
- Check repository has `.claude-plugin/marketplace.json`
- For private repos, ensure GitHub authentication is configured
- Try full URL: `https://github.com/user/repo`

### Plugin Source Not Found

**Symptom**: Plugin installs but components missing

**Solutions**:
- Verify `source` path is correct (relative to marketplace.json)
- For GitHub sources, ensure repository exists
- Check plugin has required `.claude-plugin/plugin.json` (if strict: true)
- Try absolute path for local testing

### Version Conflicts

**Symptom**: Different plugins have different versions of same skill

**Solutions**:
- Use plugin namespacing (each plugin's skills are separate)
- Coordinate versions across related plugins
- Document compatibility requirements

## References

- [Official Marketplace Guide](https://code.claude.com/docs/en/plugin-marketplaces.md)
- [Plugin Reference](https://code.claude.com/docs/en/plugins-reference.md)
