import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { deviceProfile } = await req.json();

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      system: `Analyze the following hardware device profile and provide a summary for a developer.
Output MUST be in valid JSON format.`,
      prompt: `DEVICE PROFILE:
${JSON.stringify(deviceProfile, null, 2)}

Provide:
1. summary (plain English)
2. starterProjects (list of 5 {name, description, difficulty})
3. pitfalls (common gotchas)
4. recommendedLanguage (the best language for this device)
5. tips (expert advice)`,
    });

    // Extract JSON from potential markdown wrapping
    const jsonStr = text.trim().replace(/^```json|```$/g, '');
    const analysis = JSON.parse(jsonStr);

    return new Response(JSON.stringify(analysis), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Analysis failed' }), { status: 500 });
  }
}
