'use client';

import * as React from 'react';
import { Files, Cpu, ShieldCheck, Settings, BookOpen, Terminal, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    <div className="w-[56px] h-full bg-[#080808] border-r border-white/[0.08] flex flex-col items-center py-6 z-50 relative">
      <div className="absolute inset-0 z-0 opacity-10 blueprint-grid pointer-events-none" />
      
      {/* Platform Logo */}
      <div className="mb-10 relative z-10">
        <Link href="/" className="w-10 h-10 border border-[#CCFF00]/40 flex items-center justify-center transition-all hover:border-[#CCFF00]">
           <div className="w-2 h-2 bg-[#CCFF00]" />
        </Link>
      </div>

      <div className="flex-1 space-y-6 relative z-10">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "group relative flex items-center justify-center w-10 h-10 transition-all duration-300",
              activeView === item.id 
                ? "text-[#CCFF00]" 
                : "text-white/20 hover:text-white/60"
            )}
          >
            {/* Active Indicator - Glow/Box */}
            {activeView === item.id && (
              <motion.div 
                layoutId="active-nav"
                className="absolute inset-0 border border-[#CCFF00]/30 bg-[#CCFF00]/5 z-[-1]"
              />
            )}

            <item.icon className={cn(
              "w-[18px] h-[18px] transition-transform group-active:scale-95",
              activeView === item.id ? "drop-shadow-[0_0_8px_#CCFF00]" : ""
            )} />
            
            {/* Side Label (Technical) */}
            {activeView === item.id && (
              <div className="absolute -right-2 top-0 bottom-0 w-0.5 bg-[#CCFF00]" />
            )}

            {/* Tooltip Overlay */}
            <div className="absolute left-16 px-3 py-2 bg-[#0C0C0C] border border-[#CCFF00]/20 text-[9px] font-mono tracking-[0.2em] text-[#CCFF00] uppercase opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-[100] transition-all transform -translate-x-2 group-hover:translate-x-0">
               <span className="opacity-40 select-none mr-2">MOD::</span>{item.label}
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-8 pb-4 opacity-40 relative z-10">
         <Link href="/docs" className="text-white hover:text-[#CCFF00] transition-all block">
           <BookOpen className="w-[18px] h-[18px]" />
         </Link>
         <div className="text-white hover:text-[#CCFF00] cursor-not-allowed">
           <Command className="w-[18px] h-[18px]" />
         </div>
      </div>
    </div>
  );
}
