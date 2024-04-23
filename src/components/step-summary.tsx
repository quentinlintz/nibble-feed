"use client";

interface StepSummaryProps {
  points: string[];
}

export default function StepSummary({ points }: StepSummaryProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Summary</h2>
        <ul className="list-disc list-inside text-xl text-gray-700 space-y-2">
          {points.map((point, index) => (
            <li key={index} className="p-1">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
