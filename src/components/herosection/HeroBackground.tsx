import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-1 bg-[#0a0a0a] overflow-hidden pointer-events-none">
      {/* Central glowing focal point */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0,rgba(10,10,10,0)_70%)] rounded-full mix-blend-screen mix-blend-mode"></div>
      
      {/* Animated light pillars */}
      <div className="absolute top-0 left-[15%] w-px h-[150%] -translate-y-[25%] bg-linear-to-b from-transparent via-purple-500/30 to-transparent rotate-25 blur-[1px]"></div>
      <div className="absolute top-0 left-[50%] w-[2px] h-[150%] -translate-y-[15%] bg-linear-to-b from-transparent via-pink-500/20 to-transparent rotate-25 blur-[2px]"></div>
      <div className="absolute top-0 right-[15%] w-px h-[150%] -translate-y-[35%] bg-linear-to-b from-transparent via-blue-500/30 to-transparent rotate-25 blur-[1px]"></div>

    </div>
  );
};

export default HeroBackground;
