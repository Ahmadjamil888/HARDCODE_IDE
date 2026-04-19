'use client';

import * as React from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, Cpu, Sparkles, Terminal, Zap, Fingerprint, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import AIMessage from './AIMessage';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AIChatPanel() {
  const { messages, input, setInput, append, handleInputChange, isLoading } = useChat({
    api: '/api/ai/chat',
  });

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleManualSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input || isLoading) return;
    
    const currentInput = input;
    setInput(''); // Clear input immediately for better UX
    await append({ role: 'user', content: currentInput });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleManualSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full bg-black font-sans border-l border-white/[0.05] relative z-20">
      {/* Header Protocol */}
      <div className="p-3 border-b border-white/[0.05] flex items-center justify-between bg-black sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-sm border border-white/20 flex items-center justify-center bg-[#050505]">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="space-y-0">
            <h2 className="text-[11px] font-bold tracking-widest uppercase text-white">Gemini_Neural</h2>
            <div className="flex items-center gap-1">
              <span className="text-[8px] text-white/40 tracking-tight uppercase font-mono">1.5_PRO // READY</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-8">
        <div className="space-y-10 max-w-full pb-10">
          {messages.length === 0 && (
            <div className="mt-32 flex flex-col items-center justify-center text-center space-y-6 px-10 opacity-40">
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center bg-black rounded-xl">
                 <Cpu className="w-6 h-6 text-white" />
              </div>
              <p className="text-[10px] text-white tracking-[0.2em] leading-relaxed max-w-[200px] mx-auto uppercase font-bold">
                 Neural layer online. <br/> Awaiting instructions.
              </p>
            </div>
          )}
          {messages.map((m) => (
            <AIMessage key={m.id} message={m} />
          ))}
          {isLoading && (
            <div className="flex gap-2 pl-4">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse delay-75" />
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse delay-150" />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Gateway */}
      <div className="p-4 bg-black border-t border-white/[0.05]">
        <form 
          ref={formRef}
          onSubmit={handleManualSubmit}
          className="relative group overflow-hidden border border-white/20 rounded-lg focus-within:border-white/40 transition-all bg-[#0a0a0a]"
        >
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            placeholder="Ask HardCode AI..."
            rows={1}
            className="w-full bg-transparent px-4 py-4 text-[13px] tracking-tight text-white placeholder:text-white/20 outline-none resize-none font-sans min-h-[56px]"
          />
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-4 text-[9px] text-white/30 uppercase font-mono tracking-widest font-bold">
               <span>L: 1.5.0</span>
               <span>Tokens: {input?.length || 0}</span>
            </div>
            <button 
              type="submit"
              disabled={!input || isLoading}
              className={cn(
                "w-7 h-7 flex items-center justify-center transition-all rounded-full border border-white/5",
                input ? "text-black bg-white hover:bg-white/90" : "text-white/5 cursor-not-allowed"
              )}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
        <div className="mt-3 flex items-center justify-center gap-3">
           <div className="h-px flex-1 bg-white/[0.03]" />
           <p className="text-[7px] text-white/10 uppercase tracking-[0.3em] font-bold">
              Secure_Inference_Layer
           </p>
           <div className="h-px flex-1 bg-white/[0.03]" />
        </div>
      </div>
    </div>
  );
}
