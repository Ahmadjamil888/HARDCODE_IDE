import * as React from 'react';
import { Sparkles, Terminal, Cpu, Zap } from 'lucide-react';

export default function DocsOverviewPage() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-6">
        <h1 className="text-5xl font-medium tracking-tight">Overview</h1>
        <p className="text-xl text-white/40 leading-relaxed font-light font-sans">
          HardCode AI is the neural layer for hardware engineering. We provide a professional-grade development environment that bridges high-level firmware synthesis with physical silicon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
             icon: Sparkles,
             title: "Neural Engine",
             desc: "Gemini 1.5 Pro powered reasoning across your entire project context and device datasheets."
          },
          {
             icon: CentralCpu,
             title: "Silicon Aware",
             desc: "Native understanding of ARM, ESP32, and RISC-V architectures with precise register mapping."
          }
        ].map((item, i) => (
          <div key={i} className="p-8 border border-white/5 bg-white/[0.02] space-y-4 hover:border-white/10 transition-all group">
             <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-black group-hover:bg-white group-hover:text-black transition-all">
                <item.icon className="w-4 h-4" />
             </div>
             <h3 className="text-lg font-medium">{item.title}</h3>
             <p className="text-[13px] text-white/30 leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-10 border-t border-white/5 pt-16">
        <h2 className="text-3xl font-medium tracking-tight">Core Architecture</h2>
        <div className="space-y-8">
           <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                 In-Context Synthesis
              </h3>
              <p className="text-[14px] text-white/40 leading-relaxed max-w-2xl">
                Unlike generic LLMs, HardCode AI processes your local project structure, connected hardware states, and historical trace data to generate code that is physically correct and optimized for your specific MCU.
              </p>
           </div>
           
           <div className="bg-[#0a0a0a] border border-white/5 p-6 font-mono text-[13px] text-white/60 leading-relaxed">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5 text-[11px] uppercase tracking-widest">
                 <Terminal className="w-3.5 h-3.5" />
                 Inference_Log // project_init.v
              </div>
              <div>&gt; Scanning device registry...</div>
              <div className="text-green-500/80">&gt; Found ESP32-S3-WROOM-1 (Rev 0)</div>
              <div>&gt; Injecting register maps for SPI_FLASH_CTRL...</div>
              <div className="text-[#4287f5] animate-pulse">&gt; Neural Layer Ready: Synthesizing DMA protocol...</div>
           </div>
        </div>
      </div>
    </div>
  );
}

function CentralCpu(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  );
}
