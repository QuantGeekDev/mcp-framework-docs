import { source } from '@/lib/source';

export const revalidate = false;

export function GET() {
  const pages = source.getPages();
  const sections = new Map<string, Array<{ title: string; url: string; description?: string }>>();
  const topLevel: Array<{ title: string; url: string; description?: string }> = [];

  for (const page of pages) {
    const entry = {
      title: page.data.title,
      url: `https://mcp-framework.com${page.url}`,
      description: page.data.description,
    };

    if (page.slugs.length > 1) {
      const section = page.slugs[0];
      if (!sections.has(section)) sections.set(section, []);
      sections.get(section)!.push(entry);
    } else {
      topLevel.push(entry);
    }
  }

  let content = '# MCP Framework\n\n> Build Model Context Protocol Servers in TypeScript\n\n';

  for (const page of topLevel) {
    content += `- [${page.title}](${page.url})${page.description ? `: ${page.description}` : ''}\n`;
  }

  for (const [section, sectionPages] of sections) {
    const title = section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
    content += `\n## ${title}\n\n`;
    for (const page of sectionPages) {
      content += `- [${page.title}](${page.url})${page.description ? `: ${page.description}` : ''}\n`;
    }
  }

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
