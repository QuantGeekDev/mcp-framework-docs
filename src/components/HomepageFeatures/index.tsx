import React from "react";
import Link from "@docusaurus/Link";

export default function HomepageFeatures() {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast Setup",
      description:
        "Create your MCP server in under 5 minutes with our CLI. One command is all it takes to start building.",
    },
    {
      icon: "🛠️",
      title: "Powerful Tools",
      description:
        "Build type-safe tools that extend AI capabilities. From API integrations to data processing, the possibilities are endless.",
    },
    {
      icon: "🔄",
      title: "Auto-Discovery",
      description:
        "Focus on building features. Our framework automatically discovers and loads your tools, resources, and prompts.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">MCP Framework</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Build powerful Model Context Protocol servers in TypeScript
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
              >
                <div className="mb-3 text-2xl">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
