'use client';

import * as React from 'react';
import { CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TestStatus } from '@/types/ai';

interface TestResultBadgeProps {
  status: TestStatus;
  className?: string;
}

export default function TestResultBadge({ status, className }: TestResultBadgeProps) {
  const configs = {
    passed: {
      icon: CheckCircle2,
      label: 'Passed',
      color: 'text-[#238636] bg-[#238636]/10 border-[#238636]/30',
    },
    failed: {
      icon: XCircle,
      label: 'Failed',
      color: 'text-[#f85149] bg-[#f85149]/10 border-[#f85149]/30',
    },
    pending: {
      icon: Clock,
      label: 'Queued',
      color: 'text-[#7d8590] bg-[#161b22] border-[#30363d]',
    },
    running: {
      icon: Loader2,
      label: 'Running',
      color: 'text-[#58a6ff] bg-[#58a6ff]/10 border-[#58a6ff]/30',
    },
  };

  const config = configs[status] || configs.pending;
  const Icon = config.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider",
      config.color,
      className
    )}>
      <Icon className={cn("w-3 h-3", status === 'running' && "animate-spin")} />
      {config.label}
    </div>
  );
}
