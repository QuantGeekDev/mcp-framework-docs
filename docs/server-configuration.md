# Server Configuration

The MCP Framework provides extensive configuration options for customizing your server's behavior. This guide covers all available configuration options and best practices.

## Basic Configuration

When creating a new MCP server, you can provide configuration options:

```typescript
import { MCPServer } from "@modelcontextprotocol/mcp-framework";

const server = new MCPServer({
  name: "my-mcp-server",        // Server name
  version: "1.0.0",            // Server version
  basePath: "./dist",          // Base path for tools/prompts/resources
  transport: {                 // Transport configuration
    type: "sse",
    options: {
      // Transport-specific options
    }
  }
});
```

## Server Name and Version

The server name and version are used to identify your MCP server:

```typescript
const server = new MCPServer({
  name: "my-mcp-server",     // Default: package.json name or "unnamed-mcp-server"
  version: "1.0.0"          // Default: package.json version or "0.0.0"
});
```

If not provided, the server will attempt to read these values from your project's package.json file.

## Base Path

The `basePath` option specifies where the server should look for tools, prompts, and resources:

```typescript
const server = new MCPServer({
  basePath: "./dist"  // Default: join(process.cwd(), 'dist')
});
```

The server will look for:
- Tools in `${basePath}/tools`
- Prompts in `${basePath}/prompts`
- Resources in `${basePath}/resources`

## Transport Configuration

The transport configuration determines how clients will communicate with your server:

```typescript
const server = new MCPServer({
  transport: {
    type: "sse",              // "sse" or "stdio"
    options: {
      // Transport-specific options
      port: 8080,
      endpoint: "/sse",
      // ... other options
    }
  }
});
```

See the transport-specific documentation for detailed configuration options:
- [SSE Transport](./Transports/sse.md)
- [STDIO Transport](./Transports/stdio.md)

## Server Capabilities

The server automatically detects and enables capabilities based on your project structure:

```typescript
interface ServerCapabilities {
  tools?: {
    enabled: true;
  };
  schemas?: {
    enabled: true;
  };
  prompts?: {
    enabled: true;
  };
  resources?: {
    enabled: true;
  };
}
```

- Tools capability is always enabled
- Prompts capability is enabled if prompts are found in the prompts directory
- Resources capability is enabled if resources are found in the resources directory

## Server Lifecycle

### Starting the Server

```typescript
await server.start();
```

The start process:
1. Loads tools, prompts, and resources
2. Detects capabilities
3. Sets up request handlers
4. Initializes the transport
5. Starts listening for connections

### Stopping the Server

```typescript
await server.stop();
```

The stop process:
1. Closes active connections
2. Stops the transport
3. Cleans up resources
4. Exits gracefully

The server also handles SIGINT signals (Ctrl+C) for graceful shutdown.

## Logging

The server uses a built-in logger that can be imported and configured:

```typescript
import { logger } from "@modelcontextprotocol/mcp-framework";

// Log levels: debug, info, warn, error
logger.debug("Debug message");
logger.info("Info message");
logger.warn("Warning message");
logger.error("Error message");
```

## Best Practices

1. **Project Structure**
   - Keep tools, prompts, and resources in separate directories
   - Use TypeScript for better type safety
   - Follow the naming conventions for each component

2. **Configuration**
   - Use environment variables for sensitive values
   - Set appropriate base paths for your deployment
   - Configure proper authentication in production

3. **Error Handling**
   - Implement proper error handling in your tools
   - Use the logger for debugging and monitoring
   - Handle transport errors appropriately

4. **Security**
   - Enable authentication in production
   - Use HTTPS for SSE transport
   - Set appropriate CORS settings
   - Implement rate limiting

5. **Performance**
   - Keep message sizes reasonable
   - Implement proper cleanup in tools
   - Monitor server resources

## Example Configuration

Here's a complete example with all configuration options:

```typescript
import { MCPServer, APIKeyAuthProvider } from "@modelcontextprotocol/mcp-framework";

const server = new MCPServer({
  name: "my-mcp-server",
  version: "1.0.0",
  basePath: "./dist",
  transport: {
    type: "sse",
    options: {
      port: 8080,
      endpoint: "/sse",
      messageEndpoint: "/messages",
      maxMessageSize: "4mb",
      headers: {
        "X-Custom-Header": "value"
      },
      cors: {
        allowOrigin: "*",
        allowMethods: "GET, POST, OPTIONS",
        allowHeaders: "Content-Type, Authorization, x-api-key",
        exposeHeaders: "Content-Type, Authorization, x-api-key",
        maxAge: "86400"
      },
      auth: {
        provider: new APIKeyAuthProvider({
          keys: ["your-api-key"]
        }),
        endpoints: {
          sse: true,
          messages: true
        }
      }
    }
  }
});

// Start the server
await server.start();

// Handle shutdown
process.on('SIGINT', async () => {
  await server.stop();
});
