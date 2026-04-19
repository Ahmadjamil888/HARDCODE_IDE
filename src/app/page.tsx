'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Sparkles, Terminal, Shield, Zap, Globe, Code, ChevronRight, BookOpen } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/10 selection:text-white overflow-x-hidden">
      {/* Structural Grid */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none app-grid"></div>
      
      {/* TOP NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-14 border-b border-white/5 bg-black/90 backdrop-blur-xl flex items-center justify-between px-8">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 text-[13px] font-bold tracking-widest text-white">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
            HARDCODE_AI
          </div>
          <div className="hidden lg:flex items-center gap-1 text-white/40">
            {['Inference Engine', 'Hardware Labs', 'Registry', 'Docs'].map(item => (
              <span key={item} className="text-[13px] px-3 py-1.5 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-all">{item}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-[13px] text-white/40 hover:text-white px-3 transition-colors">Sign in</Link>
          <button className="bg-white text-black text-[13px] font-medium px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity">
            Initialize Terminal
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-24">
        {/* HERO */}
        <section className="text-center py-20 border-b border-white/5 mx-auto max-w-7xl">
          <div className="text-[11px] font-mono text-white/30 tracking-[.12em] uppercase mb-5">HardCode AI // v24.13.0</div>
          <h1 className="text-5xl md:text-[64px] font-medium leading-[1.1] tracking-[-.03em] max-w-[800px] mx-auto mb-6">
            Turn silicon ideas <br/> into <em className="text-white non-italic font-bold underline decoration-white/20 underline-offset-8">firmware</em>
          </h1>
          <p className="text-lg text-white/40 font-light max-w-[500px] mx-auto mb-10 leading-relaxed tracking-tight">
            Delegate implementation to focus on higher-level direction.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg text-[14px] font-bold hover:opacity-90 transition-opacity">
            Start Synthesis <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </section>

        {/* IDE PREVIEW */}
        <div className="max-w-[1100px] mx-auto px-6 py-14 border-b border-white/5">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden noir-shadow noir-glow">
            <div className="h-9 bg-[#111] border-b border-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-4 font-mono text-[11px] text-white/20">HardCode AI — hardware_bridge.cc</span>
            </div>
            <div className="grid grid-cols-[200px_1fr_280px] min-h-[420px]">
              {/* Sidebar */}
              <div className="border-r border-white/5 py-4 bg-[#0a0a0a]">
                <div className="px-4 py-2 text-[10px] text-white/20 font-mono tracking-widest mb-2">EXPLORER</div>
                {['hardware_bridge.cc', 'register_map.h', 'hil_bridge.h', 'silicon.h'].map((f, i) => (
                  <div key={f} className={`px-4 py-1.5 font-mono text-[11px] flex items-center gap-2 transition-colors cursor-pointer ${i === 0 ? 'bg-white/5 text-white' : 'text-white/30 hover:text-white/60'}`}>
                    <Code className="w-3.5 h-3.5 opacity-50" />
                    {f}
                  </div>
                ))}
              </div>
              {/* Editor */}
              <div className="bg-black p-6 font-mono text-[12px] leading-relaxed text-white/80 overflow-hidden">
                <div className="flex gap-4">
                  <span className="text-white/20 select-none w-4 text-right">1</span>
                  <span><span className="text-white/40 italic">// HardCode AI — hardware_bridge.cc</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-white/20 select-none w-4 text-right">2</span>
                  <span><span className="text-white/40 italic">// Neural synthesis layer v24.13.0</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-white/20 select-none w-4 text-right">3</span>
                  <span />
                </div>
                <div className="flex gap-4">
                  <span className="text-white/20 select-none w-4 text-right">4</span>
                  <span><span className="text-purple-400">#include</span> <span className="text-white">&lt;hardcode/silicon.h&gt;</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-white/20 select-none w-4 text-right">5</span>
                  <span><span className="text-purple-400">#include</span> <span className="text-white">&lt;hardcode/hil_bridge.h&gt;</span></span>
                </div>
                <div className="flex gap-4 hover:bg-white/5 rounded-sm transition-colors">
                  <span className="text-white/20 select-none w-4 text-right">6</span>
                  <span><span className="text-blue-400 italic">SiliconBridge::init</span>() &#123; <span className="w-2 h-4 bg-white inline-block align-middle animate-blink" /> &#125;</span>
                </div>
              </div>
              {/* AI Panel */}
              <div className="border-l border-white/5 p-4 space-y-4 bg-black/40">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">Inference Layer</div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-md space-y-2">
                   <div className="text-[9px] font-mono text-white tracking-widest uppercase">HARDCODE AI</div>
                   <p className="text-[11px] text-white/60 leading-relaxed font-sans">
                     I've analyzed your MCU target's register map. Buffer bounds validated for <code className="text-white">write_flash()</code>.
                   </p>
                </div>
                <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-md space-y-2">
                   <div className="text-[9px] font-mono text-blue-400 tracking-widest uppercase">SYDNEY_CORE</div>
                   <p className="text-[11px] text-white/60 leading-relaxed">
                     Hardware JTAG port detected. Syncing HIL bridge...
                   </p>
                </div>
              </div>
            </div>
            <div className="h-7 bg-[#111] border-t border-white/5 flex items-center px-4 gap-6">
               <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Neural Layer Synched
               </div>
               <div className="text-[10px] font-mono text-white/20">Gemini_1.5_Pro</div>
            </div>
          </div>
        </div>

        {/* EVERYWHERE SECTION */}
        <section className="max-w-[1100px] mx-auto py-24 px-6 grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5 mb-32">
          {[
            { title: "Desktop", desc: "Advanced silicon coding in your dev environment.", code: "$ hardcode flash --stm32" },
            { title: "CLI", desc: "Synthesis in any terminal, anywhere.", code: "hc synth --mcu h743" },
            { title: "Editors", desc: "Extensions for VSCode, CLion, and Neovim.", code: "● VS Code Extension" },
            { title: "Silicon+", desc: "Unlimited synthesis calls for scale.", code: "Synthesis: Unlimited" }
          ].map((card, i) => (
            <div key={i} className="bg-black p-8 space-y-6 hover:bg-white/[0.02] transition-colors group">
              <h3 className="text-sm font-bold tracking-tight text-white/90 group-hover:text-white">{card.title}</h3>
              <p className="text-[12px] text-white/30 font-light leading-relaxed">{card.desc}</p>
              <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-md font-mono text-[10px] text-white/60">
                 {card.code}
              </div>
            </div>
          ))}
        </section>

        {/* FINAL CTA */}
        <section className="py-40 text-center space-y-12">
           <h2 className="text-6xl md:text-[80px] font-medium tracking-[-.04em] leading-tight">
             Try <em className="text-white non-italic font-bold underline decoration-white/20 underline-offset-[12px]">HardCode AI</em> now.
           </h2>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="bg-white text-black px-12 py-4 rounded-lg text-sm font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Start Synthesis — Free
              </button>
              <button className="border border-white/10 text-white/40 px-10 py-4 rounded-lg text-sm font-bold hover:text-white hover:bg-white/5 transition-all">
                Registry Docs
              </button>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="max-w-[1100px] mx-auto py-20 px-6 border-t border-white/5 text-white/20">
          <div className="flex flex-col md:flex-row justify-between mb-16 gap-12">
            <div className="space-y-2">
              <div className="text-sm font-bold text-white tracking-widest uppercase">HARDCODE_AI</div>
              <div className="text-[11px] tracking-tight uppercase">Hardware Intelligence Layer © 2026</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-[11px] font-bold uppercase tracking-widest">
               {['Product', 'Labs', 'Docs', 'Company'].map(col => (
                 <div key={col} className="space-y-4">
                    <div className="text-white/60 mb-6">{col}</div>
                    <div className="flex flex-col gap-3">
                       <span className="hover:text-white cursor-pointer transition-colors">Link</span>
                       <span className="hover:text-white cursor-pointer transition-colors">Link</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-mono tracking-widest text-white/10">
              <span>System Integrity Verified // All Nodes Nominal</span>
              <div className="flex gap-8">
                 <span className="hover:text-white/40 cursor-pointer">Privacy</span>
                 <span className="hover:text-white/40 cursor-pointer">Terms</span>
              </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
