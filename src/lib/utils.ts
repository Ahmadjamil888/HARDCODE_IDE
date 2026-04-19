import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
  });
}

export function getFileLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const langMap: Record<string, string> = {
    ino: 'cpp',
    c: 'c',
    cpp: 'cpp',
    h: 'c',
    hpp: 'cpp',
    py: 'python',
    v: 'verilog',
    sv: 'systemverilog',
    vhd: 'vhdl',
    vhdl: 'vhdl',
    json: 'json',
    md: 'markdown',
    txt: 'plaintext',
    yaml: 'yaml',
    yml: 'yaml',
    toml: 'toml',
    cfg: 'ini',
    ini: 'ini',
  };
  return langMap[ext || ''] || 'plaintext';
}

export function getFileIcon(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const iconMap: Record<string, string> = {
    ino: '⚡',
    c: '🔧',
    cpp: '🔧',
    h: '📋',
    hpp: '📋',
    py: '🐍',
    v: '🔲',
    vhd: '🔲',
    vhdl: '🔲',
    json: '📦',
    md: '📝',
    txt: '📄',
  };
  return iconMap[ext || ''] || '📄';
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export function parseCompilerErrors(output: string) {
  const errors: { file: string; line: number; column: number; message: string; severity: 'error' | 'warning' | 'info' }[] = [];
  const lines = output.split('\n');
  const errorRegex = /^(.+?):(\d+):(\d+):\s*(error|warning|note):\s*(.+)$/;
  
  for (const line of lines) {
    const match = line.match(errorRegex);
    if (match) {
      errors.push({
        file: match[1],
        line: parseInt(match[2], 10),
        column: parseInt(match[3], 10),
        severity: match[4] === 'note' ? 'info' : match[4] as 'error' | 'warning',
        message: match[5],
      });
    }
  }
  return errors;
}
