import { source } from '@/lib/source';
import { getLLMText } from '@/lib/get-llm-text';

export const revalidate = false;

export function GET() {
  const pages = source.getPages();
  const content = pages.map(getLLMText).join('\n\n');
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
