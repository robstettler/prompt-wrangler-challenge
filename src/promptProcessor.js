import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { performance } from 'perf_hooks';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

export async function processPrompt(options) {
  const startTime = performance.now();

  const systemPrompt = `
    Extract structured data from clinical notes using the following format:

    - **device**: Main medical equipment or supply (e.g., CPAP, nebulizer, wheelchair).
    - **product**: If supplies are referenced instead of a device (e.g., CPAP supplies).
    - **mask_type**: If the device includes a mask, specify type (e.g., "full face").
    - **add_ons**: List accessories or additional components (e.g., ["humidifier"]).
    - **features**: If the device includes special features (e.g., ["trapeze bar", "side rails"]).
    - **qualifier**: The medical justification or diagnostic threshold (e.g., "AHI > 20").
    - **diagnosis**: Medical condition associated with the device (e.g., "COPD").
    - **SpO2**: If relevant, include oxygen saturation level (e.g., "87%").
    - **usage**: When the device is used (e.g., ["exertion", "sleep"]).
    - **compliance_status**: Indicate if the patient is compliant with treatment (e.g., "compliant").
    - **mobility_status**: If relevant, specify the patient's mobility limitations (e.g., "non-ambulatory").
    - **ordering_provider**: Name of the prescribing doctor.

    ### **Example Inputs & Expected Outputs**
    #### **Input:**
    Patient diagnosed with COPD, SpO2 measured at 87% on room air. Needs portable oxygen concentrator for use during exertion and sleep. Dr. Chase signed the order.
    #### **Expected Output:**
    
    {
      "device": "portable oxygen concentrator",
      "diagnosis": "COPD",
      "SpO2": "87%",
      "usage": ["exertion", "sleep"],
      "ordering_provider": "Dr. Chase"
    }
    

    #### **Input:**
    Asthma diagnosis confirmed. Prescribing nebulizer with mouthpiece and tubing. Dr. Foreman completed the documentation.
    #### **Expected Output:**
    
    {
      "device": "nebulizer",
      "accessories": ["mouthpiece", "tubing"],
      "diagnosis": "Asthma",
      "ordering_provider": "Dr. Foreman"
    }
    

    Ensure the response strictly follows this format and returns **only valid JSON**.
    `;


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

  // Return only the extracted structured data
  return JSON.parse(response.choices[0].message.content);

}