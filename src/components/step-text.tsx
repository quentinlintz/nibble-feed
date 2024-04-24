"use client";

import { TextStepType } from "@/lib/schemas";

export default function StepText({ header, intro, content }: TextStepType) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{header}</h2>
        <p className="text-lg text-gray-500 mt-4 mb-4">{intro}</p>
        <p className="text-lg mt-4 mb-6">{content}</p>
      </div>
    </div>
  );
}
