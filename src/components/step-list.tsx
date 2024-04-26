"use client";

import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import * as actions from "@/actions";
import StepFlashcard from "./step-flashcard";
import StepQuiz from "./step-quiz";
import StepSummary from "./step-summary";
import StepText from "./step-text";
import { Progress } from "./ui/progress";
import { StepType } from "@/db/schema";
import { POLLING_INTERVAL } from "@/constants";

interface StepListProps {
  nibbleId: string;
}

export default function StepList({ nibbleId }: StepListProps) {
  const [pollCount, setPollCount] = useState(0);
  const fetcher = () => actions.getStepsForNibble(nibbleId);
  const { data: steps = [], isLoading } = useSWR(nibbleId, fetcher);

  const StepComponents = {
    text: StepText,
    flashcard: StepFlashcard,
    quiz: StepQuiz,
    summary: StepSummary,
  };

  useEffect(() => {
    let interval: Timer | null = null;

    if (steps.length < 4 && pollCount < POLLING_INTERVAL) {
      interval = setInterval(() => {
        mutate(nibbleId);
        console.log(pollCount);
        setPollCount((prevCount) => prevCount + 1);
      }, 2000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [nibbleId, steps.length, pollCount]);

  if (pollCount === POLLING_INTERVAL) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <div className="text-lg font-semibold m-2">
          There was an error creating some of the steps. Please try again later.
        </div>
      </div>
    );
  }

  let loader =
    !isLoading && steps.length < 4 ? (
      <div className="flex flex-col items-center min-h-screen">
        <div className="text-lg font-semibold m-2">Creating your Nibble...</div>
        <Progress value={(steps.length + 1) * 20} className="w-[60%]" />
      </div>
    ) : null;

  return (
    <div>
      {loader}
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
