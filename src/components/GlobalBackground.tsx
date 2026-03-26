import React from 'react';

const GlobalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-50 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#A855F710_1px,transparent_1px),linear-gradient(to_bottom,#EC489910_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-linear-to-r from-purple-600 via-violet-600 to-pink-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />

      {/* Glowing atmospheric orbs */}
      <div className="absolute top-0 -left-1/4 w-[50vw] h-[50vw] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute top-1/4 -right-1/4 w-[40vw] h-[40vw] bg-pink-900/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-1/4 left-1/4 w-[60vw] h-[60vw] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Global Noise Overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GlobalBackground;
