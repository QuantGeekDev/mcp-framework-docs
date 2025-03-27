---
id: stdio-transport
title: STDIO Transport
sidebar_position: 2
---

# STDIO Transport

The STDIO transport is the default transport mechanism in MCP Framework. It uses standard input/output streams for communication between the client and server.

## Overview

STDIO transport is ideal for:
- CLI tools and applications
- Local process communication
- Simple integrations without network requirements
- Development and testing scenarios

## How It Works

The STDIO transport:
1. Uses standard input (stdin) to receive messages from the client
2. Uses standard output (stdout) to send messages to the client
3. Implements JSON-RPC 2.0 protocol for message formatting
4. Maintains a direct, synchronous communication channel

## Features

- **Simplicity**: No network configuration required
- **Performance**: Direct process communication with minimal overhead
- **Reliability**: Guaranteed message delivery within the same process
- **Security**: Inherent security through process isolation
- **Debugging**: Easy to debug with direct console output

## Implementation

```typescript
import { MCPServer } from "mcp-framework";

// STDIO is the default transport
const server = new MCPServer();

// Or explicitly specify STDIO transport
const server = new MCPServer({
  transport: { 
    type: "stdio"
  }
});

await server.start();
```

## Use Cases

### CLI Tools
STDIO transport is perfect for CLI tools where the MCP server runs as part of the command-line application:

```typescript
#!/usr/bin/env node
import { MCPServer } from "mcp-framework";

async function main() {
  const server = new MCPServer();
  await server.start();
}

main().catch(console.error);
```

### Local Development
During development, STDIO transport provides a simple way to test and debug your MCP tools:

```typescript
import { MCPServer } from "mcp-framework";

const server = new MCPServer({
  name: "dev-server",
  version: "1.0.0"
});

await server.start();
```

## Limitations

While STDIO transport is simple and efficient, it has some limitations:
- Single client connection only
- No network accessibility
- No authentication mechanism
- Process-bound lifecycle

For scenarios requiring multiple clients, network access, or authentication, consider using [SSE Transport](./sse.md) instead.

## Best Practices

1. **Error Handling**
   - Implement proper error handling for process termination
   - Handle SIGINT and SIGTERM signals appropriately

2. **Logging**
   - Use stderr for logging to avoid interfering with transport messages
   - Consider implementing a proper logging strategy

3. **Process Management**
   - Properly close the server on process exit
   - Handle cleanup operations in shutdown hooks

## Example Implementation

Here's a complete example showing best practices:

```typescript
import { MCPServer } from "mcp-framework";

class MyMCPServer {
  private server: MCPServer;

  constructor() {
    this.server = new MCPServer({
      name: "my-mcp-server",
      version: "1.0.0",
      transport: { type: "stdio" }
    });

    // Handle process signals
    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());
  }

  async start() {
    try {
      await this.server.start();
      console.error('Server started successfully'); // Use stderr for logging
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  private async shutdown() {
    console.error('Shutting down...');
    try {
      await this.server.stop();
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  }
}

// Start the server
new MyMCPServer().start().catch(console.error);
```

---

## STDIO QUICKSTART

Ready to build your first STDIO-based MCP server? Follow our [Quickstart Guide](../quickstart.md) to create and run a project using the STDIO Transport in just a few minutes.
