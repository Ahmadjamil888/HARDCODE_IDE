'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle2, XCircle, Clock, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TestResult } from '@/types/ai';

export default function TestPanel() {
  const [tests, setTests] = React.useState<TestResult[]>([
    { testName: 'LED Blink Pattern', status: 'passed', duration: 1200 },
    { testName: 'Serial Echo Ping', status: 'passed', duration: 450 },
    { testName: 'ADC Voltage Range', status: 'failed', error: 'Value 1.2V below threshold 1.5V', duration: 800 },
  ]);

  return (
    <div className="flex flex-col h-full bg-[#0d1117] text-[#e6edf3]">
      <div className="p-4 border-b border-[#30363d] flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7d8590]">Hardware Tests</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="h-7 text-[10px] text-[#58a6ff]">
            <Plus className="w-3 h-3 mr-1" /> Generate
          </Button>
          <Button size="sm" className="h-7 bg-[#238636] text-[10px]">
            <Play className="w-3 h-3 mr-1" /> Run All
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {tests.map((test, i) => (
          <div key={i} className="p-3 bg-[#161b22] border border-[#30363d] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{test.testName}</span>
              {test.status === 'passed' ? (
                <CheckCircle2 className="w-4 h-4 text-[#238636]" />
              ) : test.status === 'failed' ? (
                <XCircle className="w-4 h-4 text-[#f85149]" />
              ) : (
                <Clock className="w-4 h-4 text-[#7d8590]" />
              )}
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-[#7d8590]">
              <span>Duration: {test.duration}ms</span>
              <span className={cn(
                "px-1.5 py-0.5 rounded uppercase font-bold text-[8px]",
                test.status === 'passed' ? "bg-[#238636]/10 text-[#238636]" : "bg-[#f85149]/10 text-[#f85149]"
              )}>
                {test.status}
              </span>
            </div>
            
            {test.error && (
              <div className="mt-2 p-2 bg-red-900/10 border border-red-500/20 rounded text-[10px] text-[#f85149] font-mono">
                Error: {test.error}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
