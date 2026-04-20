'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { useEditorStore } from '@/stores/editorStore';
import { useDeviceStore } from '@/stores/deviceStore';
import { cn } from '@/lib/utils';

// Dynamic import for Monaco Editor
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function Editor() {
  const editorRef = React.useRef<any>(null);
  const { activeFileId, openFiles, updateFileContent } = useEditorStore();
  const { activeDevice } = useDeviceStore();
  
  const activeFile = openFiles.find(f => f.id === activeFileId);

  const handleEditorChange = (value: string | undefined) => {
    if (activeFileId && value !== undefined) {
      updateFileContent(activeFileId, value);
    }
  };

  if (!activeFile) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#080808] text-white/20 relative">
        <div className="absolute inset-0 z-0 opacity-10 blueprint-grid pointer-events-none" />
        <div className="text-center space-y-10 relative z-10">
          <div className="w-20 h-20 border border-[#CCFF00]/20 mx-auto flex items-center justify-center bg-[#CCFF00]/5 relative group">
             <div className="absolute inset-0 border border-[#CCFF00]/10 animate-pulse scale-110" />
             <div className="w-4 h-4 bg-[#CCFF00]/40 group-hover:bg-[#CCFF00] transition-colors" />
          </div>
          <div className="space-y-4">
            <p className="text-[14px] font-bold tracking-[0.3em] text-[#CCFF00] uppercase">Awaiting_Context</p>
            <p className="text-[10px] font-mono tracking-widest opacity-40 uppercase max-w-xs mx-auto leading-relaxed">
               Select a silicon target from registries to initialize neural synthesis layer.
            </p>
          </div>
          <div className="flex justify-center gap-4 pt-10">
             <div className="w-1 h-1 bg-white/20" />
             <div className="w-1 h-1 bg-white/20" />
             <div className="w-1 h-1 bg-white/20" />
          </div>
        </div>
      </div>
    );
  }

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // HardCode Neo-Industrial Precision Theme
    monaco.editor.defineTheme('hc-industrial', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', foreground: 'FFFFFF', background: '080808' },
        { token: 'comment', foreground: '555555', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'CCFF00', fontStyle: 'bold' },
        { token: 'string', foreground: '00E0FF' },
        { token: 'number', foreground: 'F63509', fontStyle: 'bold' },
        { token: 'type', foreground: 'FFFFFF', fontStyle: 'bold' },
        { token: 'function', foreground: 'FFFFFF' },
        { token: 'identifier', foreground: 'FFFFFF' },
      ],
      colors: {
        'editor.background': '#080808',
        'editor.foreground': '#FFFFFF',
        'editorLineNumber.foreground': '#222222',
        'editorLineNumber.activeForeground': '#CCFF00',
        'editor.lineHighlightBackground': '#111111',
        'editor.selectionBackground': '#CCFF0020',
        'editorCursor.foreground': '#CCFF00',
        'scrollbarSlider.background': '#1A1A1A',
        'scrollbarSlider.hoverBackground': '#222222',
        'scrollbarSlider.activeBackground': '#CCFF00',
        'editor.border': '#1A1A1A',
        'editorIndentGuide.background': '#1A1A1A',
        'editorIndentGuide.activeBackground': '#CCFF0030',
      }
    });

    monaco.editor.setTheme('hc-industrial');
  };

  return (
    <div className="h-full w-full bg-[#080808] flex flex-col pt-4">
      <MonacoEditor
        height="100%"
        theme="vs-dark"
        language={activeFile.language || 'cpp'}
        value={activeFile.content}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
          cursorBlinking: 'smooth',
          smoothScrolling: true,
          contextmenu: true,
          padding: { top: 32, bottom: 24 },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          lineDecorationsWidth: 20,
          lineNumbersMinChars: 4,
          scrollbar: {
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 4,
            horizontalScrollbarSize: 4
          }
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
