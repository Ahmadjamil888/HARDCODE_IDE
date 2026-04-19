import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { DeviceProfile } from '@/types/device';

const geminiModel = google('gemini-1.5-pro-latest');

export function createHardwareSystemPrompt(device: DeviceProfile | null, projectContext: string) {
  let prompt = `You are HardCode AI, an expert embedded systems and hardware engineer.
Your goal is to help the user build reliable, optimized, and correct hardware projects.

PROJECT CONTEXT:
${projectContext}

`;

  if (device) {
    prompt += `TARGET DEVICE SPECS:
- Name: ${device.name}
- Chip Family: ${device.chipFamily}
- Flash: ${device.flashMemoryKB} KB
- RAM: ${device.ramKB} KB
- Pins: ${device.pinCount}
- Capabilities: ${device.capabilities.join(', ')}

`;
  }

  prompt += `INSTRUCTIONS:
1. Always generate complete, compilable code. Never use pseudocode.
2. Include all necessary headers, library imports, and initialization code.
3. Add clear comments explaining complex logic, register manipulations, or pin assignments.
4. If generating code for a specific pin, verify it against the device's capabilities (e.g., PWM, ADC).
5. Suggest hardware tests or debugging steps after generating code.
6. If the project context includes an error, analyze it and provide a fix.
7. Be concise but thorough. Focus on hardware reliability.
`;

  return prompt;
}

export async function chatWithGemini(messages: any[], systemPrompt: string) {
  return streamText({
    model: geminiModel,
    system: systemPrompt,
    messages,
  });
}
