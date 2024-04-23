"use client";

interface StepTextProps {
  description: string;
  details: string;
  example?: string;
}

export default function StepText({
  description,
  details,
  example,
}: StepTextProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-4">
          {description}
        </h2>
        <hr className="border-t border-gray-300" />
      </div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Details</h2>
        <p className="text-lg text-gray-700 mt-4 mb-6">{details}</p>
        <hr className="border-t border-gray-300" />
      </div>
      {example && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Example</h2>
          <p className="text-lg text-gray-700 italic mt-4 mb-6">{example}</p>
          <hr className="border-t border-gray-300" />
        </div>
      )}
    </div>
  );
}
