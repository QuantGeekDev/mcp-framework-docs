---
id: http-quickstart
title: HTTP Quickstart
sidebar_position: 4
---

# HTTP Quickstart

## Video Tutorial

Watch our video tutorial for a step-by-step guide to creating and using HTTP MCP servers:

[![MCP Framework HTTP Tutorial](https://img.youtube.com/vi/C2O7NteeQUs/0.jpg)](https://youtu.be/C2O7NteeQUs)

---

This guide will walk you through creating a simple MCP server that uses the HTTP Stream Transport, allowing you to expose your AI tools via a web-accessible endpoint.

## Prerequisites

Before you begin, make sure you have:
- **Node.js** (version 14 or later) installed
- **npm** (Node Package Manager) installed
- `mcp-framework` installed globally:

```bash
npm i -g mcp-framework
```

## Create a New HTTP Project

The easiest way to create an HTTP-enabled MCP server is to use the CLI with the `--http` flag:

```bash
mcp create weather-http-server --http --port 1337 --cors
cd weather-http-server
```

This command:
- Creates a new project called "weather-http-server"
- Configures it to use the HTTP Stream Transport on port 1337
- Enables CORS to allow browser-based clients to connect

## Examine the Generated Configuration

Open `src/index.ts` to see the HTTP configuration:

```typescript
import { MCPServer } from "mcp-framework";

const server = new MCPServer({
  transport: {
    type: "http-stream",
    options: {
      port: 1337,
      cors: {
        allowOrigin: "*"
      }
    }
  }
});

server.start();
```

## Add a Weather Tool

Use the CLI to create a new tool:

```bash
mcp add tool weather
```

This creates `src/tools/WeatherTool.ts`. Let's modify it to handle weather requests:

```typescript
import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface WeatherInput {
  city: string;
}

class WeatherTool extends MCPTool<WeatherInput> {
  name = "weather";
  description = "Get weather information for a city";

  schema = {
    city: {
      type: z.string(),
      description: "City name to get weather for",
    },
  };

  async execute({ city }: WeatherInput) {
    // In a real scenario, this would call a weather API
    // For now, we return this sample data
    return {
      city,
      temperature: 22,
      condition: "Sunny",
      humidity: 45,
    };
  }
}

export default WeatherTool;
```

## Build and Start Your Server

```bash
# Build the project
npm run build

# Start the server
npm start
```

Your HTTP MCP server is now running at `http://localhost:1337/mcp`.

## Testing Your HTTP Server

### Experimental Debugger

While we wait for HTTP Clients to come out in the wild, you can test your HTTP Server with our experimental debugger:

```bash
npx mcp-debug
```

This tool will help you inspect and interact with your MCP server, sending requests and viewing responses. You can also follow our video tutorial at the top of this page for a demonstration.

### Contribute an HTTP Client

Have an HTTP Client? Add it to these docs by submitting a PR! We welcome contributions from the community to expand the ecosystem of MCP HTTP clients.

## Production Considerations

For production use, consider the following:

1. **HTTPS**: Always use HTTPS in production. You can set up a reverse proxy like Nginx or use services like Cloudflare.

2. **Authentication**: Add authentication to protect your endpoints. The framework supports various authentication providers like API keys and JWT tokens. See the [Authentication Options](Authentication/overview.md) documentation for more details.

3. **Response Mode**: Choose the appropriate response mode based on your use case:
   - `batch` (default): Collects all responses and sends them in a single JSON response
   - `stream`: Opens an SSE stream for each request, allowing streaming responses

```typescript
transport: {
  type: "http-stream",
  options: {
    responseMode: "stream" // For streaming responses
  }
}
```

4. **Session Configuration**: Configure session management:

```typescript
transport: {
  type: "http-stream",
  options: {
    session: {
      enabled: true,
      headerName: "Mcp-Session-Id",
      allowClientTermination: true
    }
  }
}
```

5. **Stream Resumability**: Enable resumable streams for better reliability:

```typescript
transport: {
  type: "http-stream",
  options: {
    resumability: {
      enabled: true,
      historyDuration: 300000 // 5 minutes in milliseconds
    }
  }
}
```

## What's Next?

Now that you have your HTTP MCP server running, you can:

1. **Add more tools**: Extend your server with additional tools
2. **Integrate with actual APIs**: Connect to real weather services
3. **Add resources**: Implement caching or dynamic data sources
4. **Create a better web client**: Build a sophisticated web UI
5. **Set up authentication**: Add proper authentication for production
6. **Deploy to a server**: Host your MCP server on a cloud provider

### Next Steps

- Learn more about [HTTP Stream Transport](Transports/http-stream.md)
- Explore [Authentication Options](Authentication/overview.md)
- *Advanced Configuration and Deployment guides coming soon*
