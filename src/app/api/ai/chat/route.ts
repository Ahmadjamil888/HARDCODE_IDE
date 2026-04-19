import { streamText } from 'ai';
import { model, createHardwareSystemPrompt } from '@/lib/ai';
import { retrieveContext } from '@/lib/rag';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, deviceProfile, projectContext } = await req.json();

    // 1. RAG Retrieval
    const lastMessage = messages[messages.length - 1]?.content || '';
    const ragContext = await retrieveContext(lastMessage, deviceProfile?.type);

    // 2. Build System Prompt
    const baseSystemPrompt = createHardwareSystemPrompt(deviceProfile, projectContext || 'Empty project');
    const systemPrompt = `
${baseSystemPrompt}

SUPPLEMENTAL DATASHEET CONTEXT:
${ragContext}
`;

    const result = await streamText({
      model,
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('AI Chat Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
