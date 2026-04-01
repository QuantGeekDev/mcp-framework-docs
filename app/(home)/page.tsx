import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      style={{
        fontFamily: 'Tahoma, Arial, "MS Sans Serif", sans-serif',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '8px',
        minHeight: '100%',
      }}
    >
      {/* Window title bar */}
      <div
        style={{
          background: 'linear-gradient(to right, #0A246A 0%, #A6CAF0 100%)',
          color: '#FFFFFF',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none',
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
          MCP Framework — Welcome
        </span>
        <div style={{ display: 'flex', gap: '2px' }}>
          {['_', '□', '×'].map((icon) => (
            <button
              key={icon}
              style={{
                background: '#D4D0C8',
                border: '2px solid',
                borderColor: '#FFFFFF #404040 #404040 #FFFFFF',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                cursor: 'default',
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontWeight: 'bold',
                padding: 0,
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Main content panel */}
      <div
        style={{
          background: '#ECE9D8',
          border: '2px solid',
          borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
          padding: '16px',
          boxShadow: '2px 2px 0 #404040',
        }}
      >
        {/* Hero section */}
        <div style={{ textAlign: 'center', padding: '24px 0 16px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px',
            }}
          >
            {/* Classic Windows app icon placeholder */}
            <div
              style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #316AC5, #0A246A)',
                border: '2px solid',
                borderColor: '#FFFFFF #404040 #404040 #FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}
            >
              M
            </div>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#0A246A',
                margin: 0,
                fontFamily: 'Tahoma, Arial, sans-serif',
                background: 'none',
                padding: 0,
                border: 'none',
              }}
            >
              MCP Framework
            </h1>
          </div>
          <p
            style={{
              fontSize: '13px',
              color: '#000000',
              fontFamily: 'Tahoma, Arial, sans-serif',
              margin: '0 0 16px',
            }}
          >
            Build Model Context Protocol Servers in TypeScript
          </p>

          {/* Toolbar-style action buttons */}
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Win2kButton href="/docs/introduction" primary>
              ▶ Get Started
            </Win2kButton>
            <Win2kButton href="/docs/quickstart">
              📋 Quickstart
            </Win2kButton>
            <Win2kButton href="https://github.com/QuantGeekDev/mcp-framework">
              💾 GitHub
            </Win2kButton>
          </div>
        </div>

        {/* Horizontal separator */}
        <div
          style={{
            borderTop: '1px solid #808080',
            borderBottom: '1px solid #FFFFFF',
            margin: '8px 0',
          }}
        />

        {/* Feature panels — classic "group boxes" */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '8px',
          }}
        >
          <GroupBox title="⚡ Lightning Fast Setup">
            Get your MCP server running in minutes with automatic directory-based
            discovery and zero configuration required.
          </GroupBox>
          <GroupBox title="🔧 Powerful Tools">
            Build type-safe tools with Zod schema validation, automatic JSON schema
            generation, and full TypeScript support.
          </GroupBox>
          <GroupBox title="🔍 Auto-Discovery">
            Tools, resources, and prompts are automatically discovered from your
            project structure — no manual registration needed.
          </GroupBox>
        </div>

        {/* Status bar */}
        <div
          style={{
            display: 'flex',
            marginTop: '16px',
            borderTop: '2px solid',
            borderColor: '#808080 #FFFFFF #FFFFFF #808080',
            paddingTop: '3px',
            gap: '2px',
          }}
        >
          <StatusBarCell>MCP Framework v1.0</StatusBarCell>
          <StatusBarCell>TypeScript</StatusBarCell>
          <StatusBarCell>Node.js 18+</StatusBarCell>
        </div>
      </div>
    </main>
  );
}

function Win2kButton({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: primary ? '#316AC5' : '#D4D0C8',
        color: primary ? '#FFFFFF' : '#000000',
        border: '2px solid',
        borderColor: primary
          ? '#6CA0DC #0A246A #0A246A #6CA0DC'
          : '#FFFFFF #404040 #404040 #FFFFFF',
        padding: '4px 14px',
        fontSize: '11px',
        fontFamily: 'Tahoma, Arial, sans-serif',
        textDecoration: 'none',
        fontWeight: primary ? 'bold' : 'normal',
        cursor: 'default',
        minWidth: '80px',
        justifyContent: 'center',
      }}
    >
      {children}
    </Link>
  );
}

function GroupBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset
      style={{
        border: '2px solid',
        borderColor: '#808080 #FFFFFF #FFFFFF #808080',
        padding: '8px 10px',
        background: '#D4D0C8',
        margin: 0,
      }}
    >
      <legend
        style={{
          fontSize: '11px',
          fontWeight: 'bold',
          fontFamily: 'Tahoma, Arial, sans-serif',
          color: '#000000',
          padding: '0 4px',
        }}
      >
        {title}
      </legend>
      <p
        style={{
          fontSize: '11px',
          fontFamily: 'Tahoma, Arial, sans-serif',
          color: '#000000',
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {children}
      </p>
    </fieldset>
  );
}

function StatusBarCell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        border: '1px solid',
        borderColor: '#808080 #FFFFFF #FFFFFF #808080',
        padding: '1px 8px',
        fontSize: '10px',
        fontFamily: 'Tahoma, Arial, sans-serif',
        color: '#000000',
        flex: 1,
        maxWidth: '140px',
      }}
    >
      {children}
    </div>
  );
}
