import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { performance } from 'perf_hooks';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

export async function processPrompt(options) {
  const startTime = performance.now();

  const systemPrompt = options.prompt ?? `
    Extract structured data from clinical notes. Output **only JSON** with relevant fields:
      - 'device' or 'product'
      - 'components' or 'accessories'
      - 'diagnosis', 'qualifier', 'mobility_status'
      - 'ordering_provider'
      Ensure the JSON is properly formatted.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // Cost basis feel free to change model
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: options.input }
    ],
    temperature: parseFloat(options.temperature),
    max_tokens: parseInt(options.max_tokens, 10)
  });

  const endTime = performance.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

  let structuredData;
  
  try {
    structuredData = JSON.parse(response.choices[0].message.content);
  } catch (error) {
    structuredData = response.choices[0].message.content; // Fallback to raw content
  }


  return {
    structuredData,
    tokenUsage: response.usage.total_tokens,
    timeTaken
  };
}