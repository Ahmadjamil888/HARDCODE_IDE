export type TargetDevice =
  | 'arduino_uno'
  | 'arduino_mega'
  | 'esp32'
  | 'esp8266'
  | 'raspberry_pi_pico'
  | 'stm32f103'
  | 'ice40up5k'
  | 'raspberry_pi';

export type ProjectLanguage = 'c_cpp' | 'micropython' | 'verilog' | 'vhdl';

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  targetDevice: TargetDevice;
  language: ProjectLanguage;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  path: string;
  content: string;
  language: string;
  isEntry: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileTab {
  id: string;
  projectId: string;
  path: string;
  name: string;
  content: string;
  language: string;
  isDirty: boolean;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  targetDevice: TargetDevice;
  language: ProjectLanguage;
}

export interface BuildResult {
  success: boolean;
  firmwarePath?: string;
  memoryUsage?: {
    flash: { used: number; total: number };
    ram: { used: number; total: number };
  };
  output: string;
  errors: CompilerError[];
  warnings: CompilerError[];
}

export interface CompilerError {
  file: string;
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export const TARGET_DEVICE_LABELS: Record<TargetDevice, string> = {
  arduino_uno: 'Arduino Uno',
  arduino_mega: 'Arduino Mega',
  esp32: 'ESP32',
  esp8266: 'ESP8266',
  raspberry_pi_pico: 'Raspberry Pi Pico (RP2040)',
  stm32f103: 'STM32F103',
  ice40up5k: 'iCE40 UltraPlus 5K',
  raspberry_pi: 'Raspberry Pi',
};

export const DEVICE_DEFAULT_LANGUAGE: Record<TargetDevice, ProjectLanguage> = {
  arduino_uno: 'c_cpp',
  arduino_mega: 'c_cpp',
  esp32: 'c_cpp',
  esp8266: 'c_cpp',
  raspberry_pi_pico: 'micropython',
  stm32f103: 'c_cpp',
  ice40up5k: 'verilog',
  raspberry_pi: 'micropython',
};

export const LANGUAGE_LABELS: Record<ProjectLanguage, string> = {
  c_cpp: 'C/C++ (Arduino)',
  micropython: 'MicroPython',
  verilog: 'Verilog',
  vhdl: 'VHDL',
};
