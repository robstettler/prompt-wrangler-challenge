import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

// Upload and initiate fine-tuning
export async function fineTuneModel(trainingFilePath) {
  try {
    // Upload training file
    const file = await openai.files.create({
      file: fs.createReadStream(trainingFilePath),
      purpose: "fine-tune",
    });

    console.log(`✅ Training file uploaded: ${file.id}`);

    // Start fine-tuning process
    const fineTune = await openai.fineTuning.jobs.create({
      training_file: file.id,
      model: 'gpt-3.5-turbo',
    });

    console.log(`✅ Fine-tuning job completed`);
    return fineTune;
  } catch (error) {
    console.error("❌ Fine-tuning error:", error.message, error);
  }
}