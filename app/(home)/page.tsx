import Link from "next/link";
import {
  Zap,
  Code2,
  FolderSearch,
  Terminal,
  ArrowRight,
  MessageCircle,
  Blocks,
  Shield,
  Workflow,
  Plug,
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-64 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <HeroSection />
      <FeaturesSection />
      <CodeSection />
      <CommunitySection />

      <footer className="px-6 pb-16 pt-4 text-center text-sm text-fd-muted-foreground">
        Open source under MIT ·{" "}
        <a
          href="https://github.com/QuantGeekDev/mcp-framework"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-fd-foreground transition-colors"
        >
          GitHub
        </a>
        {" · "}
        <a
          href="https://github.com/QuantGeekDev/mcp-framework/graphs/contributors"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-fd-foreground transition-colors"
        >
          Contributors
        </a>
      </footer>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* Version badge */}
      <a
        href="https://github.com/QuantGeekDev/mcp-framework/releases"
        target="_blank"
        rel="noopener noreferrer"
        className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-fd-muted-foreground backdrop-blur-sm transition-colors hover:border-white/20 hover:text-fd-foreground"
      >
        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        <span className="font-mono">v0.2.19</span>
        <span className="text-white/20">|</span>
        <span>OAuth 2.1 &amp; HTTP Streaming</span>
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </a>

      {/* Headline */}
      <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
        Build{" "}
        <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
          MCP Servers
        </span>
        <br />
        in Minutes
      </h1>

      <p className="mt-6 max-w-xl text-lg text-fd-muted-foreground sm:text-xl">
        The TypeScript framework for Model Context Protocol. Type-safe tools,
        auto-discovery, zero boilerplate.
      </p>

      {/* Install command */}
      <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-5 py-3 font-mono text-sm backdrop-blur-sm">
        <Terminal className="h-4 w-4 text-fd-muted-foreground shrink-0" />
        <code>
          <span className="text-fd-muted-foreground">$</span>{" "}
          <span className="text-purple-400">npx</span>{" "}
          <span className="text-fd-foreground">create-mcp-framework</span>{" "}
          <span className="text-blue-400">my-server</span>
        </code>
      </div>

      {/* CTA buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/docs/quickstart"
          className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition-all hover:bg-purple-500 hover:shadow-purple-700/40"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href="https://github.com/QuantGeekDev/mcp-framework"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold transition-all hover:bg-white/10 hover:border-white/25"
        >
          <GithubIcon className="h-4 w-4" />
          View on GitHub
        </a>
        <Link
          href="/docs/docs-package"
          className="inline-flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-6 py-3 text-sm font-semibold text-purple-300 transition-all hover:bg-purple-500/20 hover:border-purple-500/50"
        >
          <Plug className="h-4 w-4" />
          Use Docs MCP Server
        </Link>
      </div>

      {/* Social proof */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-fd-muted-foreground">
        <a
          href="https://github.com/QuantGeekDev/mcp-framework"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-fd-foreground"
        >
          <GithubIcon className="h-4 w-4" />
          <span>Star on GitHub</span>
        </a>
        <span className="text-white/15">|</span>
        <a
          href="https://discord.com/invite/3uqNS3KRP2"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-fd-foreground"
        >
          <DiscordIcon className="h-4 w-4" />
          <span>Join Discord</span>
        </a>
        <span className="text-white/15">|</span>
        <a
          href="https://www.npmjs.com/package/mcp-framework"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-fd-foreground"
        >
          <Blocks className="h-4 w-4" />
          <span>npm</span>
        </a>
      </div>

      {/* Trusted by */}
      <div className="mt-14 border-t border-white/[0.06] pt-10">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-fd-muted-foreground/60 mb-7">
          Trusted by builders at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {/* VISA */}
          <div className="flex items-center text-fd-muted-foreground/50 transition-colors hover:text-fd-foreground/80">
            <span className="text-lg font-bold italic tracking-wide">VISA</span>
          </div>
          {/* MongoDB */}
          <div className="flex items-center gap-1.5 text-fd-muted-foreground/50 transition-colors hover:text-fd-foreground/80">
            <svg width="10" height="20" viewBox="0 0 15 36" fill="currentColor"><path d="M8.1 1.4C7.5.6 7.1 0 7.1 0S6.6.8 6.1 1.6C2.4 6.5.6 11.2.6 15.8c0 4.3 2.5 7.4 5.8 8.5l.3.1v3.5s0 .1.1.1h.5c.1 0 .1 0 .1-.1v-3.5l.3-.1c3.3-1.1 5.8-4.2 5.8-8.5 0-4.7-2-9.3-5.4-14.4z"/></svg>
            <span className="text-sm font-semibold">MongoDB</span>
          </div>
          {/* XMCP */}
          <div className="flex items-center gap-1 text-fd-muted-foreground/50 transition-colors hover:text-fd-foreground/80">
            <span className="text-base font-bold">⚡</span>
            <span className="text-sm font-semibold">XMCP</span>
          </div>
          {/* Carta */}
          <div className="flex items-center text-fd-muted-foreground/50 transition-colors hover:text-fd-foreground/80">
            <span className="text-sm font-semibold tracking-tight">Carta</span>
          </div>
          {/* Docker */}
          <div className="flex items-center gap-2 text-fd-muted-foreground/50 transition-colors hover:text-fd-foreground/80">
            <svg width="22" height="16" viewBox="0 0 24 18" fill="currentColor"><path d="M13.98 1.68h-2.16v2.04h2.16V1.68zM13.98 4.2h-2.16v2.04h2.16V4.2zM11.34 4.2H9.18v2.04h2.16V4.2zM8.7 4.2H6.54v2.04H8.7V4.2zM8.7 6.72H6.54v2.04H8.7V6.72zM11.34 6.72H9.18v2.04h2.16V6.72zM13.98 6.72h-2.16v2.04h2.16V6.72zM16.62 6.72h-2.16v2.04h2.16V6.72zM19.26 5.94c-.48-.3-1.56-.42-2.4-.24-.12-.84-.6-1.56-1.14-2.16l-.24-.24-.24.24c-.48.54-.78 1.26-.72 2.04.06.42.18.84.42 1.2-.36.18-.66.36-1.02.48-.54.18-1.08.3-1.62.3H.12l-.06.36c-.12 1.38.06 2.76.6 4.02.66 1.44 1.68 2.46 3.06 3.06 1.56.66 3.24.96 4.98.96 5.1 0 9.24-2.28 11.22-7.14 1.02.06 2.16.06 2.94-.66.42-.42.6-.96.72-1.56l.06-.3-.24-.18c-.36-.24-.96-.42-1.38-.48z"/></svg>
            <span className="text-sm font-semibold">Docker</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Setup",
    description:
      "Scaffold a production-ready MCP server in seconds. Directory-based discovery means zero configuration.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: Code2,
    title: "Type-Safe Tools",
    description:
      "Define tools with Zod schemas for automatic validation, JSON schema generation, and full TypeScript IntelliSense.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: FolderSearch,
    title: "Auto-Discovery",
    description:
      "Drop files into tools/, resources/, or prompts/. The framework finds and registers them automatically.",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: Workflow,
    title: "Multiple Transports",
    description:
      "stdio for CLI tools, SSE for web apps, HTTP streaming for production APIs. Switch with one config change.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Shield,
    title: "Built-in Auth",
    description:
      "OAuth 2.1, JWT, and API key auth out of the box. Production-ready security with zero extra dependencies.",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
  {
    icon: Blocks,
    title: "Extensible",
    description:
      "Custom middleware, transports, and auth providers. The framework adapts to your stack, not the other way around.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
];

function FeaturesSection() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need
          </h2>
          <p className="mt-3 text-fd-muted-foreground text-lg">
            A batteries-included framework that gets out of your way.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-white/8 bg-white/[0.03] p-6 transition-all hover:bg-white/[0.06] hover:border-white/15"
            >
              <div className={`mb-4 inline-flex rounded-lg border p-2 ${f.bg}`}>
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>
              <h3 className="mb-2 font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-fd-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeSection() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, expressive API
          </h2>
          <p className="mt-3 text-fd-muted-foreground text-lg">
            A tool in 20 lines. Shipped in 5 minutes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Code block */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50">
            <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
              </div>
              <span className="ml-2 font-mono text-xs text-fd-muted-foreground">
                tools/greeter.ts
              </span>
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-fd-muted-foreground">
              <code>{`import { MCPTool } from "mcp-framework";
import { z } from "zod";

const schema = z.object({
  name: z.string()
    .describe("Name to greet"),
});

class GreeterTool extends MCPTool<typeof schema> {
  name = "greeter";
  description = "Greets a user by name";
  schema = schema;

  async execute({ name }) {
    return {
      content: [{
        type: "text",
        text: \`Hello, \${name}!\`
      }]
    };
  }
}

export default GreeterTool;`}</code>
            </pre>
          </div>

          {/* Steps */}
          <div className="flex flex-col justify-center gap-7">
            <Step
              number="1"
              title="Scaffold your project"
              description="One command gives you a fully-configured TypeScript MCP server with build scripts and directory structure."
              code="npx create-mcp-framework my-server"
            />
            <Step
              number="2"
              title="Add tools"
              description="Create a class in tools/. Define your schema with Zod. The framework handles registration automatically."
              code="mcp add tool greeter"
            />
            <Step
              number="3"
              title="Ship it"
              description="Build and connect to Claude Desktop, Cursor, or any MCP-compatible client."
              code="npm run build"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  description,
  code,
}: {
  number: string;
  title: string;
  description: string;
  code: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/25 font-mono text-sm font-bold text-purple-400">
        {number}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-fd-muted-foreground">{description}</p>
        <code className="mt-2 inline-block rounded-md border border-white/10 bg-black/30 px-3 py-1 font-mono text-xs text-fd-muted-foreground">
          {code}
        </code>
      </div>
    </div>
  );
}

function CommunitySection() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center sm:p-16">
          {/* Inner glow */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-600/10 to-transparent" />

          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
            Join the community
          </h2>
          <p className="relative mt-3 text-lg text-fd-muted-foreground">
            Get help, share your work, and help shape the framework.
          </p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://discord.com/invite/3uqNS3KRP2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-lg bg-[#5865F2] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5865F2]/30 transition-all hover:bg-[#4752C4] hover:shadow-[#5865F2]/50"
            >
              <DiscordIcon className="h-5 w-5" />
              Join Discord
            </a>
            <a
              href="https://github.com/QuantGeekDev/mcp-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold transition-all hover:bg-white/10 hover:border-white/25"
            >
              <GithubIcon className="h-5 w-5" />
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
