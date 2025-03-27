---
id: http-stream-transport
title: HTTP Stream Transport
sidebar_position: 3
---

# HTTP Stream Transport

The HTTP Stream Transport is the recommended transport mechanism for web-based MCP applications, implementing the Streamable HTTP transport protocol from the MCP specification version 2025-03-26.

## Overview

The HTTP Stream Transport provides a modern, flexible transport layer that supports both batch responses and streaming via Server-Sent Events (SSE). It offers advanced features like session management, resumable streams, and comprehensive authentication options.

## Key Features

- **Single Endpoint**: Uses a single HTTP endpoint for all MCP communication
- **Multiple Response Modes**: Support for both batch (JSON) and streaming (SSE) responses
- **Session Management**: Built-in session tracking and management
- **Resumability**: Support for resuming broken SSE connections
- **Authentication**: Comprehensive authentication support
- **CORS**: Flexible CORS configuration for web applications

## Configuration

The HTTP Stream Transport supports extensive configuration options:

```typescript
import { MCPServer } from "mcp-framework";

const server = new MCPServer({
  transport: {
    type: "http-stream",
    options: {
      port: 8080,                // Port to listen on (default: 8080)
      endpoint: "/mcp",          // HTTP endpoint path (default: "/mcp")
      responseMode: "batch",     // Response mode: "batch" or "stream" (default: "batch")
      maxMessageSize: "4mb",     // Maximum message size (default: "4mb")
      batchTimeout: 30000,       // Timeout for batch responses in ms (default: 30000)
      headers: {                 // Custom headers for responses
        "X-Custom-Header": "value"
      },
      cors: {                    // CORS configuration
        allowOrigin: "*",
        allowMethods: "GET, POST, DELETE, OPTIONS",
        allowHeaders: "Content-Type, Accept, Authorization, x-api-key, Mcp-Session-Id, Last-Event-ID",
        exposeHeaders: "Content-Type, Authorization, x-api-key, Mcp-Session-Id",
        maxAge: "86400"
      },
      auth: {                    // Authentication configuration
        provider: authProvider
      },
      session: {                 // Session configuration
        enabled: true,           // Enable session management (default: true)
        headerName: "Mcp-Session-Id", // Session header name (default: "Mcp-Session-Id")
        allowClientTermination: true  // Allow clients to terminate sessions (default: true)
      },
      resumability: {            // Stream resumability configuration
        enabled: false,          // Enable stream resumability (default: false)
        historyDuration: 300000  // How long to keep message history in ms (default: 300000 - 5 minutes)
      }
    }
  }
});

await server.start();
```

### Quick Start Configuration

For a simple setup with recommended defaults, you can use:

```typescript
import { MCPServer } from "mcp-framework";

const server = new MCPServer({
  transport: {
    type: "http-stream",
    options: {
      port: 8080,
      cors: {
        allowOrigin: "*"
      }
    }
  }
});

await server.start();
```

### Using CLI to Create a Project with HTTP Transport

You can use the MCP Framework CLI to create a new project with HTTP transport enabled:

```bash
mcp create my-mcp-server --http --port 1337 --cors
```

This will create a new project with HTTP transport configured on port 1337 with CORS enabled.

## Configuration Options

### Port and Endpoint

- `port`: The HTTP port to listen on (default: 8080)
- `endpoint`: The endpoint path for all MCP communication (default: "/mcp")

### Response Mode

The `responseMode` option controls how the server responds to client requests:

- `batch`: Collects all responses for a request batch and sends them as a single JSON response (default)
- `stream`: Opens an SSE stream for each request, allowing streaming responses

```typescript
transport: {
  type: "http-stream",
  options: {
    responseMode: "batch" // or "stream"
  }
}
```

Batch mode is more efficient for simple operations, while stream mode is better for long-running operations that may benefit from progressive responses.

### Batch Timeout

When using `batch` mode, the `batchTimeout` option controls how long the server will wait for all responses to be collected before sending the batch:

```typescript
batchTimeout: 30000 // 30 seconds (default)
```

### Message Size Limit

The `maxMessageSize` option controls the maximum allowed size for incoming messages:

```typescript
maxMessageSize: "4mb" // default
```

### CORS Configuration

The HTTP Stream Transport provides comprehensive CORS support:

```typescript
cors: {
  allowOrigin: "*",                // Access-Control-Allow-Origin
  allowMethods: "GET, POST, DELETE, OPTIONS", // Access-Control-Allow-Methods
  allowHeaders: "Content-Type, Accept, Authorization, x-api-key, Mcp-Session-Id, Last-Event-ID", // Access-Control-Allow-Headers
  exposeHeaders: "Content-Type, Authorization, x-api-key, Mcp-Session-Id", // Access-Control-Expose-Headers
  maxAge: "86400"                 // Access-Control-Max-Age
}
```

### Session Management

The HTTP Stream Transport provides built-in session management capabilities:

```typescript
session: {
  enabled: true,                  // Enable session management (default: true)
  headerName: "Mcp-Session-Id",   // Session header name (default: "Mcp-Session-Id")
  allowClientTermination: true    // Allow clients to terminate sessions (default: true)
}
```

When sessions are enabled:
- A unique session ID is generated during initialization
- The session ID is included in the `Mcp-Session-Id` header of the server's response
- Clients must include this session ID in subsequent requests
- Sessions can be explicitly terminated by clients via a DELETE request (if allowed)

### Stream Resumability

The HTTP Stream Transport can maintain message history to support resuming broken SSE connections:

```typescript
resumability: {
  enabled: false,               // Enable stream resumability (default: false)
  historyDuration: 300000       // How long to keep message history in ms (default: 300000 - 5 minutes)
}
```

When enabled:
- Each SSE event is assigned a unique ID
- Clients can reconnect and provide the last received event ID using the `Last-Event-ID` header
- The server will replay missed messages since that event ID

## HTTP Methods

The HTTP Stream Transport uses the following HTTP methods:

- **POST**: For sending client requests, notifications, and responses
- **GET**: For establishing SSE streams for receiving server messages
- **DELETE**: For terminating sessions (when `session.allowClientTermination` is enabled)
- **OPTIONS**: For CORS preflight requests

## Client Implementation

Here's an example of how to implement a client for the HTTP Stream Transport:

```typescript
/**
 * Basic client for the HTTP Stream Transport
 */
class HttpStreamClient {
  private baseUrl: string;
  private sessionId: string | null = null;
  private eventSource: EventSource | null = null;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async initialize() {
    // Create initialization request
    const initRequest = {
      jsonrpc: "2.0",
      id: "init-" + Date.now(),
      method: "initialize",
      params: { /* initialization parameters */ }
    };
    
    // Send initialize request
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream'
      },
      body: JSON.stringify(initRequest)
    });
    
    // Get session ID from response headers
    this.sessionId = response.headers.get('Mcp-Session-Id');
    console.log(`Session established: ${this.sessionId}`);
    
    // Process the response
    if (response.headers.get('Content-Type')?.includes('text/event-stream')) {
      // Handle streaming response
      this.processStream(response);
    } else {
      // Handle JSON response
      const result = await response.json();
      console.log('Initialization result:', result);
    }
    
    // Open SSE stream for server-to-client messages
    this.openEventStream();
  }
  
  private openEventStream() {
    const url = new URL(this.baseUrl);
    if (this.sessionId) {
      url.searchParams.append('session', this.sessionId);
    }
    
    this.eventSource = new EventSource(url.toString());
    
    this.eventSource.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('Received SSE message:', message);
        // Process message...
      } catch (e) {
        console.error('Error parsing SSE message:', e);
      }
    };
    
    this.eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      this.reconnectEventStream();
    };
    
    console.log('SSE stream opened');
  }
  
  private reconnectEventStream() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    
    setTimeout(() => this.openEventStream(), 1000);
  }
  
  private async processStream(response: Response) {
    const reader = response.body?.getReader();
    if (!reader) return;
    
    const decoder = new TextDecoder();
    let buffer = "";
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        // Process SSE events in buffer
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";
        
        for (const event of events) {
          const lines = event.split("\n");
          const data = lines.find(line => line.startsWith("data:"))?.slice(5);
          
          if (data) {
            try {
              const message = JSON.parse(data);
              console.log('Received stream message:', message);
              // Process message...
            } catch (e) {
              console.error('Error parsing stream message:', e);
            }
          }
        }
      }
    } catch (e) {
      console.error('Error reading stream:', e);
    }
  }
  
  async sendRequest(method: string, params: any = {}) {
    if (!this.sessionId) {
      throw new Error('Session not initialized');
    }
    
    const request = {
      jsonrpc: "2.0",
      id: method + "-" + Date.now(),
      method,
      params
    };
    
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
        'Mcp-Session-Id': this.sessionId
      },
      body: JSON.stringify(request)
    });
    
    if (response.headers.get('Content-Type')?.includes('text/event-stream')) {
      // Handle streaming response
      this.processStream(response);
      return null; // Response will be processed asynchronously
    } else {
      // Handle JSON response
      return await response.json();
    }
  }
  
  async terminate() {
    if (!this.sessionId) return;
    
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    
    try {
      await fetch(this.baseUrl, {
        method: 'DELETE',
        headers: {
          'Mcp-Session-Id': this.sessionId
        }
      });
      console.log('Session terminated');
    } catch (e) {
      console.error('Error terminating session:', e);
    }
    
    this.sessionId = null;
  }
}
```

## Security Considerations

1. **HTTPS**: Always use HTTPS in production environments
2. **Authentication**: Enable authentication for all endpoints
3. **CORS**: Configure appropriate CORS settings for your environment
4. **Message Size**: Set appropriate message size limits
5. **Session Timeout**: Implement session timeout logic for production use
6. **Rate Limiting**: Implement rate limiting for production use

## Backward Compatibility

The HTTP Stream Transport is designed to replace the deprecated SSE Transport while maintaining compatibility with the MCP protocol. If you're migrating from the SSE Transport:

1. Update your server configuration to use `type: "http-stream"` instead of `type: "sse"`
2. Update your client to use the single endpoint pattern instead of separate endpoints for SSE and messages
3. Implement session management using the `Mcp-Session-Id` header

## Error Handling

The transport includes comprehensive error handling, with appropriate HTTP status codes and JSON-RPC error responses:

- 400 Bad Request: Invalid JSON, invalid message format
- 401 Unauthorized: Authentication failure
- 404 Not Found: Invalid session ID
- 405 Method Not Allowed: Unsupported HTTP method
- 406 Not Acceptable: Missing required Accept header
- 413 Payload Too Large: Message size exceeds limit
- 429 Too Many Requests: Rate limit exceeded
- 500 Internal Server Error: Server-side errors

JSON-RPC error responses follow the standard format with detailed information:

```json
{
  "jsonrpc": "2.0",
  "id": "request-id",
  "error": {
    "code": -32000,
    "message": "Error message",
    "data": {
      // Additional error information
    }
  }
}
``` 

---

## HTTP QUICKSTART [EXPERIMENTAL]

Ready to build your first HTTP-based MCP server? Follow our [HTTP Quickstart Guide](../http-quickstart.md) to create and run a project using the HTTP Stream Transport in just a few minutes. 
