---
id: fiscal-data
title: US Treasury Fiscal Data Example
sidebar_position: 1
---

# US Treasury Fiscal Data Example

:::tip Live Example
See MCP Framework in action with this US Treasury data server that provides real-time access to treasury statements and operating cash balances!
:::

## Overview

The [Fiscal Data MCP Server](https://github.com/QuantGeekDev/fiscal-data-mcp) demonstrates a practical implementation of an MCP server that connects to the US Treasury's Fiscal Data API. It showcases:

- Tools for fetching specific treasury statements
- Resources for historical data access
- Prompts for generating formatted reports
- Smart caching for API efficiency

## Features

### 1. Daily Treasury Statements

Fetch treasury data for specific dates using the `get_daily_treasury_statement` tool:

Example usage:

```typescript
User: Get the treasury statement for 2024-03-01
```

### 2. Historical Data Resource

Access 30 days of historical treasury data through the resource system:

- Automatically cached for 1 hour
- Updates on demand
- Provides formatted JSON data

### 3. Report Generation

Generate formatted treasury reports using the `daily_treasury_report` prompt:

```typescript
User: Generate a treasury report for 2024-03-01
```

## Quick Start

### 1. Install and Use with Claude Desktop

Add this configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fiscal-data": {
      "command": "npx",
      "args": ["fiscal-data-mcp"]
    }
  }
}
```

### 2. Example Interactions

Once configured, you can interact with the server through Claude:

```
User: Can you get the treasury statement for the 20th of September 2023?
```
