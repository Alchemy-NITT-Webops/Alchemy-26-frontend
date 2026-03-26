import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingBrochureButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded) return;

    const startScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (Math.abs(window.scrollY - startScrollY) > 80) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isExpanded]);

  return (
    <div ref={containerRef} className="absolute top-1/2 right-0 -translate-y-1/2 z-100 flex items-center pointer-events-none">
      {/* Desktop Version */}
      <a
        href="https://drive.google.com/file/d/1VVIA53YWAebV-_U9Y85ddetGhQHtkRPg/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex group relative items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 border-r-0 rounded-l-3xl shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 hover:scale-105 pointer-events-auto"
      >
        <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-3xl"></div>
        <span className="text-sm font-semibold tracking-widest text-white/90 group-hover:text-white whitespace-nowrap uppercase">
          Brochure
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-white group-hover:text-pink-300 transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      </a>

      {/* Mobile Version Wrapper */}
      <div className="sm:hidden pointer-events-auto flex items-center relative">
        <motion.div
          initial={{ width: 48, height: 48 }}
          animate={{
            width: isExpanded ? 180 : 48,
            height: isExpanded ? 60 : 48,
            backgroundColor: isExpanded ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.05)'
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="relative overflow-hidden backdrop-blur-md border border-white/10 border-r-0 rounded-l-2xl shadow-[0_0_30px_rgba(168,85,247,0.2)] flex items-center"
        >
          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="absolute inset-0 flex items-center justify-between gap-1.5 px-3 w-[180px]"
              >
                <a
                  href="/brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsExpanded(false)}
                  className="flex flex-col items-start leading-tight flex-1"
                >
                  <div className='flex items-center justify-between w-full p-2 rounded-full border border-white '>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>                    <span className="text-xs font-bold text-white uppercase tracking-widest drop-shadow-md">Brochure</span>
                  </div>
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="flex items-center justify-center p-2 rounded-full hover:bg-white/20 transition-colors bg-white/10 border border-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Icon Button (Not expanded) */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                className="absolute inset-0 flex items-center justify-center w-[48px] h-[48px] hover:bg-white/10 transition-colors"
                aria-label="Expand Brochure"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingBrochureButton;
