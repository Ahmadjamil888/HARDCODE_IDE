'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Sparkles, Terminal, Shield, Zap, Globe, Code, ChevronRight, BookOpen, Activity, Layers, PenTool } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#CCFF00] selection:text-black overflow-x-hidden relative">
      {/* Technical Overlays */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none blueprint-grid"></div>
      <div className="fixed inset-0 z-10 noise-overlay pointer-events-none"></div>
      <div className="scanline"></div>
      
      {/* TOP NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-16 border-b border-white/5 bg-[#080808]/80 backdrop-blur-xl flex items-center justify-between px-8">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
             <div className="w-5 h-5 border border-[#CCFF00] flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#CCFF00]" />
             </div>
             <span className="text-[14px] font-bold tracking-[0.2em] text-white">HARDCODE_AI</span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            {['Engine', 'Labs', 'Registry', 'Specs'].map(item => (
              <span key={item} className="text-[11px] font-mono tracking-widest px-4 py-1.5 text-white/40 hover:text-[#CCFF00] hover:bg-[#CCFF00]/5 cursor-pointer transition-all uppercase">{item}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[11px] font-mono tracking-widest text-white/40 hover:text-white uppercase transition-colors">Auth_init</Link>
          <button className="hc-button flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>Connect_Node</span>
          </button>
        </div>
      </nav>

      <main className="relative z-20 pt-32 pb-40">
        {/* HERO */}
        <section className="container mx-auto px-6 text-center max-w-5xl relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 border border-[#CCFF00]/20 bg-[#CCFF00]/5 text-[#CCFF00] text-[10px] font-mono tracking-[0.2em] uppercase mb-8"
          >
            <Activity className="w-3 h-3" />
            System Status: Nominal // Neural Bridge v24.13.0
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-[90px] font-bold leading-[0.95] tracking-[-0.04em] mb-8"
          >
            Shed the <br/> 
            <span className="text-[#CCFF00]">Abstract.</span> <br/>
            Write the <span className="relative">
              Silicon.
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#CCFF00]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 0 L100 0 L90 10 L10 10 Z" fill="currentColor" />
              </svg>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            The worlds first high-fidelity AI IDE built specifically for hardware engineers. 
            From RTL to firmware, bridge the gap with neural synthesis.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="hc-button text-sm px-10 py-4">
              Initialize Synthesis <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button className="hc-button-ghost text-sm px-10 py-4">
              View Labs
            </button>
          </motion.div>
        </section>

        {/* IDE PREVIEW */}
        <section className="mt-32 max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-[#0C0C0C] border border-white/10 relative shadow-2xl"
          >
            {/* Window Decor */}
            <div className="absolute -top-px -left-px w-2 h-2 bg-[#CCFF00]" />
            <div className="absolute -top-px -right-px w-2 h-2 bg-[#CCFF00]" />
            <div className="absolute -bottom-px -left-px w-2 h-2 bg-[#CCFF00]" />
            <div className="absolute -bottom-px -right-px w-2 h-2 bg-[#CCFF00]" />
            
            <div className="h-10 bg-[#121212] border-b border-white/10 flex items-center justify-between px-4">
              <div className="flex items-center gap-6">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-white/10" />
                  <div className="w-2.5 h-2.5 bg-white/10" />
                  <div className="w-2.5 h-2.5 bg-white/10" />
                </div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-2">
                   <PenTool className="w-3 h-3" />
                   HardCode_UI // hardware_bridge.cc
                </div>
              </div>
              <div className="text-[9px] font-mono text-[#CCFF00] animate-pulse">● LIVE_BRIDGE_ENABLED</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_300px] min-h-[500px]">
              {/* Explorer */}
              <div className="border-r border-white/5 p-6 bg-[#080808]/50 overflow-hidden hidden md:block">
                <div className="technical-label mb-6">File_System</div>
                <div className="space-y-3">
                  {['bridge.cc', 'io_map.h', 'silicon_v4.ld', 'thermal.spec'].map((f, i) => (
                    <div key={f} className={`flex items-center gap-3 text-[11px] font-mono ${i === 0 ? 'text-[#CCFF00]' : 'text-white/30'}`}>
                      <div className={`w-1 h-3 ${i === 0 ? 'bg-[#CCFF00]' : 'bg-white/5'}`} />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="mt-20">
                   <div className="technical-label mb-4">Device_Stats</div>
                   <div className="h-20 border border-white/5 bg-black p-2 flex items-end gap-1">
                      {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-[#CCFF00]/20" style={{ height: `${h}%` }} />
                      ))}
                   </div>
                </div>
              </div>

              {/* Editor */}
              <div className="p-8 font-mono text-[13px] leading-relaxed relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[40px] font-bold text-white/[0.02] pointer-events-none">CODE_GATE</div>
                <div className="space-y-1">
                  <div className="flex gap-6"><span className="text-white/10 w-4 text-right">01</span><span className="text-white/40 italic">// Hardware Bridge Implementation</span></div>
                  <div className="flex gap-6"><span className="text-white/10 w-4 text-right">02</span><span className="text-[#F63509]">#include</span> <span className="text-[#00E0FF]">&lt;hc/silicon.h&gt;</span></div>
                  <div className="flex gap-6"><span className="text-white/10 w-4 text-right">03</span><span>&nbsp;</span></div>
                  <div className="flex gap-6"><span className="text-white/10 w-4 text-right">04</span><span><span className="text-[#CCFF00]">void</span> <span className="text-white font-bold">Bridge::Initialize</span>() &#123;</span></div>
                  <div className="flex gap-6"><span className="text-white/10 w-4 text-right">05</span><span className="pl-4 text-white/70">Silicon::Lock(BRIDGE_PIN_MASK);</span></div>
                  <div className="flex gap-6 bg-[#CCFF00]/5 border-y border-[#CCFF00]/10 py-1">
                    <span className="text-[#CCFF00] w-4 text-right">06</span>
                    <span className="pl-4">UART::Write(<span className="text-[#00E0FF]">"SYSTEM_BOOT_INIT"</span>); <span className="w-1.5 h-4 bg-[#CCFF00] inline-block align-middle ml-1" /></span>
                  </div>
                  <div className="flex gap-6"><span className="text-white/10 w-4 text-right">07</span><span>&#125;</span></div>
                </div>
              </div>

              {/* AI Layer */}
              <div className="border-l border-white/5 bg-[#0C0C0C] p-6 space-y-6">
                <div className="technical-label">Neural_Inference</div>
                <div className="p-4 border border-[#CCFF00]/20 bg-[#CCFF00]/5 space-y-3 relative group overflow-hidden">
                   <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
                      <Zap className="w-20 h-20 text-[#CCFF00]" />
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#CCFF00]" />
                      <span className="text-[10px] font-mono font-bold text-[#CCFF00] tracking-widest uppercase">Analysis_Found</span>
                   </div>
                   <p className="text-[12px] text-white/70 leading-relaxed font-sans">
                     I've detected a timing race condition in <code className="text-white">Bridge::Initialize</code>. 
                     Recommend adding a 10ms wait-state for stable PLL lock.
                   </p>
                   <button className="text-[10px] font-mono text-[#CCFF00] underline mt-2 hover:text-white transition-colors uppercase tracking-widest">
                      Apply_Patch [10ms]
                   </button>
                </div>
                
                <div className="space-y-4 pt-10">
                   <div className="technical-label">Memory_Footprint</div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono">
                         <span className="text-white/40">SRAM_1</span>
                         <span className="text-white">82%</span>
                      </div>
                      <div className="h-1 bg-white/5">
                         <div className="h-full bg-[#CCFF00] w-[82%]" />
                      </div>
                   </div>
                </div>
              </div>
            </div>

            <div className="h-8 bg-[#121212] border-t border-white/10 flex items-center justify-between px-6">
               <div className="flex items-center gap-6">
                  <div className="text-[9px] font-mono text-white/30 tracking-widest uppercase">Line 06, Col 42</div>
                  <div className="text-[9px] font-mono text-white/30 tracking-widest uppercase italic">Target: STM32H743XI</div>
               </div>
               <div className="flex items-center gap-4 text-[9px] font-mono text-white/30">
                  <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" /> SYNC://OK</span>
                  <span>v24.13.0-STABLE</span>
               </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURES GRID */}
        <section className="mt-40 container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-4 border border-white/5 bg-white/[0.02]">
              {[
                { title: 'RTL_SYNTH', desc: 'Convert natural language specs into production-grade Verilog and VHDL.', icon: Layers },
                { title: 'FIRMWARE_GEN', desc: 'Neural synthesis of low-level C/C++ driver code with safety validation.', icon: Cpu },
                { title: 'HIL_BRIDGE', desc: 'Live interaction with connected hardware via serial and JTAG.', icon: Zap },
                { title: 'SECURE_LABS', desc: 'End-to-end encrypted development environment with global registry.', icon: Shield },
              ].map((f, i) => (
                <div key={i} className="p-10 border-r border-white/5 last:border-0 hover:bg-[#CCFF00]/5 transition-all group relative">
                   <div className="absolute top-4 right-4 text-[10px] font-mono text-white/10 tracking-widest uppercase">MOD_0{i+1}</div>
                   <f.icon className="w-8 h-8 text-[#CCFF00] mb-8 group-hover:scale-110 transition-transform" />
                   <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-4 text-white/90">{f.title}</h3>
                   <p className="text-[13px] text-white/40 leading-relaxed font-light">{f.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-60 text-center relative overflow-hidden py-40">
           <div className="absolute inset-0 z-0 bg-[#CCFF00]/5 flex items-center justify-center opacity-20">
              <div className="w-[800px] h-[800px] border border-[#CCFF00]/10 rounded-full animate-pulse" />
              <div className="absolute w-[600px] h-[600px] border border-[#CCFF00]/10 rounded-full" />
           </div>
           
           <div className="relative z-10 space-y-12 max-w-4xl mx-auto px-6">
             <h2 className="text-5xl md:text-[80px] font-bold leading-tight tracking-tight">
               Are you ready to build <br/> the <span className="text-[#CCFF00]">Concrete?</span>
             </h2>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <button className="hc-button text-sm px-16 py-5">
                   Request Early Access // HC_INIT
                </button>
                <button className="hc-button-ghost text-sm px-12 py-5">
                   Technical Documentation
                </button>
             </div>
             <p className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase">
                Limited Nodes Available // Registry Open for Tier-1 Engineers
             </p>
           </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 pt-24 pb-12 bg-black relative z-20">
         <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
               <div className="lg:col-span-2 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-[#CCFF00] flex items-center justify-center p-0.5">
                        <div className="w-full h-full bg-[#CCFF00]" />
                    </div>
                    <span className="text-[16px] font-bold tracking-[0.3em] text-white">HARDCODE_AI</span>
                  </div>
                  <p className="text-white/40 text-[14px] leading-relaxed max-w-md">
                     The neural intelligence layer for 21st century hardware engineering.
                     Production-grade, low-level, and brutally fast.
                  </p>
                  <div className="flex gap-4">
                     {/* Social placeholders */}
                     {[1, 2, 3].map(i => (
                       <div key={i} className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-[#CCFF00] transition-colors cursor-pointer">
                          <div className="w-1.5 h-1.5 bg-white/40 group-hover:bg-[#CCFF00]" />
                       </div>
                     ))}
                  </div>
               </div>
               
               {['ENGINE', 'HARDWARE', 'RESOURCES'].map((cat, i) => (
                 <div key={i} className="space-y-6">
                    <div className="technical-label text-[#CCFF00]">{cat}</div>
                    <ul className="space-y-4">
                       {['Link_01', 'Link_02', 'Link_03', 'Link_04'].map(l => (
                         <li key={l} className="text-[12px] text-white/30 hover:text-white cursor-pointer hover:translate-x-1 transition-all">{l}</li>
                       ))}
                    </ul>
                 </div>
               ))}
            </div>
            
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="text-[10px] font-mono text-white/10 tracking-[0.2em] uppercase">
                  © 2026 HARDCODE INTELLIGENCE SYSTEMS // ALL RIGHTS RESERVED
               </div>
               <div className="flex gap-10 text-[10px] font-mono text-white/20 tracking-widest">
                  <span className="hover:text-[#CCFF00] cursor-pointer">PRIVACY_PROTOCOL</span>
                  <span className="hover:text-[#CCFF00] cursor-pointer">TERMS_OF_ENGAGEMENT</span>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
