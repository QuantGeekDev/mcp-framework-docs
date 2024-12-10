---
id: debugging
title: Debugging
sidebar_position: 5
---

# Debugging MCP Servers

:::tip
The Model Context Protocol provides an open-source Inspector tool that makes debugging your MCP servers easy!
:::

## MCP Inspector

The MCP Inspector is an external developer tool maintained by the Model Context Protocol team that helps you test and debug MCP servers. It provides a user interface for interacting with your server and testing your tools, resources, and prompts.

### Using the Inspector

You can run the Inspector directly through `npx` without installation:

```bash
npx @modelcontextprotocol/inspector <path-to-your-server>
```

For example, if you've built your MCP Framework server:

```bash
# First build your server
npm run build

# Then run the inspector
npx @modelcontextprotocol/inspector dist/index.js
```

### Customizing Ports

The Inspector runs both a client UI (default port 5173) and an MCP proxy server (default port 3000). You can customize these ports if needed:

```bash
CLIENT_PORT=8080 SERVER_PORT=9000 npx @modelcontextprotocol/inspector dist/index.js
```

## Using the Inspector

### Server Connection

When you open the Inspector in your browser, you'll see:

- Connection status to your server
- Server capabilities
- Server metadata

### Testing Tools

The Tools tab allows you to:

- View all registered tools
- See tool schemas and descriptions
- Test tools with custom inputs
- View execution results

Example testing workflow:

1. Select your tool from the list
2. Enter test inputs in the JSON editor
3. Execute the tool
4. Review the response

### Inspecting Resources

The Resources tab enables you to:

- Browse available resources
- View resource metadata
- Test resource content retrieval
- Test subscriptions (if supported)

### Testing Prompts

In the Prompts tab, you can:

- View available prompt templates
- Test prompts with different arguments
- Preview generated messages

## Framework Logging

MCP Framework includes built-in logging that integrates well with the Inspector:

```typescript
import { logger } from "mcp-framework";

class MyTool extends MCPTool {
  async execute(input) {
    logger.info("Starting execution");

    try {
      const result = await this.process(input);
      logger.info("Execution successful");
      return result;
    } catch (error) {
      logger.error("Execution failed:", error);
      throw error;
    }
  }
}
```

### Log Levels

```typescript
logger.debug("Detailed information");
logger.info("General information");
logger.warn("Warning messages");
logger.error("Error messages");
```

## Development Workflow

1. **Start Development**

   - Launch your server with the Inspector
   - Verify basic connectivity
   - Check that your tools are listed

2. **Iterative Testing**

   - Make changes to your server
   - Rebuild (`npm run build`)
   - Reconnect the Inspector
   - Test the changes
   - Monitor the logs

3. **Test Edge Cases**
   - Try invalid inputs
   - Test error handling
   - Check concurrent operations

## Common Issues

### Tool Not Found

- Ensure the tool is properly exported
- Check that the tool name matches
- Verify the tool is being loaded by the server

### Resource Errors

- Check resource URI formatting
- Verify resource read implementation
- Test subscription cleanup

### Prompt Issues

- Validate prompt arguments
- Check message generation
- Verify resource references

## Best Practices

1. **Use Descriptive Logging**

```typescript
logger.info(`Processing request for user ${userId}`);
logger.error(`Failed to fetch data: ${error.message}`);
```

2. **Handle Errors Gracefully**

```typescript
try {
  // Your operation
} catch (error) {
  logger.error(`Operation failed: ${error.message}`);
  throw new Error(`Failed to complete operation: ${error.message}`);
}
```

3. **Monitor Performance**

```typescript
const start = Date.now();
// ... operation ...
logger.debug(`Operation took ${Date.now() - start}ms`);
```
