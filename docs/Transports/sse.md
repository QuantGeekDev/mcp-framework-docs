# SSE Transport

The Server-Sent Events (SSE) transport enables HTTP-based communication between the MCP server and clients. It uses SSE for server-to-client messages and HTTP POST for client-to-server messages.

## Configuration

The SSE transport supports various configuration options to customize its behavior:

```typescript
import { MCPServer } from "@modelcontextprotocol/mcp-framework";

const server = new MCPServer({
  transport: {
    type: "sse",
    options: {
      port: 8080,                // Port to listen on (default: 8080)
      endpoint: "/sse",          // SSE endpoint path (default: "/sse")
      messageEndpoint: "/messages", // Message endpoint path (default: "/messages")
      maxMessageSize: "4mb",     // Maximum message size (default: "4mb")
      headers: {                 // Custom headers for SSE responses
        "X-Custom-Header": "value"
      },
      cors: {                    // CORS configuration
        allowOrigin: "*",
        allowMethods: "GET, POST, OPTIONS",
        allowHeaders: "Content-Type, Authorization, x-api-key",
        exposeHeaders: "Content-Type, Authorization, x-api-key",
        maxAge: "86400"
      },
      auth: {                    // Authentication configuration
        provider: authProvider,
        endpoints: {
          sse: true,            // Require auth for SSE connections
          messages: true        // Require auth for messages
        }
      }
    }
  }
});
```

### Port Configuration

The `port` option specifies which port the SSE server should listen on. Default is 8080.

### Endpoints

- `endpoint`: The path for the SSE connection endpoint (default: "/sse")
- `messageEndpoint`: The path for receiving messages via POST (default: "/messages")

### Message Size Limit

The `maxMessageSize` option controls the maximum allowed size for incoming messages. Accepts string values like "4mb", "1kb", etc.

### Custom Headers

You can specify custom headers to be included in SSE responses:

```typescript
headers: {
  "X-Custom-Header": "value",
  "Cache-Control": "no-cache"
}
```

### CORS Configuration

The SSE transport includes comprehensive CORS support with the following options:

```typescript
cors: {
  allowOrigin: "*",                   // Access-Control-Allow-Origin
  allowMethods: "GET, POST, OPTIONS", // Access-Control-Allow-Methods
  allowHeaders: "Content-Type, Authorization, x-api-key", // Access-Control-Allow-Headers
  exposeHeaders: "Content-Type, Authorization, x-api-key", // Access-Control-Expose-Headers
  maxAge: "86400"                    // Access-Control-Max-Age
}
```

### Authentication

The SSE transport supports authentication through various providers. See the [Authentication](../Authentication/overview.md) documentation for details.

```typescript
auth: {
  provider: authProvider,    // Authentication provider instance
  endpoints: {
    sse: true,              // Require auth for SSE connections
    messages: true          // Require auth for messages
  }
}
```

## Connection Management

### Keep-Alive

The SSE transport automatically manages connection keep-alive:

- Sends keep-alive messages every 15 seconds
- Includes ping messages with timestamps
- Optimizes socket settings for long-lived connections

### Session Management

Each SSE connection is assigned a unique session ID that must be included in message requests:

1. Client establishes SSE connection
2. Server sends endpoint URL with session ID
3. Client uses this URL for sending messages

### Error Handling

The transport includes robust error handling:

- Connection errors
- Message parsing errors
- Authentication failures
- Size limit exceeded errors

Error responses include detailed information:

```json
{
  "jsonrpc": "2.0",
  "id": null,
  "error": {
    "code": -32000,
    "message": "Error message",
    "data": {
      "method": "method_name",
      "sessionId": "session_id",
      "connectionActive": true,
      "type": "message_handler_error"
    }
  }
}
```

## Security Considerations

1. **HTTPS**: Always use HTTPS in production environments
2. **Authentication**: Enable authentication for both SSE and message endpoints
3. **CORS**: Configure appropriate CORS settings for your environment
4. **Message Size**: Set appropriate message size limits
5. **Rate Limiting**: Implement rate limiting for production use

## Client Implementation

Here's an example of how to implement a client for the SSE transport:

```typescript
// Establish SSE connection
const eventSource = new EventSource('http://localhost:8080/sse');

// Handle endpoint URL
eventSource.addEventListener('endpoint', (event) => {
  const messageEndpoint = event.data;
  // Store messageEndpoint for sending messages
});

// Handle messages
eventSource.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  // Process message
});

// Send message
async function sendMessage(message) {
  const response = await fetch(messageEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your-token' // If using authentication
    },
    body: JSON.stringify(message)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
