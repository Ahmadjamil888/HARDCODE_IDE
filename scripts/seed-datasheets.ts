import { embedBatch } from '../src/lib/embeddings';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Need service role for bulk insert
);

const datasheets = [
  {
    deviceType: 'arduino_uno',
    source: 'ATmega328P Datasheet',
    content: 'The ATmega328P is a high-performance Microchip 8-bit AVR RISC-based microcontroller combines 32 KB ISP flash memory with read-while-write capabilities, 1024B EEPROM, 2 KB SRAM, 23 general purpose I/O lines, 32 general purpose working registers, three flexible timer/counters with compare modes, internal and external interrupts, serial programmable USART, a byte-oriented 2-wire serial interface, SPI serial port, a 6-channel 10-bit A/D converter, programmable watchdog timer with internal oscillator, and five software selectable power saving modes.'
  },
  {
    deviceType: 'esp32',
    source: 'ESP32 Technical Reference',
    content: 'ESP32 is a single 2.4 GHz Wi-Fi-and-Bluetooth combo chip designed with the TSMC ultra-low-power 40 nm technology. It is designed to achieve the best power and RF performance, showing robustness, versatility and reliability in a wide variety of applications and power scenarios. Features include Dual-core Xtensa® 32-bit LX6 processors, up to 240 MHz, 448 KB ROM, 520 KB SRAM, and 16 KB SRAM in RTC.'
  }
  // Add more as needed...
];

async function seed() {
  console.log('Seeding datasheets...');
  
  const chunks = datasheets.map(d => d.content);
  const vectors = await embedBatch(chunks);

  const records = datasheets.map((d, i) => ({
    content: d.content,
    source: d.source,
    embedding: vectors[i],
    metadata: { deviceType: d.deviceType }
  }));

  const { error } = await supabase.from('embeddings').insert(records);

  if (error) console.error('Seed error:', error);
  else console.log('Successfully seeded datasheets!');
}

seed();
