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
      <div className="flex flex-col items-center justify-center h-full bg-black text-white/20">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border border-white/5 mx-auto flex items-center justify-center rounded-xl bg-[#050505]">
             <div className="w-2 h-2 rounded-full bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
          </div>
          <div className="space-y-1">
            <p className="text-[13px] font-bold tracking-widest uppercase">No Active Context</p>
            <p className="text-[11px] font-mono tracking-tight opacity-40 uppercase">Select a node from registries to initialize synthesis</p>
          </div>
        </div>
      </div>
    );
  }

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // HardCode AI Precision Noir Theme
    monaco.editor.defineTheme('hardcode-noir', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', foreground: 'FFFFFF', background: '050505' },
        { token: 'comment', foreground: '444444', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'FFFFFF', fontStyle: 'bold' },
        { token: 'string', foreground: 'A0A0A0' },
        { token: 'number', foreground: 'FFFFFF', fontStyle: 'bold' },
        { token: 'type', foreground: 'FFFFFF' },
        { token: 'function', foreground: 'FFFFFF' },
        { token: 'identifier', foreground: 'FFFFFF' },
      ],
      colors: {
        'editor.background': '#000000',
        'editor.foreground': '#FFFFFF',
        'editorLineNumber.foreground': '#1A1A1A',
        'editorLineNumber.activeForeground': '#FFFFFF',
        'editor.lineHighlightBackground': '#050505',
        'editor.selectionBackground': '#262626',
        'editorCursor.foreground': '#FFFFFF',
        'scrollbarSlider.background': '#111111',
        'scrollbarSlider.hoverBackground': '#1A1A1A',
        'scrollbarSlider.activeBackground': '#FFFFFF',
        'editor.border': '#111111',
        'editorIndentGuide.background': '#111111',
        'editorIndentGuide.activeBackground': '#262626',
      }
    });

    monaco.editor.setTheme('hardcode-noir');
  };

  return (
    <div className="h-full w-full bg-black flex flex-col">
      <MonacoEditor
        height="100%"
        theme="vs-dark"
        language={activeFile.language || 'cpp'}
        value={activeFile.content}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
          cursorBlinking: 'block',
          smoothScrolling: true,
          contextmenu: true,
          padding: { top: 24, bottom: 24 },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
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
