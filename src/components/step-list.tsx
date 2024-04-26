"use client";

import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import * as actions from "@/actions";
import StepFlashcard from "./step-flashcard";
import StepQuiz from "./step-quiz";
import StepSummary from "./step-summary";
import StepText from "./step-text";
import { Progress } from "./ui/progress";
import { StepType } from "@/db/schema";

interface StepListProps {
  nibbleId: string;
}

export default function StepList({ nibbleId }: StepListProps) {
  const fetcher = () => actions.getStepsForNibble(nibbleId);
  const { data: steps = [], error, isLoading } = useSWR(nibbleId, fetcher);

  const StepComponents = {
    text: StepText,
    flashcard: StepFlashcard,
    quiz: StepQuiz,
    summary: StepSummary,
  };

  useEffect(() => {
    if (steps.length < 4) {
      const interval = setInterval(() => {
        mutate(nibbleId);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [nibbleId, steps.length]);

  if (error) {
    return <div>Error loading steps</div>;
  }

  if (!isLoading && steps.length < 4) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <div className="text-lg font-semibold m-2">Creating your Nibble...</div>
        <Progress value={steps.length * 25} className="w-[60%]" />
      </div>
    );
  }

  return (
    <div>
      {steps.map((step, index) => {
        const StepComponent = StepComponents[step.stepType as StepType];
        if (!StepComponent) {
          console.error("Invalid step type:", step.stepType);
          return null;
        }
        const stepContent = JSON.parse(step.content as string);
        return <StepComponent key={index} {...stepContent} />;
      })}
    </div>
  );
}
