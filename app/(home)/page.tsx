import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
        MCP Framework
      </h1>
      <p className="text-xl text-fd-muted-foreground mb-8 max-w-2xl">
        Build Model Context Protocol Servers in TypeScript
      </p>
      <div className="flex gap-4 mb-16">
        <Link
          href="/docs/introduction"
          className="rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground hover:bg-fd-primary/90"
        >
          Get Started
        </Link>
        <Link
          href="/docs/quickstart"
          className="rounded-lg border border-fd-border px-6 py-3 text-sm font-medium hover:bg-fd-accent"
        >
          Quickstart
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <FeatureCard
          title="Lightning Fast Setup"
          description="Get your MCP server running in minutes with automatic directory-based discovery and zero configuration."
        />
        <FeatureCard
          title="Powerful Tools"
          description="Build type-safe tools with Zod schema validation, automatic JSON schema generation, and full TypeScript support."
        />
        <FeatureCard
          title="Auto-Discovery"
          description="Tools, resources, and prompts are automatically discovered from your project structure — no manual registration needed."
        />
      </div>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-fd-border p-6 text-left hover:border-fd-primary/50 transition-colors">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-fd-muted-foreground">{description}</p>
    </div>
  );
}
