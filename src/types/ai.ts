export interface ChatMessage {
  id: string;
  projectId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: {
    model?: string;
    tokensUsed?: number;
    codeBlocks?: CodeBlock[];
    deviceContext?: string;
  };
  createdAt: Date;
}

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
}

export interface AICompletionRequest {
  prefix: string;
  suffix: string;
  language: string;
  deviceContext?: string;
}

export interface AICompletionResponse {
  completion: string;
  cached: boolean;
}

export interface AIChatRequest {
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
  projectId: string;
  deviceId?: string;
}

export interface DeviceAnalysisRequest {
  deviceProfile: {
    name: string;
    chipFamily: string;
    flashMemoryKB: number;
    ramKB: number;
    pinCount: number;
    capabilities: string[];
    supportedLanguages: string[];
  };
}

export interface QuickAction {
  label: string;
  prompt: string;
  icon: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Explain this code', prompt: 'Explain the currently selected code in detail.', icon: 'book-open' },
  { label: 'Find bugs', prompt: 'Find potential bugs in the current code.', icon: 'bug' },
  { label: 'Add comments', prompt: 'Add detailed comments to the current code.', icon: 'message-square' },
  { label: 'Write tests', prompt: 'Write hardware tests for the current code.', icon: 'test-tube' },
  { label: 'Optimize for flash size', prompt: 'Optimize the current code to reduce flash memory usage.', icon: 'hard-drive' },
  { label: 'Help me wire this up', prompt: 'Provide wiring instructions for the current project and device.', icon: 'cable' },
];

export interface TestCase {
  name: string;
  type: 'serial_assertion' | 'gpio_toggle' | 'blink_timing' | 'memory_test' | 'compilation_test';
  sendToDevice?: string;
  expectedResponse?: string;
  timeoutMs: number;
  description: string;
  pin?: number;
  threshold?: number;
}

export interface TestResult {
  testName: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  actual?: string;
  expected?: string;
  duration?: number;
  error?: string;
}
