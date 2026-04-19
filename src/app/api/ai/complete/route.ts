import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { prefix, suffix, language, deviceContext } = await req.json();

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      system: `You are a code completion assistant for a Hardware IDE. 
Given the code before and after the cursor, generate the most likely next 1-10 lines of code.
Only output the code completion itself. No explanations, no markdown blocks.
Target Language: ${language}
Device Context: ${deviceContext || 'Generic hardware'}`,
      prompt: `CODE BEFORE CURSOR:
${prefix}

CODE AFTER CURSOR:
${suffix}`,
    });

    return new Response(JSON.stringify({ completion: text.trim().replace(/^```.*$|```$/gm, '') }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Completion failed' }), { status: 500 });
  }
}
