'use client';

import * as React from 'react';
import { useDevice } from '@/hooks/useDevice';
import { AlertTriangle, Download, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DependencyWarning() {
  const { missingDependencies } = useDevice();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (missingDependencies.length > 0) {
      setIsOpen(true);
    }
  }, [missingDependencies]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-6">
      <div className="bg-[#161b22] border border-[#f85149]/50 rounded-2xl w-full max-w-lg p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center gap-4 text-[#f85149]">
          <div className="p-3 bg-[#f85149]/10 rounded-xl">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">System Dependencies Missing</h2>
            <p className="text-sm text-[#7d8590]">Some hardware tools are not installed on your system.</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-[#e6edf3]">The following tools are required for building and flashing:</p>
          <div className="grid grid-cols-2 gap-3">
            {missingDependencies.map(tool => (
              <div key={tool} className="flex items-center gap-2 px-4 py-3 bg-black border border-[#30363d] rounded-lg">
                <Terminal className="w-4 h-4 text-[#7d8590]" />
                <span className="text-xs font-mono text-[#58a6ff]">{tool}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/50 border border-[#30363d] rounded-xl p-4 space-y-2">
          <h4 className="text-xs font-bold text-[#7d8590] uppercase">Installation Guide</h4>
          <p className="text-[11px] text-[#7d8590] leading-relaxed">
            Run <code className="text-[#58a6ff]">brew install arduino-cli openocd</code> on macOS, or 
            <code className="text-[#58a6ff]">sudo apt install avrdude</code> on Linux.
          </p>
        </div>

        <div className="flex gap-4 pt-2">
          <Button 
            className="flex-1 h-12 bg-[#30363d] text-[#e6edf3] font-bold"
            onClick={() => setIsOpen(false)}
          >
            I'll fix it later
          </Button>
          <Button 
            className="flex-1 h-12 bg-[#f85149] text-white font-bold gap-2"
            onClick={() => window.open('https://hardcode-ide.com/docs/deps', '_blank')}
          >
            <Download className="w-4 h-4" />
            Install Now
          </Button>
        </div>
      </div>
    </div>
  );
}
