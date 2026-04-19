export interface Device {
  id: string;
  name: string;
  portPath: string;
  vendorId?: string;
  productId?: string;
  deviceType: 'arduino' | 'esp32' | 'stm32' | 'fpga' | 'rp2040';
  chipId?: string;
  flashMemoryKB?: number;
  ramKB?: number;
  pinCount?: number;
  capabilities?: string[];
  memoryUsage?: {
    flash: { used: number; total: number };
    ram: { used: number; total: number };
  };
  lastSeen: string;
}

export interface DeviceProfile extends Omit<Device, 'id' | 'portPath' | 'lastSeen' | 'memoryUsage'> {
  vendorIds: number[];
  productIds: number[];
  flashTool: 'avrdude' | 'esptool' | 'openocd' | 'uf2' | 'iceprog';
  defaultBaudRate: number;
}
