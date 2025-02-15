# Authentication

The MCP Framework provides built-in authentication support through various authentication providers. This allows you to secure your MCP server endpoints and ensure only authorized clients can access your tools and resources.

## Available Authentication Providers

### API Key Authentication

The API Key authentication provider allows you to secure your endpoints using API keys. This is useful for simple authentication scenarios where you want to control access using predefined keys.

```typescript
import { APIKeyAuthProvider } from "@modelcontextprotocol/mcp-framework";

const authProvider = new APIKeyAuthProvider({
  keys: ["your-api-key-1", "your-api-key-2"],
  headerName: "X-API-Key" // Optional, defaults to "X-API-Key"
});
```

Clients must include the API key in the specified header:
```http
X-API-Key: your-api-key-1
```

### JWT Authentication

The JWT authentication provider enables token-based authentication using JSON Web Tokens. This is suitable for more complex authentication scenarios where you need to include user information or other claims in the token.

```typescript
import { JWTAuthProvider } from "@modelcontextprotocol/mcp-framework";

const authProvider = new JWTAuthProvider({
  secret: "your-jwt-secret",
  algorithms: ["HS256"], // Optional, defaults to ["HS256"]
  headerName: "Authorization", // Optional, defaults to "Authorization"
  requireBearer: true // Optional, defaults to true
});
```

Clients must include the JWT token in the Authorization header:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## Configuring Authentication

You can configure authentication when setting up your SSE transport:

```typescript
import { MCPServer, APIKeyAuthProvider } from "@modelcontextprotocol/mcp-framework";

const server = new MCPServer({
  transport: {
    type: "sse",
    options: {
      auth: {
        provider: new APIKeyAuthProvider({
          keys: ["your-api-key"]
        }),
        endpoints: {
          sse: true,    // Require auth for SSE connections
          messages: true // Require auth for messages
        }
      }
    }
  }
});
```

### Endpoint Configuration

The `endpoints` configuration allows you to specify which endpoints require authentication:

- `sse`: Controls authentication for the SSE connection endpoint
  - Default: `false`
- `messages`: Controls authentication for the message endpoint
  - Default: `true`

## Error Handling

Authentication providers include built-in error handling that returns appropriate HTTP status codes and error messages:

```typescript
// Example error response for invalid API key
{
  "error": "Invalid API key",
  "status": 401,
  "type": "authentication_error"
}

// Example error response for invalid JWT
{
  "error": "Invalid or expired JWT token",
  "status": 401,
  "type": "authentication_error"
}
```

## Best Practices

1. **API Key Security**:
   - Use long, random strings for API keys
   - Rotate keys periodically
   - Store keys securely
   - Use HTTPS in production

2. **JWT Security**:
   - Use a strong secret key
   - Set appropriate token expiration
   - Include only necessary claims
   - Use secure algorithms (HS256, RS256, etc.)

3. **General Security**:
   - Enable authentication for both SSE and message endpoints in production
   - Use environment variables for secrets
   - Implement rate limiting
   - Monitor failed authentication attempts
