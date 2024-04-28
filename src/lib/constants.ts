// Models
export const GPT_3_5_TURBO = "gpt-3.5-turbo";
export const GPT_4_1106_PREVIEW = "gpt-4-1106-preview";

// Prompts
export const CREATE_NIBBLE_TOPIC_PROMPT = `You are converting study guide names into more formal and simple study guide names.
  * Be brief
  * Do not use special characters
  * Avoid using words like "guide", "essentials", "basics", etc...
  * If the study guide name is not appropriate as a topic, please provide a new topic`;
const FORMAT_INSTRUCTIONS =
  "Wrap the output in `json` tags.\n{formatInstructions}";
export const TEXT_STEP_PROMPT =
  "Create a textual section to a study guide on the topic." +
  FORMAT_INSTRUCTIONS;
export const QUIZ_STEP_PROMPT =
  "Develop a quiz question with multiple choices for a study guide based on the topic." +
  FORMAT_INSTRUCTIONS;
export const FLASHCARD_STEP_PROMPT =
  "Create a flashcard for a study guide that focuses on an essential term or concept from the topic." +
  FORMAT_INSTRUCTIONS;
export const SUMMARY_STEP_PROMPT =
  "Generate a concise summary consisting of key points for a study guide on the topic." +
  FORMAT_INSTRUCTIONS;
