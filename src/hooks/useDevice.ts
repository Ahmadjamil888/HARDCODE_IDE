'use client';

import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDeviceStore } from '@/stores/deviceStore';

let socket: Socket | null = null;

export function useDevice() {
  const { 
    setConnectedDevices, addDevice, removeDevice, 
    setBridgeOnline, appendSerialData, setMissingDependencies,
    missingDependencies 
  } = useDeviceStore();

  useEffect(() => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');

      socket.on('connect', () => {
        setBridgeOnline(true);
        socket?.emit('scan');
      });

      socket.on('disconnect', () => {
        setBridgeOnline(false);
      });

      socket.on('devices:list', (devices) => {
        setConnectedDevices(devices);
      });

      socket.on('device:connected', (device) => {
        addDevice(device);
      });

      socket.on('device:disconnected', ({ portPath }) => {
        removeDevice(portPath);
      });

      socket.on('serial:data', (data) => {
        appendSerialData(data);
      });

      socket.on('dependency:missing', ({ tools }) => {
        setMissingDependencies(tools);
      });
    }

    return () => {
      // We don't necessarily want to disconnect on every unmount 
      // of a component using this hook, but in a real app 
      // we'd manage the socket lifecycle carefully.
    };
  }, []);

  const scan = () => socket?.emit('scan');
  const openSerial = (path: string, baudRate: number) => socket?.emit('serial:open', { path, baudRate });
  const closeSerial = () => socket?.emit('serial:close');
  const sendSerial = (data: string) => socket?.emit('serial:write', data);
  const flash = (port: string, firmwarePath: string, type: string) => 
    socket?.emit('flash:start', { port, firmwarePath, type });

  return { scan, openSerial, closeSerial, sendSerial, flash, missingDependencies };
}
