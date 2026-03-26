import React from 'react';

const FloatingBrochureButton: React.FC = () => {
  return (
    <div className="absolute top-1/2 right-0 -translate-y-1/2 z-100 flex items-center pointer-events-none">
      <a 
        href="/brochure.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center gap-2 px-4 py-3 sm:px-6 sm:py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 border-r-0 rounded-l-2xl sm:rounded-l-3xl shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 hover:scale-105  pointer-events-auto"
      >
        <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-2xl sm:rounded-l-3xl"></div>
        <span className="hidden sm:block text-sm font-semibold tracking-widest text-white/90 group-hover:text-white whitespace-nowrap uppercase">
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
          className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-pink-300 transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      </a>
    </div>
  );
};

export default FloatingBrochureButton;
