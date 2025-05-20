import fs from 'fs';

export function saveOutput(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error saving output:', error.message);
  }
}