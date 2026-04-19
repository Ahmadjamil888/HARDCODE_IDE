import { create } from 'zustand';

interface TerminalTab {
  id: string;
  label: string;
  type: 'serial' | 'build' | 'test';
}

interface TerminalStore {
  activeTabId: string;
  activeTab: 'serial' | 'build' | 'test'; // Added mapping for project page
  tabs: TerminalTab[];
  buildOutput: string[];
  testOutput: string[];
  serialOutput: string[]; // Missing State
  setActiveTab: (id: 'serial' | 'build' | 'test') => void;
  appendBuildOutput: (line: string) => void;
  clearBuildOutput: () => void;
  appendTestOutput: (line: string) => void;
  clearTestOutput: () => void;
  appendSerialOutput: (line: string) => void; // Missing Action
  clearSerialOutput: () => void; // Missing Action
}

export const useTerminalStore = create<TerminalStore>((set) => ({
  activeTabId: 'serial',
  activeTab: 'serial',
  tabs: [
    { id: 'serial', label: 'Serial Monitor', type: 'serial' },
    { id: 'build', label: 'Build Output', type: 'build' },
    { id: 'test', label: 'Test Results', type: 'test' }
  ],
  buildOutput: [],
  testOutput: [],
  serialOutput: [],

  setActiveTab: (id) => set({ activeTabId: id, activeTab: id }),

  appendBuildOutput: (line) => set((state) => ({ 
    buildOutput: [...state.buildOutput.slice(-500), line] 
  })),

  clearBuildOutput: () => set({ buildOutput: [] }),

  appendTestOutput: (line) => set((state) => ({ 
    testOutput: [...state.testOutput.slice(-500), line] 
  })),

  clearTestOutput: () => set({ testOutput: [] }),

  appendSerialOutput: (line) => set((state) => ({ 
    serialOutput: [...state.serialOutput.slice(-500), line] 
  })),

  clearSerialOutput: () => set({ serialOutput: [] })
}));
