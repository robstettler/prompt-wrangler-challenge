#!/usr/bin/env node
import { Command } from 'commander';
import { processPrompt } from './promptProcessor.js';
import { saveOutput } from './utils.js';
import { fineTuneModel } from './fineTuneModel.js';
import dotenv from 'dotenv';

dotenv.config();

const program = new Command();

program
  .version('1.0.0')
  .description('CLI tool for AI prompt tuning and structured data extraction')
  .option('-i, --input <string>', 'Sample text input')
  .option('-p, --prompt <string>', 'User defined prompt vs. preestablished prompt')
  .option('-t, --temperature <number>', 'LLM temperature', '0.7')
  .option('-m, --max_tokens <number>', 'Max tokens', '200')
  .option('-s, --save <string>', 'File path to save output')
  .option('--fine-tune <path>', 'Fine-tune the model using a training dataset')
  .action(async (options) => {
    try {
      if (options.fineTune) {
        console.log(`📂 Starting fine-tuning using ${options.fineTune}...`);
        await fineTuneModel(options.fineTune);
        return;
      }

      if (!options.input) {
        console.error("❌ Error: You must provide input for extraction.");
        return;
      }

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