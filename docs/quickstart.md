---
id: quickstart
title: Quickstart
sidebar_position: 3
---

# Quickstart

Let's create a simple MCP server with a basic tool. This guide will walk you through creating a weather information tool.

## Prerequisites

Make sure you have `mcp-framework` installed globally with npm:

```bash
npm i -g mcp-framework
```

## Create a New Project

First, create a new MCP server project:

```bash
mcp create weather-mcp-server
cd weather-mcp-server
```

## Add a Weather Tool

Use the CLI to create a new tool:

```bash
mcp add tool weather
```

This creates `src/tools/WeatherTool.ts` Let's modify it to handle weather requests:

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

## Build your project

```bash
# Build the project
npm run build
```

Your MCP server is now ready to be used by an MCP Client. Keep reading to add it to Claude Desktop

## Use the Tool

You can test your tool using the Claude Desktop client. Add this to your Claude Desktop config:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "weather-mcp-server": {
      "command": "node",
      "args": ["/absolute/path/to/weather-mcp-server/dist/index.js"]
    }
  }
}
```

Now you can ask Claude to use your weather tool:

```
Could you check the weather in London using the weather tool?
```

## What's Next?

The example above shows a basic tool implementation. In practice, you might want to:

1. Add real API integration
2. Include error handling
3. Add more weather-related tools
4. Create resources for caching
5. Define prompts for common queries

Check out our [US Treasury Data Example](https://github.com/QuantGeekDev/fiscal-data-mcp) for a more complete implementation.

### Next Steps

- Learn more about [Tools](Tools/overview)
- Learn about[Resources](Resources/overview)
- Understand [Prompts](Prompts/overview)
- Set up [Debugging](debugging)
