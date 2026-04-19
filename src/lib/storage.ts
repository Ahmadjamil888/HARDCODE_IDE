import fs from 'fs';
import path from 'path';

const STORAGE_DIR = process.env.LOCAL_FIRMWARE_STORAGE_PATH || './storage/firmware';

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

export async function saveFirmwareLocally(projectId: string, filename: string, content: Buffer | string): Promise<string> {
  const projectDir = path.join(STORAGE_DIR, projectId);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  const filePath = path.join(projectDir, filename);
  fs.writeFileSync(filePath, content);
  
  return filePath;
}

export async function getFirmwareLocally(projectId: string, filename: string): Promise<Buffer | null> {
  const filePath = path.join(STORAGE_DIR, projectId, filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath);
}

export async function deleteFirmwareLocally(projectId: string, filename: string): Promise<void> {
  const filePath = path.join(STORAGE_DIR, projectId, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}
