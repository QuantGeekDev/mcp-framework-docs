---
id: api-integration
title: API Integration
sidebar_position: 2
---

# Integrating APIs with Tools

:::tip Power of APIs
Connect your AI model to any API! From weather services to databases, the possibilities are endless.
:::

## HTTP Requests

MCP Framework provides a built-in `fetch` method:

```typescript
class WeatherTool extends MCPTool<WeatherInput> {
  async execute({ city }) {
    const API_KEY = process.env.WEATHER_API_KEY;
    const response = await this.fetch(
      `https://api.weather.com/v1/current/${city}?key=${API_KEY}`
    );
    return response;
  }
}
```

## Authentication

### Bearer Tokens

```typescript
class AuthenticatedTool extends MCPTool {
  private getAuthHeader() {
    return `Bearer ${process.env.API_TOKEN}`;
  }

  async execute(input) {
    const response = await this.fetch("https://api.service.com/data", {
      headers: {
        Authorization: this.getAuthHeader(),
        "Content-Type": "application/json",
      },
    });
    return response;
  }
}
```

### API Keys

```typescript
class ApiKeyTool extends MCPTool {
  private apiKey = process.env.API_KEY;

  async execute(input) {
    const url = new URL("https://api.service.com/data");
    url.searchParams.append("api_key", this.apiKey);

    return this.fetch(url.toString());
  }
}
```

## Error Handling

:::warning Handle API Errors
Always handle API errors gracefully to provide meaningful feedback!
:::

```typescript
class RobustApiTool extends MCPTool {
  async execute(input) {
    try {
      const response = await this.fetch("https://api.example.com/data");

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("Request timed out");
      }
      if (error.name === "TypeError") {
        throw new Error("Network error");
      }
      throw error;
    }
  }
}
```

## Complete Example

Here's a complete example integrating with the GitHub API:

```typescript
import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface GitHubInput {
  username: string;
  repo: string;
}

class GitHubStarsTool extends MCPTool<GitHubInput> {
  name = "github-stars";
  description = "Get star count for a GitHub repository";

  schema = {
    username: {
      type: z.string(),
      description: "GitHub username",
    },
    repo: {
      type: z.string(),
      description: "Repository name",
    },
  };

  private headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };

  async execute({ username, repo }) {
    try {
      const response = await this.fetch(
        `https://api.github.com/repos/${username}/${repo}`,
        { headers: this.headers }
      );

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }

      const data = await response.json();

      return {
        stars: data.stargazers_count,
        url: data.html_url,
        description: data.description,
      };
    } catch (error) {
      throw new Error(`Failed to fetch repo data: ${error.message}`);
    }
  }
}

export default GitHubStarsTool;
```

## Best Practices

1. **Environment Variables**

   - Store API keys in `.env`
   - Never commit secrets
   - Use descriptive names

2. **Response Validation**

   ```typescript
   const schema = z.object({
     data: z.array(z.string()),
     meta: z.object({
       count: z.number(),
     }),
   });

   const validated = schema.parse(response);
   ```

## Next Steps

- Learn about [Resources](../Resources/resources-overview)
- Learn about [Prompts](../Prompts/prompts-overview)
