# Prompt Wrangler CLI
A simple CLI tool for AI prompt tuning and structured data extraction.

## Setup
1. Install dependencies:
npm install
2. Create a `.env` file in the `config/` folder:
OPENAI_API_KEY=your-api-key-here

## Usage
Run the CLI with required arguments:
node src/index.js -p "Extract structured data from clinical notes" -i "Patient needs CPAP..." -s output.json

Options:
- `-p, --prompt` → System + user prompt (required)
- `-i, --input` → Sample text input (required)
- `-t, --temperature` → LLM temperature (default: 0.7)
- `-m, --max_tokens` → Max tokens (default: 200)
- `-s, --save` → File path to save output (optional)

Example Output:
```json
{
  "structured_data": {
    "device": "CPAP",
    "mask_type": "full face",
    "add_ons": ["humidifier"],
    "qualifier": "AHI > 20",
    "ordering_provider": "Dr. Cameron"
  },
  "token_usage": 150,
  "response_time_sec": 1.42
}