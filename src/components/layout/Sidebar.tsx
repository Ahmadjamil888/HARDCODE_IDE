'use client';

import * as React from 'react';
import { Files, Cpu, ShieldCheck, Settings, BookOpen, Terminal, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: any) => void;
}

const ITEMS = [
  { id: 'files', icon: Files, label: 'FILES' },
  { id: 'device', icon: Cpu, label: 'HARDWARE' },
  { id: 'test', icon: ShieldCheck, label: 'DEBUG' },
  { id: 'settings', icon: Settings, label: 'CONFIG' },
];

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <div className="w-[50px] h-full bg-[#050505] border-r border-white/[0.05] flex flex-col items-center py-4 z-50">
      {/* Platform Logo */}
      <div className="mb-8">
        <Link href="/" className="w-8 h-8 flex items-center justify-center transition-all hover:scale-110">
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
        </Link>
      </div>

      <div className="flex-1 space-y-5">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "group relative flex items-center justify-center w-12 h-10 transition-colors",
              activeView === item.id 
                ? "text-white" 
                : "text-white/30 hover:text-white/60"
            )}
          >
            <item.icon className={cn(
              "w-[18px] h-[18px]",
              activeView === item.id ? "opacity-100" : "opacity-60"
            )} />
            
            {/* Minimal Cursor Indicator */}
            {activeView === item.id && (
              <div className="absolute left-0 w-[1.5px] h-5 bg-white shadow-[0_0_6px_white]" />
            )}

            {/* Tooltip Overlay */}
            <div className="absolute left-14 px-2.5 py-1.5 bg-black border border-white/10 text-[9px] tracking-widest text-white/80 uppercase opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-[100] transition-all">
              {item.label}
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-6 pb-4 opacity-50">
         <Link href="/docs" className="text-white hover:text-white transition-all">
           <BookOpen className="w-[18px] h-[18px]" />
         </Link>
         <div className="text-white hover:text-white cursor-not-allowed">
           <Command className="w-[18px] h-[18px]" />
         </div>
      </div>
    </div>
  );
}
