'use client';

import * as React from 'react';
import { useDeviceStore } from '@/stores/deviceStore';
import { Cpu, Wifi, WifiOff, Terminal, Bluetooth, Zap, ChevronRight, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DeviceStatusBar() {
  const { activeDevice, connectionStatus, bridgeOnline } = useDeviceStore();

  return (
    <div className="h-7 bg-[#050505] text-white/50 flex items-center justify-between px-4 z-50 overflow-hidden font-sans border-t border-white/[0.05]">
      <div className="flex items-center gap-6 h-full">
        {/* Branch / Protocol State */}
        <div className="flex items-center gap-2 h-full group cursor-pointer hover:bg-white/5 px-2 transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4287f5] shadow-[0_0_8px_#4287f5]" />
          <span className="text-[10px] tracking-tight font-medium text-white/70">main</span>
        </div>

        <div className="flex items-center gap-2 h-full opacity-60">
           <span className="text-[10px] tracking-tight truncate max-w-[150px]">
             {activeDevice ? activeDevice.name : 'No device detected'}
           </span>
        </div>

        {activeDevice && (
          <div className="flex items-center gap-2 h-full text-[#4287f5] text-[10px] font-mono">
            <span>{activeDevice.portPath}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-5 h-full">
        <div className="flex items-center gap-4 text-[10px] font-medium tracking-tight">
          <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 cursor-pointer">
            <Zap className="w-3 h-3" />
            <span>4ms</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 cursor-pointer">
            <Terminal className="w-3 h-3" />
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 cursor-pointer">
             <Share2 className="w-3 h-3" />
             <span>Sync</span>
          </div>
        </div>

        <div className="h-full bg-white/5 px-3 flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-all border-l border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-tight text-white/80">READY</span>
        </div>
      </div>
    </div>
  );
}
