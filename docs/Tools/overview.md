---
id: tools-overview
title: Tools Overview
sidebar_position: 1
---

# Building Tools with MCP Framework

:::tip Power of Tools
Tools are the powerhouse of your MCP server - they let AI models interact with external services, process data, and perform complex operations with type safety!
:::

## What is a Tool?

A tool is a MCP class that defines:

- What inputs it accepts
- What it does with those inputs
- What it returns to the AI model

Here's a simple example:

```typescript
import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface GreetingInput {
  name: string;
  language: string;
}

class GreetingTool extends MCPTool<GreetingInput> {
  name = "greeting";
  description = "Generate a greeting in different languages";

  schema = {
    name: {
      type: z.string(),
      description: "Name to greet",
    },
    language: {
      type: z.enum(["en", "es", "fr"]),
      description: "Language code (en, es, fr)",
    },
  };

  async execute({ name, language }) {
    const greetings = {
      en: `Hello ${name}!`,
      es: `¡Hola ${name}!`,
      fr: `Bonjour ${name}!`,
    };
    return greetings[language];
  }
}
```

## Creating Tools

### Using the CLI

The fastest way to create a new tool:

```bash
mcp add tool my-tool
```

This generates a tool template in `src/tools/MyTool.ts`.

### Manual Creation

1. Create a new TypeScript file in `src/tools/`
2. Extend the `MCPTool` class
3. Define your interface and implementation

## Tool Architecture

Every tool has three main parts:

### 1. Input Schema

```typescript
schema = {
  email: {
    type: z.string().email(),
    description: "User's email address",
  },
  count: {
    type: z.number().min(1),
    description: "Number of items to process",
  },
};
```

### 2. Metadata

```typescript
name = "email-sender";
description = "Sends emails to specified addresses";
```

### 3. Execution Logic

```typescript
async execute(input: MyInput) {
  // Your tool's core functionality
  return result;
}
```

## Type Safety

:::tip Type Safety First
MCP Framework leverages TypeScript and Zod to provide end-to-end type safety!
:::

```typescript
interface DataInput {
  userId: number;
  fields: string[];
}

class DataTool extends MCPTool<DataInput> {
  schema = {
    userId: {
      type: z.number(),
      description: "User ID to fetch data for",
    },
    fields: {
      type: z.array(z.string()),
      description: "Fields to include in response",
    },
  };
}
```

## Error Handling

Tools should handle errors gracefully:

```typescript
async execute(input: MyInput) {
  try {
    const result = await this.processData(input);
    return result;
  } catch (error) {
    if (error.code === 'NETWORK_ERROR') {
      throw new Error('Unable to reach external service');
    }
    throw new Error(`Operation failed: ${error.message}`);
  }
}
```

## Best Practices

:::tip Pro Tips
Following these practices will make your tools more reliable and maintainable!
:::

1. **Clear Names**

   ```typescript
   name = "fetch-user-data"; // Good
   name = "fud"; // Bad
   ```

2. **Detailed Descriptions**

   Descriptions are also read by the LLMs - so make sure to make them detailed

   ```typescript
   description =
     "Fetches user data including profile, preferences, and settings";
   ```

3. **Descriptive Input Validation**

   ```typescript
   schema = {
     age: {
       type: z.number().min(0).max(150),
       description: "User's age (0-150)",
     },
   };
   ```

## Next Steps

- Learn about [API Integration](api-integration)
- Learn about [Prompts](../Prompts/prompts-overview)
- Learn about [Resources](../Resources/resources-overview)
