import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="relative border-b border-violet-900/50 group"
    >
      {/* Subtle background glow for active item */}
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-r from-violet-900/20 to-fuchsia-900/20 blur-xl transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-50"
        }`}
      />

      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 md:py-8 text-left focus:outline-none"
      >
        <h3
          className={`text-lg md:text-2xl font-medium tracking-wide transition-colors duration-300 ${
            isOpen ? "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400" : "text-gray-200"
          }`}
        >
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className={`ml-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-violet-800/50 transition-colors duration-300 ${
            isOpen ? "bg-violet-900/30 border-pink-500/50 text-pink-400" : "bg-transparent text-violet-400 group-hover:border-violet-500"
          }`}
        >
          <Plus size={20} strokeWidth={1.5} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 md:pb-8 text-sm md:text-base text-violet-200/70 leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function AlchemyFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "When and where is Alchemy 2026 taking place?",
      answer: "Alchemy 2026 will be hosted entirely on the NIT Trichy campus. Detailed venue information for individual workshops and flagship events will be updated on the schedule page closer to the symposium dates.",
    },
    {
      question: "Who is eligible to participate?",
      answer: "The symposium is open to all engineering students across India. While events are curated with chemical engineering and interdisciplinary tech in mind, anyone with a passion for innovation is welcome to register.",
    },
    {
      question: "Are there any prerequisites for the technical workshops?",
      answer: "Most workshops are designed to be beginner-friendly, taking you from the basics to advanced concepts. Any specific software requirements or prerequisites will be explicitly mentioned on the individual workshop registration pages.",
    },
    {
      question: "How does the registration process work?",
      answer: "You can purchase an all-access pass or register for individual events through our dedicated portal. Early bird registrations will unlock exclusive access to premium guest lectures and limited-capacity workshops.",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-20 md:px-8 lg:px-16 flex flex-col items-center justify-center font-sans selection:bg-pink-500/30">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-20 text-center md:text-left">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-pink-500 font-semibold tracking-widest uppercase text-sm mb-3"
          >
            Clear the air
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500">
              Questions
            </span>
          </motion.h2>
        </div>

        {/* Accordion List */}
        <div className="border-t border-violet-900/50">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}