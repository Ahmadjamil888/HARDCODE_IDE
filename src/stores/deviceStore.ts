import { create } from 'zustand';
import type { Device } from '@/types/device';

interface DeviceStore {
  connectedDevices: Device[];
  activeDevice: Device | null;
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
  serialData: string[];
  bridgeOnline: boolean;
  missingDependencies: string[];
  setConnectedDevices: (devices: Device[]) => void;
  addDevice: (device: Device) => void;
  removeDevice: (portPath: string) => void;
  setActiveDevice: (device: Device | null) => void;
  setConnectionStatus: (status: 'disconnected' | 'connecting' | 'connected') => void;
  appendSerialData: (line: string) => void;
  clearSerial: () => void;
  setBridgeOnline: (online: boolean) => void;
  setMissingDependencies: (deps: string[]) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  connectedDevices: [],
  activeDevice: null,
  connectionStatus: 'disconnected',
  serialData: [],
  bridgeOnline: false,
  missingDependencies: [],
  setConnectedDevices: (devices) => set({ connectedDevices: devices }),
  addDevice: (device) =>
    set((state) => ({
      connectedDevices: [...state.connectedDevices.filter((d) => d.portPath !== device.portPath), device],
    })),
  removeDevice: (portPath) =>
    set((state) => ({
      connectedDevices: state.connectedDevices.filter((d) => d.portPath !== portPath),
      activeDevice: state.activeDevice?.portPath === portPath ? null : state.activeDevice,
    })),
  setActiveDevice: (device) => set({ activeDevice: device }),
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  appendSerialData: (line) =>
    set((state) => ({
      serialData: [...state.serialData.slice(-1000), line],
    })),
  clearSerial: () => set({ serialData: [] }),
  setBridgeOnline: (online) => set({ bridgeOnline: online }),
  setMissingDependencies: (deps) => set({ missingDependencies: deps }),
}));
