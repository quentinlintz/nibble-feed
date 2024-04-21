import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

export async function formatTopic(topic: string): Promise<string> {
  const model = new ChatOpenAI({
    temperature: 0,
    maxTokens: 60,
  });

  const res = await model.invoke([
    new SystemMessage(
      `You are converting study guide names into more formal and simple study guide names.
      * Be brief
      * Do not use special characters
      * Avoid using words like "guide", "essentials", "basics", etc...`
    ),
    new HumanMessage(topic),
  ]);

  return res.lc_kwargs.content;
}

// export async function generateTextStep(
//   content: TextStepContent
// ): Promise<TextStep> {
//   return {
//     type: "text",
//     content,
//   };
// }

// export async function generateQuizStep(
//   content: QuizStepContent
// ): Promise<QuizStep> {
//   return {
//     type: "quiz",
//     content,
//   };
// }

// export async function generateFlashcardStep(
//   content: FlashcardStepContent
// ): Promise<FlashcardStep> {
//   return {
//     type: "flashcard",
//     content,
//   };
// }

// export async function generateSummaryStep(
//   content: SummaryStepContent
// ): Promise<SummaryStep> {
//   return {
//     type: "summary_points",
//     content,
//   };
// }
