import { readFileSync } from 'fs';
import { join } from 'path';
import { source } from '@/lib/source';
import type { InferPageType } from 'fumadocs-core/source';

export function getLLMText(page: InferPageType<typeof source>): string {
  // Read the raw MDX file and strip frontmatter
  try {
    const filePath = join(process.cwd(), `content/docs/${page.file.path}`);
    const raw = readFileSync(filePath, 'utf-8');
    // Strip frontmatter
    const content = raw.replace(/^---[\s\S]*?---\n*/, '').trim();
    return `# ${page.data.title} (https://mcp-framework.com${page.url})\n\n${content}`;
  } catch {
    return `# ${page.data.title} (https://mcp-framework.com${page.url})\n\n`;
  }
}
