---
id: introduction
title: Introduction
sidebar_position: 1
---

# Introduction to MCP Framework

This framework makes it easy to create and manage MCP (modelcontextprotocol) servers that can be used with MCP Clients like the Claude Desktop app.

It is simple and intuitive to use.

MCP-Framework gives you architecture out of the box, with automatic directory-based discovery for tools, resources, and prompts. Use our powerful MCP abstractions to define tools, resources, or prompts in an elegant way. Our cli makes getting started with your own MCP server a breeze

:::tip Quick Setup
You can build a MCP server with mcp-framework in under 5 minutes! [Follow the quickstart guide](./quickstart) to get started.
:::

[Quickstart Guide](./quickstart)

## Key Features

- **Tool Support**: Create custom tools that extend AI model capabilities
- **Resource Management**: Handle external data sources and APIs
- **Prompt Templates**: Define reusable prompt templates
- **Multiple Transports**: Support for both STDIO and SSE (Server-Sent Events) communication
- **Authentication**: Built-in JWT and API Key authentication for SSE transport
- **Use the power of Typescript**: Full TypeScript support with type safety
- **CLI Tool**: Easy project scaffolding and component creation
- **Fast Development**: Elegant and fast development cycles

## How It Works

MCP Framework provides four main components:

### 1. Tools

Functions that AI models can invoke to:

- Fetch data from APIs
- Transform data
- Perform computations
- Interact with external services

### 2. Resources

Data sources that can be:

- Read by the AI model
- Subscribed to for updates
- Used to provide context

### 3. Prompts

Template systems that:

- Define reusable conversation flows
- Provide structured context
- Guide model interactions

### 4. Transports

Communication layers that:

- Handle client-server communication
- Support different use cases:
  - **STDIO**: Perfect for CLI tools and local integrations
  - **SSE**: Ideal for web applications with optional authentication

The framework handles all communication between your server and AI models, following the Model Context Protocol specification.

## When to Use MCP Framework

- Building custom tools for AI models
- Creating data integration services
- Developing specialized AI assistants
- Extending AI capabilities with external services
- Building enterprise AI solutions
- Creating web-based AI tools (using SSE transport)
- Developing secure AI services with authentication

Ready to get started? Head to the [Installation](./installation) guide to begin building your first MCP server, or learn more about our [transport options](Transports/overview.md).
