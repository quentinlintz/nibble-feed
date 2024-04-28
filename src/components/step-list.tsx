"use client";

import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import * as actions from "@/actions";
import StepFlashcard from "./step-flashcard";
import StepQuiz from "./step-quiz";
import StepSummary from "./step-summary";
import StepText from "./step-text";
import { StepType } from "@/db/schema";
import { POLLING_COUNT, POLLING_INTERVAL } from "@/constants";
import { Skeleton } from "./ui/skeleton";

interface StepListProps {
  nibbleId: string;
}

export default function StepList({ nibbleId }: StepListProps) {
  const [pollCount, setPollCount] = useState(0);
  const fetcher = () => actions.getStepsForNibble(nibbleId);
  const { data: steps = [] } = useSWR(nibbleId, fetcher);

  const StepComponents = {
    text: StepText,
    flashcard: StepFlashcard,
    quiz: StepQuiz,
    summary: StepSummary,
  };

  useEffect(() => {
    let interval: Timer | null = null;

    if (
      !steps.every((step) => step.status === "completed") &&
      pollCount < POLLING_COUNT
    ) {
      interval = setInterval(() => {
        mutate(nibbleId);
        setPollCount((prevCount) => prevCount + 1);
      }, POLLING_INTERVAL);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [nibbleId, steps.length, pollCount, steps]);

  return (
    <div>
      {steps.map((step, index) => {
        const StepComponent = StepComponents[step.stepType as StepType];
        if (!StepComponent) {
          console.error("Invalid step type:", step.stepType);
          return null;
        }
        if (step.status === "creating") {
          return (
            <Skeleton
              key={index}
              className="h-[400px] rounded-xl bg-gray-300 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10"
            />
          );
        }
        const stepContent = JSON.parse(step.content as string);
        return <StepComponent key={index} {...stepContent} />;
      })}
    </div>
  );
}
