---
id: docs-package-cli
title: CLI & Scaffolding
sidebar_position: 6
---

# CLI & Project Scaffolding

`@mcp-framework/docs` includes a CLI that scaffolds a ready-to-run documentation MCP server.

## Creating a Project

```bash
npx create-docs-server my-api-docs
```

This creates:

```
my-api-docs/
├── src/
│   └── index.ts          # Pre-configured DocsServer
├── package.json          # All dependencies included
├── tsconfig.json
├── .env.example          # Configuration template
├── .gitignore
└── README.md             # Setup + MCP client config instructions
```

## Setup After Scaffolding

```bash
cd my-api-docs
cp .env.example .env
# Edit .env with your documentation site URL
npm run build
npm start
```

## Connecting to MCP Clients

### Claude Code

```bash
claude mcp add my-api-docs -- node /path/to/my-api-docs/dist/index.js
```

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "my-api-docs": {
      "command": "node",
      "args": ["/path/to/my-api-docs/dist/index.js"],
      "env": {
        "DOCS_BASE_URL": "https://docs.myapi.com"
      }
    }
  }
}
```

### Cursor

Add to MCP settings:

```json
{
  "my-api-docs": {
    "command": "node",
    "args": ["/path/to/my-api-docs/dist/index.js"],
    "env": {
      "DOCS_BASE_URL": "https://docs.myapi.com"
    }
  }
}
```

## SKILL.md Template

The package includes a `SKILL.md.template` that teaches Claude Code how to approach integrations against your API:

```bash
cp node_modules/@mcp-framework/docs/SKILL.md.template SKILL.md
```

Edit the `<!-- CUSTOMIZE -->` sections with your API-specific patterns:
- Authentication setup
- SDK initialization
- Common API call patterns
- Error handling
- Common pitfalls
