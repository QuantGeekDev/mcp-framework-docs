---
id: installation
title: Installation
sidebar_position: 2
---

# Installation

Setting up the MCP Framework is straightforward. You can either create a new project using our CLI or add it to an existing project.

## Using the CLI (Recommended)

The easiest way to get started is using our CLI to create a new project:

```bash
# Install the CLI globally with npm
npm install -g mcp-framework
# The mcp CLI is now globally available

# Create your new project with the mcp CLI
mcp create my-mcp-server

# Navigate to your project
cd my-mcp-server

# Install dependencies
npm install
```

This will create a new project with the following structure:

```
my-mcp-server/
├── src/
│   ├── tools/         # MCP Tools directory
│   │   └── ExampleTool.ts
│   └── index.ts       # Server entry point
├── package.json
└── tsconfig.json
```

To open this project in vscode, use:

```bash
code .
```

## Manual Installation

If you prefer to add MCP Framework to an existing project:

```bash
npm install mcp-framework
```

Then create a minimal server in `src/index.ts`:

```typescript
import { MCPServer } from "mcp-framework";

const server = new MCPServer();

server.start().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
```

## Next Steps

After installation, you can:

1. Follow the [Quickstart](quickstart) guide to create your first tool
2. Learn about [Tools](Tools/tools-overview)
3. Explore [Resources](Resources/resources-overview)
4. Check out [Prompts](Prompts/prompts-overview)

## Requirements

- Node.js 18 or later
- TypeScript 5.0 or later
- npm or yarn package manager

## Troubleshooting

### Common Issues

1. **TypeScript Errors**:

   ```bash
   error TS2304: Cannot find name 'z'
   ```

   Solution: Install zod - `npm install zod`

2. **Module Resolution Issues**:
   ```bash
   Error: Cannot find module '@modelcontextprotocol/sdk'
   ```
   Solution: Install peer dependencies - `npm install @modelcontextprotocol/sdk`

For more help, check our [GitHub Issues](https://github.com/QuantGeekDev/mcp-framework/issues) or join our [Discord community](https://discord.com/invite/3uqNS3KRP2).
