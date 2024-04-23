"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FlashcardStepType } from "@/lib/schemas";

export default function StepFlashcard({ term, definition }: FlashcardStepType) {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Flashcards</h2>
      <div className="flex items-center justify-center bg-gray-100 px-4 py-8">
        <div className="relative w-full max-w-2xl">
          <motion.div
            className="relative w-full"
            style={{ height: "18rem", perspective: "1000px" }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              className="absolute w-full h-full bg-white rounded-lg shadow-lg"
              variants={cardVariants}
              animate={isFlipped ? "back" : "front"}
              transition={{ duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute w-full h-full flex items-center justify-center rounded-lg"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
              >
                <div className="p-8">
                  <h2 className="text-3xl font-bold">{term}</h2>
                </div>
              </motion.div>
              <motion.div
                className="absolute w-full h-full flex flex-col items-center justify-center rounded-lg"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="p-8 text-center">{definition}</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
