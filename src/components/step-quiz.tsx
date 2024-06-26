"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { QuizStepType } from "@/lib/schemas";

export default function StepQuiz({
  question,
  options,
  correctOption,
  explanation,
}: QuizStepType) {
  const [reveal, setReveal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setReveal(true);
  };

  const getButtonBgColor = (option: string) => {
    if (reveal) {
      return option === correctOption
        ? "bg-green-200 hover:bg-green-300"
        : "bg-red-200 hover:bg-red-300";
    }
    return "hover:bg-gray-100";
  };

  const getCursorStyle = () => (reveal ? "cursor-not-allowed" : "");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Quiz</h2>
        <p className="text-lg text-gray-700 mt-2">{question}</p>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          {options.map((option, index) => (
            <Button
              key={index}
              className={`text-lg break-normal ${getButtonBgColor(
                option
              )} ${getCursorStyle()}`}
              onClick={() => handleOptionClick(option)}
              disabled={reveal}
              variant={"outline"}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      {reveal && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-900">Explanation</h3>
          <p className="text-lg text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  );
}
