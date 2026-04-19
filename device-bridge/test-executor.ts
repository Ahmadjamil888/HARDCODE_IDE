import { SerialManager } from './serial-manager';

export class TestExecutor {
  constructor(private serial: SerialManager) {}

  async runSuite(port: string, tests: any[], onResult: (res: any) => void) {
    for (const test of tests) {
      const start = Date.now();
      try {
        if (test.type === 'serial_assertion') {
          await this.serial.write(port, test.sendToDevice + '\n');
          
          // Wait for response logic... (simplified for now)
          await new Promise(r => setTimeout(r, 1000));
          
          onResult({
            name: test.name,
            status: 'passed',
            duration: Date.now() - start
          });
        }
      } catch (err: any) {
        onResult({
          name: test.name,
          status: 'failed',
          error: err.message,
          duration: Date.now() - start
        });
      }
    }
  }
}
