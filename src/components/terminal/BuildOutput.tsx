'use client';

import * as React from 'react';
import { useTerminalStore } from '@/stores/terminalStore';
import { Trash2, Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function BuildOutput() {
  const { buildOutput, clearBuildOutput } = useTerminalStore();
  const terminalRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-full bg-black font-sans">
      <div className="h-9 px-4 border-b border-white/[0.05] flex items-center justify-between bg-black">
        <div className="flex items-center gap-3">
          <ChevronRight className="w-3.5 h-3.5 text-white/20" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
            Compiler Output
          </span>
        </div>
        <button 
          onClick={clearBuildOutput}
          className="p-1.5 hover:bg-white/5 rounded transition-colors text-white/20 hover:text-white/60"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex-1 bg-black p-4 overflow-y-auto font-mono text-[11px] leading-relaxed">
        {buildOutput.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-10">
             <TerminalIcon className="w-8 h-8" />
             <span className="text-[10px] tracking-widest uppercase">No build logs found</span>
          </div>
        ) : (
          <div className="space-y-1">
            {buildOutput.map((line, i) => {
              let colorClass = "text-white/60";
              if (line.includes('[ERROR]')) colorClass = "text-red-500/80 font-medium";
              else if (line.includes('[SUCCESS]')) colorClass = "text-green-500/80 font-medium";
              else if (line.includes('[WARN]')) colorClass = "text-yellow-500/80";
              else if (line.includes('[INFO]')) colorClass = "text-[#4287f5]/80";

              return (
                <div key={i} className={cn("flex gap-4", colorClass)}>
                  <span className="w-4 select-none opacity-20 text-right">{i + 1}</span>
                  <span className="flex-1 whitespace-pre-wrap">{line}</span>
                </div>
              );
            })}
            <div className="h-px w-full bg-white/[0.02] mt-4" />
          </div>
        )}
      </div>
    </div>
  );
}
