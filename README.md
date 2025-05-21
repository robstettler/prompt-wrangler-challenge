
# Prompt Wrangler CLI

A simple CLI tool demonstrating data extraction, using OpenAI.
### Goals
*Input:* clinical notes
*Output:* structured data extracted from clinical notes, token usage, and response time

### Future Work
- Structured data to Clipboard

  
## Setup

1. Install dependencies:

npm install

2. Create a `.env` file in the `config/` folder:

    OPENAI_API_KEY=your-api-key-here




## Usage
*Recommended: Finetune the model using the --fine-tune command a sample file is available /src/training_data.jsonl*

Run the CLI with required arguments:

node src/index.js -i "Patient needs CPAP..." -s output.json

  

Options:

-  `-i, --input` → Sample text input (required, if not using --fine-tune)
-  `-p, --prompt` → System + user prompt
-  `-t, --temperature` → LLM temperature (default: 0.7)
-  `-m, --max_tokens` → Max tokens (default: 200)
-  `-s, --save` → File path to save output (optional)
-   `--fine-tune` → File path to finetune the model (optional)

  

Example Output:

```json

{

"structuredData": {

"device": "CPAP",

"mask_type": "full face",

"add_ons": ["humidifier"],

"qualifier": "AHI > 20",

"ordering_provider": "Dr. Cameron"

},

"toeknUsage": 150,

"timeTaken": 1.42

}