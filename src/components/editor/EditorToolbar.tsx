'use client';

import * as React from 'react';
import { Play, Zap, Save, FileCode, ChevronDown, Monitor, Download, HardDrive, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/stores/editorStore';
import { useTerminalStore } from '@/stores/terminalStore';
import { useDeviceStore } from '@/stores/deviceStore';
import { useDevice } from '@/hooks/useDevice';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function EditorToolbar() {
  const { projectId } = useParams();
  const { activeFileId, markAsSaved, openFiles } = useEditorStore();
  const { setActiveTab } = useTerminalStore();
  const { activeDevice } = useDeviceStore();
  const { flash } = useDevice();
  
  const [isBuilding, setIsBuilding] = React.useState(false);
  const [isFlashing, setIsFlashing] = React.useState(false);

  const activeFile = openFiles.find(f => f.id === activeFileId);

  const handleBuild = async () => {
    if (!activeFileId) return;
    setIsBuilding(true);
    setActiveTab('build');
    setTimeout(() => setIsBuilding(false), 2000);
  };

  const handleFlash = async () => {
    if (!activeDevice) return;
    setIsFlashing(true);
    setActiveTab('build');
    setTimeout(() => setIsFlashing(false), 3000);
  };

  return (
    <div className="h-10 border-b border-white/[0.05] flex items-center justify-between px-3 bg-[#050505] sticky top-0 z-40">
      {/* File Tabs Area */}
      <div className="flex h-full items-center overflow-x-auto no-scrollbar">
        {openFiles.length === 0 ? (
          <div className="px-4 h-full flex items-center border-r border-white/[0.05] min-w-[120px]">
             <span className="text-[10px] text-white/20 uppercase tracking-widest">No Buffer</span>
          </div>
        ) : (
          openFiles.map(file => (
            <div 
              key={file.id} 
              className={cn(
                "px-4 h-full flex items-center gap-2 border-r border-white/[0.05] transition-all cursor-pointer group",
                activeFileId === file.id ? "bg-[#0a0a0a]" : "opacity-40 hover:opacity-80"
              )}
            >
              <FileCode className={cn(
                "w-3.5 h-3.5",
                activeFileId === file.id ? "text-[#4287f5]" : "text-white/40"
              )} />
              <span className={cn(
                "text-[10px] tracking-tight font-medium uppercase",
                activeFileId === file.id ? "text-white" : "text-white/60"
              )}>
                {file.path.split('/').pop()}
              </span>
              {file.isDirty && (
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-1.5 ml-4">
        <button 
          onClick={handleBuild}
          disabled={isBuilding}
          className="h-7 px-3 text-[9px] font-bold tracking-tight uppercase border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 disabled:opacity-30 rounded-sm"
        >
          <Zap className={cn("w-3 h-3", isBuilding && "animate-pulse")} />
          Sync
        </button>

        <button 
          onClick={handleFlash}
          disabled={isFlashing || !activeDevice}
          className="h-7 px-3 text-[9px] font-bold tracking-tight uppercase bg-white text-black hover:bg-white/90 transition-all flex items-center gap-2 disabled:opacity-30 rounded-sm"
        >
          <Download className={cn("w-3 h-3", isFlashing && "animate-bounce")} />
          Deploy
        </button>

        <div className="w-px h-4 bg-white/10 mx-1" />

        <button className="h-7 w-7 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/5 transition-all rounded-sm">
           <Share2 className="w-3.5 h-3.5" />
        </button>
        <button className="h-7 w-7 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/5 transition-all rounded-sm">
           <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
