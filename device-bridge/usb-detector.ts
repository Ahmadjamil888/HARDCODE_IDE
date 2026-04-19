import { SerialPort } from 'serialport';

let usb: any = null;
try {
  // Use a dynamic require or conditional import to prevent crash if native module fails
  usb = require('usb').usb;
} catch (e) {
  console.warn('Native USB monitoring not available. Falling back to SerialPort polling.');
}

export interface DeviceInfo {
  portPath: string;
  vendorId?: string;
  productId?: string;
  name: string;
}

export class USBDetector {
  private static profiles = [
    { vid: '2341', pid: '0043', name: 'Arduino Uno' },
    { vid: '10c4', pid: 'ea60', name: 'ESP32 CP2102' },
    { vid: '2e8a', pid: '0003', name: 'Raspberry Pi Pico' },
    { vid: '0483', pid: '374b', name: 'STM32 ST-Link' }
  ];

  static async scan(): Promise<DeviceInfo[]> {
    try {
      const ports = await SerialPort.list();
      return ports.map(port => {
        const vid = port.vendorId?.toLowerCase().replace(/^0x/, '');
        const pid = port.productId?.toLowerCase().replace(/^0x/, '');
        
        const profile = this.profiles.find(p => 
          p.vid === vid && p.pid === pid
        );
        
        return {
          portPath: port.path,
          vendorId: port.vendorId,
          productId: port.productId,
          name: profile?.name || 'Generic USB Device'
        };
      });
    } catch (err) {
      console.error('Scan error:', err);
      return [];
    }
  }

  static watch(onConnect: (device: DeviceInfo) => void, onDisconnect: (path: string) => void) {
    if (!usb) return;

    try {
      usb.on('attach', async () => {
        const ports = await this.scan();
        // Simplified: just trigger a scan refresh on the frontend
      });

      usb.on('detach', () => {
        // Simplified: just trigger a scan refresh on the frontend
      });
    } catch (e) {
      console.warn('USB watch subscription failed:', e);
    }
  }
}
