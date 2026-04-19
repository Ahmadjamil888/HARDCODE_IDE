'use client';

import * as React from 'react';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { cn } from '@/lib/utils';

interface IDELayoutProps {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  bottomPanel?: React.ReactNode;
}

export default function IDELayout({
  leftPanel,
  centerPanel,
  rightPanel,
  bottomPanel
}: IDELayoutProps) {
  return (
    <div className="flex h-screen w-full bg-black text-[#f5f5f5] overflow-hidden app-grid selection:bg-white/10 selection:text-white font-sans">
      <Group orientation="horizontal">
        {/* Navigation Sidebar */}
        <Panel defaultSize="20%" minSize="15%" className="border-r border-white-[0.05] bg-black">
          <div className="h-full flex flex-col noir-shadow">
            {leftPanel}
          </div>
        </Panel>
        
        <Separator className="w-[1px] hover:bg-white/20 transition-colors bg-white/5" />

        {/* Workspace Center */}
        <Panel defaultSize="55%">
          <Group orientation="vertical">
            <Panel defaultSize="70%">
              <div className="h-full bg-black/40 backdrop-blur-sm cursor-gradient overflow-hidden">
                {centerPanel}
              </div>
            </Panel>
            
            {bottomPanel && (
              <>
                <Separator className="h-[1px] hover:bg-white/20 transition-colors bg-white/5" />
                <Panel defaultSize="30%">
                  <div className="h-full bg-black border-t border-white/[0.05]">
                    {bottomPanel}
                  </div>
                </Panel>
              </>
            )}
          </Group>
        </Panel>

        <Separator className="w-[1px] hover:bg-white/20 transition-colors bg-white/5" />

        {/* Intelligence Layer */}
        <Panel defaultSize="25%" className="border-l border-white-[0.05] bg-black noir-glow">
          <div className="h-full bg-black/50 backdrop-blur-md">
            {rightPanel}
          </div>
        </Panel>
      </Group>
    </div>
  );
}
