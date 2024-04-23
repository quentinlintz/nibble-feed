import { z } from "zod";

export const TextStepSchema = z.object({
  header: z
    .string()
    .describe("The header for this particular section of the topic."),
  intro: z
    .string()
    .describe("An introductory paragraph setting the stage for the topic."),
  content: z
    .string()
    .describe("A thorough exploration of the topic with detailed information."),
});
export type TextStepType = z.infer<typeof TextStepSchema>;

export const QuizStepSchema = z.object({
  question: z.string().describe("The quiz question being asked."),
  options: z
    .array(z.string())
    .describe("A list of potential answers to the quiz question."),
  correctOption: z
    .string()
    .describe("The correct answer to the quiz question."),
  explanation: z
    .string()
    .describe("An explanation as to why this is the correct answer."),
});
export type QuizStepType = z.infer<typeof QuizStepSchema>;

export const FlashcardStepSchema = z.object({
  term: z
    .string()
    .describe("The term or concept being quizzed on the flashcard."),
  definition: z.string().describe("The definition or explanation of the term."),
});
export type FlashcardStepType = z.infer<typeof FlashcardStepSchema>;

export const SummaryStepSchema = z.object({
  points: z
    .array(z.string())
    .describe(
      "A list of concise points summarizing the main ideas of the topic."
    )
    .min(3)
    .max(5),
});
export type SummaryStepType = z.infer<typeof SummaryStepSchema>;
