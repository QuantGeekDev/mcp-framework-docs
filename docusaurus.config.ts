import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "MCP Framework",
  tagline: "Build Model Context Protocol Servers in TypeScript",
  favicon: "img/favicon.ico",
  url: "https://mcp-framework.com",
  baseUrl: "/",
  organizationName: "QuantGeekDev",
  projectName: "mcp-framework",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/QuantGeekDev/mcp-framework/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: "img/mcp-framework-social-card.jpg",
    navbar: {
      title: "MCP Framework",
      logo: {
        alt: "MCP Framework Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://github.com/QuantGeekDev/mcp-framework",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/docs/introduction",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub Discussions",
              href: "https://github.com/QuantGeekDev/mcp-framework/discussions",
            },
            {
              label: "Discord",
              href: "https://discord.gg/kqjRdn3T",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/QuantGeekDev/mcp-framework",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Alex Andru <alex@andru.codes>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["typescript"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
