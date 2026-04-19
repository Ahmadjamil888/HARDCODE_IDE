import * as React from 'react';
import Link from 'next/link';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = [
    {
      title: 'Introduction',
      links: [
        { label: 'Overview', href: '/docs' },
        { label: 'Architecture', href: '/docs/architecture' },
      ],
    },
    {
      title: 'Getting Started',
      links: [
        { label: 'Quickstart', href: '/docs/quickstart' },
        { label: 'Device Registry', href: '/docs/device-registry' },
      ],
    },
    {
      title: 'AI Synthesis',
      links: [
        { label: 'Neural Link', href: '/docs/neural-link' },
        { label: 'Context Injection', href: '/docs/context' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      {/* Header */}
      <nav className="h-16 px-8 border-b border-white/5 flex items-center justify-between sticky top-0 z-50 bg-black/50 backdrop-blur-xl">
        <Link href="/" className="font-medium text-[13px] tracking-tight flex items-center gap-3">
          <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>
          HARDCODE AI // DOCS
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-[11px] font-medium text-white/40 hover:text-white transition-colors">DASHBOARD</Link>
          <Link href="/login" className="noir-button rounded-sm py-1.5 px-4">SIGN_IN</Link>
        </div>
      </nav>

      <div className="flex-1 flex max-w-[1400px] mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 py-12 px-8 overflow-y-auto hidden md:block">
          <div className="space-y-10">
            {categories.map((cat, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{cat.title}</h3>
                <div className="flex flex-col gap-2">
                  {cat.links.map((link, j) => (
                    <Link 
                      key={j} 
                      href={link.href}
                      className="text-[13px] text-white/50 hover:text-white transition-colors py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 py-12 px-8 md:px-20 max-w-4xl">
          {children}
        </main>
      </div>
    </div>
  );
}
