import { createServer } from 'http';
import { Server } from 'socket.io';
import { USBDetector } from './usb-detector';
import { SerialManager } from './serial-manager';
import { FlashController } from './flash-controller';
import { TestExecutor } from './test-executor';
import path from 'path';

const PORT = process.env.DEVICE_BRIDGE_PORT || 3001;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

const serial = new SerialManager();
const flasher = new FlashController();
const tester = new TestExecutor(serial);

async function checkDependencies() {
  const { execSync } = require('child_process');
  const tools = ['avrdude', 'esptool.py', 'openocd', 'python3'];
  const missing = [];
  
  for (const tool of tools) {
    try {
      execSync(`${tool} --version`, { stdio: 'ignore' });
    } catch {
      missing.push(tool);
    }
  }
  return missing;
}

io.on('connection', async (socket) => {
  console.log('IDE Client connected to bridge');

  // Check deps and notify
  const missing = await checkDependencies();
  if (missing.length > 0) {
    socket.emit('dependency:missing', { tools: missing });
  }

  // 1. USB Detection
  socket.on('scan', async () => {
    const devices = await USBDetector.scan();
    socket.emit('devices:list', devices);
  });

  // 2. Serial Control
  socket.on('serial:open', async ({ port, baudRate }) => {
    try {
      await serial.open(port, baudRate || 115200, (data) => {
        socket.emit('serial:data', data);
      });
      socket.emit('serial:opened', { port });
    } catch (err: any) {
      socket.emit('serial:error', err.message);
    }
  });

  socket.on('serial:write', async (data) => {
    // Basic write logic
  });

  socket.on('serial:close', async ({ port }) => {
    await serial.close(port);
    socket.emit('serial:closed', { port });
  });

  // 3. Flashing
  socket.on('flash:start', async ({ port, firmwarePath, type }) => {
    try {
      // Logic to resolve relative firmware path to project root
      const absolutePath = path.resolve(process.cwd(), firmwarePath);
      
      await flasher.flash(port, absolutePath, type, (msg) => {
        socket.emit('flash:progress', { message: msg });
      });
      
      socket.emit('flash:complete');
    } catch (err: any) {
      socket.emit('flash:error', err.message);
    }
  });

  // 4. Testing
  socket.on('test:run', async ({ port, testSuite }) => {
    await tester.runSuite(port, testSuite, (result) => {
      socket.emit('test:result', result);
    });
    socket.emit('test:complete');
  });

  socket.on('disconnect', () => {
    console.log('IDE Client disconnected');
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Device Bridge started on port ${PORT}`);
});
