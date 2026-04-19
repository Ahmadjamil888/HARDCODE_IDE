'use client';

import * as React from 'react';
import { useDeviceStore } from '@/stores/deviceStore';
import { Cpu, Usb, Activity, Zap, HardDrive, Layers, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DeviceInspector() {
  const { activeDevice, connectionStatus, bridgeOnline } = useDeviceStore();

  if (!bridgeOnline) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-[#0d1117]">
        <Activity className="w-12 h-12 text-[#f85149] mb-4 animate-pulse" />
        <h3 className="text-lg font-medium text-[#e6edf3]">Bridge Offline</h3>
        <p className="text-sm text-[#7d8590] mt-2">
          The device bridge is not running. Start it with `npm run bridge` to connect to hardware.
        </p>
      </div>
    );
  }

  if (!activeDevice) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-[#0d1117]">
        <Usb className="w-12 h-12 text-[#7d8590] mb-4" />
        <h3 className="text-lg font-medium text-[#e6edf3]">No Device Connected</h3>
        <p className="text-sm text-[#7d8590] mt-2">
          Connect a device via USB to see its details and flash firmware.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#0d1117] text-[#e6edf3]">
      <div className="p-4 border-b border-[#30363d]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#1c2128] rounded-lg border border-[#30363d]">
            <Cpu className="w-6 h-6 text-[#58a6ff]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{activeDevice.name}</h3>
            <p className="text-xs text-[#7d8590]">{activeDevice.portPath}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <section>
          <h4 className="text-[10px] uppercase font-bold text-[#7d8590] tracking-wider mb-3">System Specs</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#161b22] p-3 rounded border border-[#30363d]">
              <p className="text-[10px] text-[#7d8590]">CHIP</p>
              <p className="text-xs font-mono">{activeDevice.chipId || 'N/A'}</p>
            </div>
            <div className="bg-[#161b22] p-3 rounded border border-[#30363d]">
              <p className="text-[10px] text-[#7d8590]">TYPE</p>
              <p className="text-xs font-mono">{activeDevice.deviceType}</p>
            </div>
          </div>
        </section>

        <div className="space-y-6 pt-6">
          {/* Memory Usage Section */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold text-[#7d8590]">
              <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> FLASH MEMORY</span>
              <span>{Math.round((activeDevice?.memoryUsage?.flash?.used || 0) / 1024)}KB / {activeDevice?.flashMemoryKB || 32}KB</span>
            </div>
            <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-[#30363d]">
              <div 
                className="h-full bg-[#58a6ff] transition-all duration-500" 
                style={{ width: `${((activeDevice?.memoryUsage?.flash?.used || 0) / ((activeDevice?.flashMemoryKB || 32) * 1024)) * 100}%` }} 
              />
            </div>

            <div className="flex justify-between text-xs font-bold text-[#7d8590] mt-4">
              <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> RAM</span>
              <span>{Math.round((activeDevice?.memoryUsage?.ram?.used || 0) / 1024)}KB / {activeDevice?.ramKB || 2}KB</span>
            </div>
            <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-[#30363d]">
              <div 
                className="h-full bg-[#3fb950] transition-all duration-500" 
                style={{ width: `${((activeDevice?.memoryUsage?.ram?.used || 0) / ((activeDevice?.ramKB || 2) * 1024)) * 100}%` }} 
              />
            </div>
          </div>

          <div className="h-px bg-[#30363d]" />

          {/* Pin Diagram Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#7d8590] uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Pin Configuration
              </span>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-[#3fb950]" />
                  <span className="text-[9px] text-[#7d8590]">OUT</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-[#58a6ff]" />
                  <span className="text-[9px] text-[#7d8590]">IN</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: activeDevice?.pinCount || 20 }).map((_, i) => (
                <div 
                  key={i}
                  className="group relative flex flex-col items-center justify-center h-10 border border-[#30363d] rounded bg-black hover:border-[#58a6ff] transition-all"
                >
                  <span className="text-[9px] text-[#7d8590] font-mono">D{i}</span>
                  <div className={cn(
                    "w-3 h-1 mt-1 rounded-sm",
                    i % 4 === 0 ? "bg-[#3fb950]" : i % 7 === 0 ? "bg-[#58a6ff]" : "bg-[#30363d]"
                  )} />
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:block z-50">
                    <div className="bg-[#1c2128] border border-[#30363d] rounded px-2 py-1 text-[10px] whitespace-nowrap shadow-xl">
                      Pin {i}: {i % 4 === 0 ? 'Digital Output' : i % 7 === 0 ? 'Digital Input' : 'Unused'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[#30363d]">
        <button className="w-full py-2 bg-[#238636] hover:bg-[#2ea043] rounded text-sm font-semibold transition-colors flex items-center justify-center gap-2">
          <Zap className="w-4 h-4" />
          Flash Firmware
        </button>
      </div>
    </div>
  );
}
