import { NextResponse } from 'next/server';
import { getFirmwareLocally } from '@/lib/storage';

export async function POST(req: Request) {
  try {
    const { projectId, deviceId } = await req.json();

    // In a real app, we'd find the latest firmware for this project
    const firmwareBuffer = await getFirmwareLocally(projectId, 'firmware.bin');

    if (!firmwareBuffer) {
      return NextResponse.json({ error: 'No firmware found. Build first.' }, { status: 400 });
    }

    // We notify the device-bridge via WebSocket 
    // In a Server Route, we can't easily emit to a specific socket 
    // without a registry or pub/sub. 
    // For now, we return the path and let the client trigger the bridge.

    return NextResponse.json({
      success: true,
      firmwarePath: `storage/firmware/${projectId}/firmware.bin`,
      message: 'Firmware ready for flashing. Send flash:start to bridge.'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
