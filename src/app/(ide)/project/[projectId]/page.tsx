'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useEditorStore } from '@/stores/editorStore';
import { useTerminalStore } from '@/stores/terminalStore';
import { useDeviceStore } from '@/stores/deviceStore';
import { useDevice } from '@/hooks/useDevice';
import { 
  Files, 
  Cpu, 
  ShieldCheck, 
  Settings, 
  Terminal as TerminalIcon, 
  Code,
  Zap,
  Sparkles,
  Search,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import Editor from '@/components/editor/Editor';
import FileTree from '@/components/editor/FileTree';
import AIChatPanel from '@/components/ai/AIChatPanel';
import BuildOutput from '@/components/terminal/BuildOutput';
import DeviceStatusBar from '@/components/device/DeviceStatusBar';
import SerialMonitor from '@/components/terminal/SerialMonitor';
import EditorToolbar from '@/components/editor/EditorToolbar';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function ProjectPage() {
  const { projectId } = useParams();
  const [activeSidebarView, setActiveSidebarView] = React.useState('files');
  const { activeTab, setActiveTab } = useTerminalStore();
  const [project, setProject] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then(res => res.json())
      .then(setProject);
  }, [projectId]);

  return (
    <div className="h-screen flex flex-col bg-black text-white font-sans overflow-hidden">
      {/* Precision Background Layer */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none app-grid"></div>

      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Fixed Width Sidebar - Monochromatic */}
        <Sidebar activeView={activeSidebarView} onViewChange={setActiveSidebarView} />

        {/* Global Workspace Container */}
        <div className="flex-1 relative overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {/* Exploration Registry */}
            <ResizablePanel defaultSize={18} minSize={10} className="bg-[#050505] border-r border-white/[0.05]">
              <div className="flex flex-col h-full">
                <div className="h-10 px-4 border-b border-white/[0.05] flex items-center justify-between bg-black">
                  <span className="text-[10px] font-bold tracking-[.2em] uppercase text-white">
                    {activeSidebarView === 'files' ? 'Registry_Sync' : activeSidebarView}
                  </span>
                  <div className="flex items-center gap-2 text-white/40">
                     <Search className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <FileTree projectId={projectId as string} />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle className="w-[1px] bg-white/[0.05] hover:bg-white/10 transition-colors" />

            {/* Logical Buffer (Editor + Trace) */}
            <ResizablePanel defaultSize={52}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={70}>
                  <div className="flex flex-col h-full">
                    <EditorToolbar />
                    <div className="flex-1 overflow-hidden relative bg-black">
                      <Editor />
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle className="h-[1px] bg-white/[0.05] hover:bg-white/10 transition-colors" />

                <ResizablePanel defaultSize={30}>
                  <div className="h-full flex flex-col bg-[#050505]">
                    <div className="flex border-b border-white/[0.05] bg-black h-9">
                      <button 
                        onClick={() => setActiveTab('build')}
                        className={cn(
                          "px-6 h-full text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2",
                          activeTab === 'build' ? "text-white bg-white/5 border-b border-white" : "text-white/30 hover:text-white/60"
                        )}
                      >
                        <TerminalIcon className="w-3.5 h-3.5" />
                        Compile_Log
                      </button>
                      <button 
                        onClick={() => setActiveTab('serial')}
                        className={cn(
                          "px-6 h-full text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2",
                          activeTab === 'serial' ? "text-white bg-white/5 border-b border-white" : "text-white/30 hover:text-white/60"
                        )}
                      >
                        <Monitor className="w-3.5 h-3.5" />
                        Hardware_Trace
                      </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      {activeTab === 'build' ? <BuildOutput /> : <SerialMonitor />}
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle className="w-[1px] bg-white/[0.05] hover:bg-white/10 transition-colors" />

            {/* Neural Synthesis Layer */}
            <ResizablePanel defaultSize={30} minSize={20} className="bg-black border-l border-white/[0.05]">
              <AIChatPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <DeviceStatusBar />
    </div>
  );
}
