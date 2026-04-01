import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | MCP Framework',
    default: 'MCP Framework',
  },
  description: 'Build Model Context Protocol Servers in TypeScript',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Windows 2000 — no external fonts, uses system Tahoma/Arial */}
        <style>{`
          :root { color-scheme: light; }
          body { font-family: Tahoma, Arial, 'MS Sans Serif', sans-serif !important; }
        `}</style>
      </head>
      <body style={{ fontFamily: 'Tahoma, Arial, "MS Sans Serif", sans-serif' }}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
