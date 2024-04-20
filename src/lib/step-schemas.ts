export const textSchema = {
  type: "text",
  content: {
    title: "string",
    description: "string",
    details: "string",
    example: "string (optional)",
  },
};

export const quizSchema = {
  type: "quiz",
  content: {
    question: "string",
    options: ["string"],
    correct_option: "string",
    explanation: "string",
  },
};

export const flashcardSchema = {
  type: "flashcard",
  content: {
    term: "string",
    definition: "string",
    importance: "string (optional)",
  },
};

export const summarySchema = {
  type: "summary_points",
  content: {
    points: ["string"],
  },
};
