'use client';

import * as React from 'react';
import { Files, FileCode, Folder, Plus, Search, ChevronRight, HardDrive } from 'lucide-react';
import { useEditorStore } from '@/stores/editorStore';
import { cn } from '@/lib/utils';

interface FileTreeProps {
  projectId: string;
}

export default function FileTree({ projectId }: FileTreeProps) {
  const [files, setFiles] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { openFile, activeFileId } = useEditorStore();

  React.useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}/files`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setFiles(data);
        } else if (data.error) {
          setError(data.error);
        } else {
          setFiles([]);
        }
      } catch (err) {
        setError('Connection interrupted');
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) fetchFiles();
  }, [projectId]);

  return (
    <div className="flex flex-col h-full bg-[#050505] font-sans">
      <div className="p-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[.2em] font-bold text-white/40">Explorer</span>
        </div>
        <button className="p-1 hover:bg-white/5 rounded transition-all">
          <Plus className="w-3.5 h-3.5 text-white/20 hover:text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pt-2">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-2.5 bg-white/5 animate-pulse rounded-full w-full opacity-20" />
            ))}
          </div>
        ) : error ? (
          <div className="p-4 mx-2 border border-red-500/20 bg-red-500/5 text-[9px] text-red-400 uppercase tracking-widest font-mono">
            FS_FAULT: {error}
          </div>
        ) : files.length === 0 ? (
          <div className="p-8 text-center opacity-20">
            <Files className="w-8 h-8 mx-auto mb-2 font-thin" />
            <p className="text-[9px] uppercase tracking-widest">Workspace Empty</p>
          </div>
        ) : (
          <div className="space-y-px">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => openFile(file)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 text-[11px] transition-all group",
                  activeFileId === file.id 
                    ? "bg-white/10 text-white font-medium shadow-[inset_2px_0_0_white]" 
                    : "text-white/40 hover:bg-white/[0.03] hover:text-white/80"
                )}
              >
                <FileCode className={cn(
                  "w-3.5 h-3.5",
                  activeFileId === file.id ? "text-white" : "text-white/20"
                )} />
                <span className="truncate tracking-tight">{file.path.split('/').pop()}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
