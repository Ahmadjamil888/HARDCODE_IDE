'use client';

import * as React from 'react';
import { Bot, User, Copy, Check, FileCode, ArrowDownToLine, Sparkles, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types/ai';
import { useEditorStore } from '@/stores/editorStore';

export default function AIMessage({ message }: { message: ChatMessage }) {
  const isAssistant = message.role === 'assistant';
  const [copied, setCopied] = React.useState(false);
  const { activeFileId, updateFileContent, openFiles } = useEditorStore();

  const handleInsert = (code: string) => {
    if (!activeFileId) return;
    const file = openFiles.find(f => f.id === activeFileId);
    if (!file) return;
    updateFileContent(activeFileId, file.content + '\n' + code);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(
      "py-6 px-4 group transition-colors",
      isAssistant ? "bg-[#050505]/50" : "bg-transparent"
    )}>
      <div className="flex gap-6 max-w-full">
        <div className={cn(
          "w-7 h-7 rounded-md border flex items-center justify-center shrink-0 transition-shadow",
          isAssistant 
            ? "bg-white border-white text-black shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
            : "bg-[#0a0a0a] border-white/10 text-white/40"
        )}>
          {isAssistant ? <Sparkles className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
        </div>
        
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
              {isAssistant ? 'Gemini_Neural' : 'User_Protocol'}
            </div>
          </div>
          
          <div className="text-[13px] leading-relaxed text-white font-light whitespace-pre-wrap selection:bg-white/20">
            {message.content}
          </div>

          {isAssistant && (
            <div className="flex items-center gap-3 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black border border-white/10 text-[9px] font-bold tracking-widest uppercase text-white/40 hover:text-white hover:border-white transition-all"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              
              <button 
                onClick={() => handleInsert(message.content)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white text-black text-[9px] font-bold tracking-widest uppercase hover:bg-white/90 transition-all shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              >
                <ArrowDownToLine className="w-3 h-3" />
                Synthesis_Inject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
