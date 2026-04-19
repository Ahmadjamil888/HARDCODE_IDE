'use client';

import * as React from 'react';
import { useTerminalStore } from '@/stores/terminalStore';
import { useDeviceStore } from '@/stores/deviceStore';
import { useDevice } from '@/hooks/useDevice';
import { Trash2, Monitor, Play, Square, Download, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SerialMonitor() {
  const { serialOutput = [], clearSerialOutput } = useTerminalStore();
  const { activeDevice } = useDeviceStore();
  const { connect, disconnect, isConnected, sendData } = useDevice();
  const [input, setInput] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [serialOutput]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input && activeDevice) {
      sendData(activeDevice.portPath, input + '\n');
      setInput('');
    }
  };

  const toggleConnection = () => {
    if (!activeDevice) return;
    if (isConnected) {
      disconnect();
    } else {
      connect(activeDevice.portPath, activeDevice.baudRate);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black font-sans">
      <div className="h-9 px-4 border-b border-white/[0.05] flex items-center justify-between bg-black">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
            <Monitor className="w-3 h-3" />
            Hardware_Trace
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleConnection}
            className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-sm text-[9px] font-bold tracking-tight uppercase transition-all",
              isConnected 
                ? "bg-white text-black hover:bg-white/90" 
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            {isConnected ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isConnected ? 'Stop_Trace' : 'Start_Trace'}
          </button>
          
          <button 
            onClick={clearSerialOutput}
            className="p-1.5 hover:bg-white/5 rounded transition-colors text-white/20 hover:text-white/60"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 bg-black p-4 overflow-y-auto font-mono text-[11px] leading-relaxed selection:bg-white/20"
      >
        {serialOutput.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-10">
             <div className="w-12 h-12 border border-white/10 flex items-center justify-center bg-black rounded-lg">
                <Monitor className="w-6 h-6" />
             </div>
             <span className="text-[10px] tracking-widest uppercase">No hardware signals detected</span>
          </div>
        ) : (
          <div className="space-y-0.5">
            {serialOutput.map((line, i) => (
              <div key={i} className="flex gap-4 text-white/60 group">
                <span className="w-12 select-none opacity-10 text-right group-hover:opacity-30 transition-opacity font-mono text-[9px]">
                  {new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span className="flex-1 whitespace-pre-wrap">{line}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/[0.05] bg-black">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!isConnected}
            placeholder={isConnected ? "Send protocol command..." : "Registry offline // Start trace to interact"}
            className="flex-1 bg-[#0a0a0a] border border-white/5 px-4 py-2 text-[11px] font-mono tracking-tight text-white outline-none focus:border-white/20 transition-all placeholder:text-white/10 disabled:opacity-20 rounded-md"
          />
        </form>
      </div>
    </div>
  );
}
