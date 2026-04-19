import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

export class SerialManager {
  private ports: Map<string, SerialPort> = new Map();

  async open(path: string, baudRate: number, onData: (data: string) => void): Promise<void> {
    if (this.ports.has(path)) {
      await this.close(path);
    }

    const port = new SerialPort({ path, baudRate });
    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    parser.on('data', onData);
    
    this.ports.set(path, port);
  }

  async write(path: string, data: string): Promise<void> {
    const port = this.ports.get(path);
    if (port) {
      port.write(data);
    }
  }

  async close(path: string): Promise<void> {
    const port = this.ports.get(path);
    if (port) {
      return new Promise((resolve) => {
        port.close(() => {
          this.ports.delete(path);
          resolve();
        });
      });
    }
  }
}
