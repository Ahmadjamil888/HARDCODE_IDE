import { create } from 'zustand';
import { ProjectFile, FileTab } from '@/types/project';

interface EditorStore {
  openFiles: FileTab[];
  activeFileId: string | null;
  unsavedFiles: Set<string>;
  setOpenFiles: (files: FileTab[]) => void;
  openFile: (file: ProjectFile) => void;
  closeFile: (fileId: string) => void;
  setActiveFile: (fileId: string | null) => void;
  updateFileContent: (fileId: string, content: string) => void;
  markAsSaved: (fileId: string) => void;
  isDirty: (fileId: string) => boolean;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  openFiles: [],
  activeFileId: null,
  unsavedFiles: new Set(),

  setOpenFiles: (files) => set({ openFiles: files }),

  openFile: (file) => {
    const { openFiles } = get();
    const existing = openFiles.find(f => f.id === file.id);
    
    if (existing) {
      set({ activeFileId: file.id });
      return;
    }

    const newTab: FileTab = {
      ...file,
      name: file.path.split('/').pop() || 'untitled',
      isDirty: false
    };

    set({ 
      openFiles: [...openFiles, newTab],
      activeFileId: file.id
    });
  },

  closeFile: (fileId) => {
    const { openFiles, activeFileId } = get();
    const newFiles = openFiles.filter(f => f.id !== fileId);
    
    let nextActiveId = activeFileId;
    if (activeFileId === fileId) {
      nextActiveId = newFiles.length > 0 ? newFiles[newFiles.length - 1].id : null;
    }

    set({ 
      openFiles: newFiles,
      activeFileId: nextActiveId
    });
  },

  setActiveFile: (fileId) => set({ activeFileId: fileId }),

  updateFileContent: (fileId, content) => {
    const { openFiles, unsavedFiles } = get();
    const updatedFiles = openFiles.map(f => {
      if (f.id === fileId) {
        return { ...f, content, isDirty: true };
      }
      return f;
    });

    const newUnsaved = new Set(unsavedFiles);
    newUnsaved.add(fileId);

    set({ openFiles: updatedFiles, unsavedFiles: newUnsaved });
  },

  markAsSaved: (fileId) => {
    const { openFiles, unsavedFiles } = get();
    const updatedFiles = openFiles.map(f => {
      if (f.id === fileId) {
        return { ...f, isDirty: false };
      }
      return f;
    });

    const newUnsaved = new Set(unsavedFiles);
    newUnsaved.delete(fileId);

    set({ openFiles: updatedFiles, unsavedFiles: newUnsaved });
  },

  isDirty: (fileId) => get().unsavedFiles.has(fileId)
}));
