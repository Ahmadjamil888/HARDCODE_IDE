'use client';

import * as React from 'react';
import { useDeviceStore } from '@/stores/deviceStore';
import { ChevronDown, Cpu, Usb } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DeviceSelector() {
  const { connectedDevices, activeDevice, setActiveDevice } = useDeviceStore();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-all text-xs font-medium min-w-[160px]"
      >
        <Usb className={cn("w-3.5 h-3.5", activeDevice ? "text-[#58a6ff]" : "text-[#7d8590]")} />
        <span className="flex-1 text-left truncate">
          {activeDevice ? activeDevice.name : 'Select Device'}
        </span>
        <ChevronDown className="w-3 h-3 text-[#7d8590]" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-1">
          {connectedDevices.length === 0 ? (
            <div className="px-4 py-3 text-[10px] text-[#7d8590] italic">No devices found.</div>
          ) : (
            connectedDevices.map((device) => (
              <button
                key={device.portPath}
                onClick={() => {
                  setActiveDevice(device);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-2 flex items-center gap-2 text-left text-xs hover:bg-[#1c2128] transition-colors",
                  activeDevice?.portPath === device.portPath ? "bg-[#1c2128] text-[#58a6ff]" : "text-[#e6edf3]"
                )}
              >
                <Cpu className="w-3 h-3" />
                <div className="flex flex-col">
                  <span>{device.name}</span>
                  <span className="text-[9px] text-[#7d8590]">{device.portPath}</span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
