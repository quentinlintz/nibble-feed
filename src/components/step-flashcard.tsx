"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FlashcardStepType } from "@/lib/schemas";

export default function StepFlashcard({ cards }: FlashcardStepType) {
  const [flippedStates, setFlippedStates] = useState(
    Array(cards.length).fill(false)
  );

  const handleFlip = (index: number) => {
    const newFlippedStates = [...flippedStates];
    newFlippedStates[index] = !newFlippedStates[index];
    setFlippedStates(newFlippedStates);
  };

  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Flashcards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-100 p-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="relative w-full cursor-pointer"
            style={{ height: "12rem", perspective: "1000px" }}
            onClick={() => handleFlip(index)}
          >
            <motion.div
              className="absolute inset-0 bg-white rounded-lg shadow-lg"
              variants={cardVariants}
              animate={flippedStates[index] ? "back" : "front"}
              transition={{ duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-lg"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                  backgroundColor: "rgba(245, 245, 245, 1)",
                }}
              >
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold">{card.term}</h3>
                </div>
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-lg"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backgroundColor: "rgba(237, 242, 247, 1)",
                }}
              >
                <div className="p-4 text-center">
                  <p>{card.definition}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
