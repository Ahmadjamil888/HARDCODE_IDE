import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class FlashController {
  async flash(port: string, firmwarePath: string, type: string, onProgress: (msg: string) => void) {
    onProgress(`Starting flash for ${type} on ${port}...`);

    let command = '';

    switch (type) {
      case 'arduino':
        command = `avrdude -p atmega328p -c arduino -P ${port} -b 115200 -U flash:w:${firmwarePath}:i`;
        break;
      case 'esp32':
        command = `esptool.py --chip esp32 --port ${port} --baud 921600 write_flash 0x0 ${firmwarePath}`;
        break;
      case 'stm32':
        command = `openocd -f interface/stlink.cfg -f target/stm32f1x.cfg -c "program ${firmwarePath} verify reset exit"`;
        break;
      case 'fpga':
        command = `iceprog ${firmwarePath}`;
        break;
      default:
        throw new Error(`Unsupported device type: ${type}`);
    }

    onProgress(`Executing: ${command}`);

    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) onProgress(`[DEBUG] ${stderr}`);
    onProgress(stdout);

    return true;
  }
}
