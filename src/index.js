#!/usr/bin/env node
import { Command } from 'commander';
import { processPrompt } from './promptProcessor.js';
import { saveOutput } from './utils.js';
import dotenv from 'dotenv';

dotenv.config();

const program = new Command();

program
  .version('1.0.0')
  .description('CLI tool for AI prompt tuning and structured data extraction')
  .requiredOption('-p, --prompt <string>', 'System + user prompt')
  .requiredOption('-i, --input <string>', 'Sample text input')
  .option('-t, --temperature <number>', 'LLM temperature', '0.7')
  .option('-m, --max_tokens <number>', 'Max tokens', '200')
  .option('-s, --save <string>', 'File path to save output')
  .action(async (options) => {
    try {
      const output = await processPrompt(options);
      
      console.log('\n🔹 Structured Output:');
      console.log(JSON.stringify(output, null, 2));

      if (options.save) {
        saveOutput(options.save, output);
        console.log(`✅ Output saved to ${options.save}`);
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  });

program.parse(process.argv);