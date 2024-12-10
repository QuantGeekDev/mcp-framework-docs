---
id: prompts-overview
title: Prompts Overview
sidebar_position: 1
---

# Working with Prompts

:::tip Power of Prompts
Prompts let you create reusable templates for AI interactions, making your MCP server more consistent and powerful!
:::

## What are Prompts?

Prompts are reusable templates that:

- Define conversation flows
- Provide structured context
- Use dynamic data
- Ensure consistent AI responses

Here's a simple example:

```typescript
import { MCPPrompt } from "mcp-framework";
import { z } from "zod";

interface GreetingPromptInput {
  userName: string;
  timeOfDay: string;
}

class GreetingPrompt extends MCPPrompt<GreetingPromptInput> {
  name = "greeting";
  description = "Generates a personalized greeting";

  schema = {
    userName: {
      type: z.string(),
      description: "User's name",
      required: true,
    },
    timeOfDay: {
      type: z.enum(["morning", "afternoon", "evening"]),
      description: "Time of day",
      required: true,
    },
  };

  async generateMessages({ userName, timeOfDay }) {
    return [
      {
        role: "user",
        content: {
          type: "text",
          text: `Good ${timeOfDay} ${userName}! How can I assist you today?`,
        },
      },
    ];
  }
}
```

## Creating Prompts

### Using the CLI

```bash
mcp add prompt my-prompt
```

This creates a new prompt in `src/prompts/MyPrompt.ts`.

### Prompt Structure

Every prompt has:

1. **Metadata**

```typescript
name = "data-analysis";
description = "Analyzes data with specific parameters";
```

2. **Input Schema**

```typescript
schema = {
  dataset: {
    type: z.string(),
    description: "Dataset to analyze",
    required: true,
  },
  metrics: {
    type: z.array(z.string()),
    description: "Metrics to calculate",
    required: true,
  },
};
```

3. **Message Generation**

```typescript
async generateMessages(input) {
  return [{
    role: "user",
    content: {
      type: "text",
      text: `Analyze ${input.dataset} for ${input.metrics.join(", ")}`
    }
  }];
}
```

## Advanced Features

### Using Resources in Prompts

```typescript
class DataAnalysisPrompt extends MCPPrompt {
  async generateMessages({ datasetId }) {
    const dataResource = new DatasetResource(datasetId);
    const [data] = await dataResource.read();

    return [
      {
        role: "user",
        content: {
          type: "text",
          text: "Please analyze this dataset:",
          resource: {
            uri: data.uri,
            text: data.text,
            mimeType: data.mimeType,
          },
        },
      },
    ];
  }
}
```

### Multi-step Prompts

```typescript
class ReportPrompt extends MCPPrompt {
  async generateMessages({ reportType }) {
    return [
      {
        role: "system",
        content: {
          type: "text",
          text: "You are a professional report writer.",
        },
      },
      {
        role: "user",
        content: {
          type: "text",
          text: `Create a ${reportType} report using the following data:`,
        },
      },
    ];
  }
}
```

## Best Practices

:::tip Pro Tips
Follow these practices for better prompt design!
:::

1. **Clear Naming**

```typescript
name = "financial-analysis"; // Good
name = "fa"; // Bad
```

2. **Detailed Descriptions**

```typescript
description =
  "Analyzes financial data and provides insights with specific metrics";
```

3. **Input Validation**

```typescript
schema = {
  email: {
    type: z.string().email(),
    description: "Valid email address",
    required: true,
  },
};
```

4. **Structured Messages**

```typescript
async generateMessages(input) {
  return [
    {
      role: "system",
      content: {
        type: "text",
        text: "Context setting message"
      }
    },
    {
      role: "user",
      content: {
        type: "text",
        text: "Main instruction"
      }
    }
  ];
}
```

## Examples

### Report Generator

```typescript
class ReportGeneratorPrompt extends MCPPrompt {
  name = "report-generator";
  description = "Generates formatted reports from data";

  schema = {
    data: {
      type: z.object({
        title: z.string(),
        sections: z.array(z.string()),
      }),
      description: "Report data structure",
    },
    format: {
      type: z.enum(["short", "detailed"]),
      description: "Report format",
    },
  };

  async generateMessages({ data, format }) {
    return [
      {
        role: "user",
        content: {
          type: "text",
          text: `Generate a ${format} report titled "${
            data.title
          }" with the following sections: ${data.sections.join(", ")}`,
        },
      },
    ];
  }
}
```

## Next Steps

- Learn about [Tools](../Tools/tools-overview)
- Learn about [Resources](../Resources/resources-overview)
- [Get Started](../quickstart)
