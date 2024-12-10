---
id: introduction
title: Introduction
sidebar_position: 1
---

# Introduction to MCP Framework

The Model Context Protocol (MCP) Framework is a TypeScript framework for building MCP servers that extend AI model capabilities through tools, resources, and prompts. This framework makes it easy to create and manage MCP servers that can be used with AI models like Claude.

## Example: Financial Data Analysis Server

Let's look at a practical example. Here's a simple MCP server that provides financial data analysis capabilities:

```typescript
import { MCPServer, MCPTool } from "mcp-framework";
import { z } from "zod";

// Define a tool for stock analysis
class StockAnalysisTool extends MCPTool<{ symbol: string }> {
  name = "stock_analysis";
  description = "Analyze stock data for a given symbol";

  schema = {
    symbol: {
      type: z.string(),
      description: "Stock symbol to analyze",
    },
  };

  async execute({ symbol }: { symbol: string }) {
    // In a real implementation, this would call a financial API
    const mockData = {
      symbol,
      price: 150.25,
      change: 2.5,
      volume: 1000000,
    };

    return mockData;
  }
}

// Create and start the server
const server = new MCPServer();

server.start().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
```

This example shows how you can create a simple MCP server that provides financial analysis capabilities to AI models. The server includes a tool that can analyze stock data, demonstrating the basic concepts of the framework.

## Key Features

- **Tool Support**: Create custom tools that extend AI model capabilities
- **Resource Management**: Handle external data sources and APIs
- **Prompt Templates**: Define reusable prompt templates
- **TypeScript Support**: Full TypeScript support with type safety
- **CLI Tools**: Easy project scaffolding and component creation
- **Simple API**: Clean, intuitive API design
- **Debugging Support**: Built-in debugging capabilities

## How It Works

1. **Create Tools**: Define tools that provide specific functionality
2. **Add Resources**: Connect to external data sources
3. **Define Prompts**: Create templates for common interactions
4. **Start Server**: Run your MCP server to make it available to AI models

The framework handles all the communication between your server and AI models, following the Model Context Protocol specification.

## When to Use MCP Framework

- Building custom tools for AI models
- Creating data integration services
- Developing specialized AI assistants
- Extending AI capabilities with external services
- Building enterprise AI solutions

Ready to get started? Head to the [Installation](installation) guide to begin building your first MCP server.
