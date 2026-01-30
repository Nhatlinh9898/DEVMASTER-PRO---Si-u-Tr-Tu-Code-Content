import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-12 md:py-20 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Abstract Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[200%] bg-gradient-to-b from-purple-900/10 via-transparent to-transparent blur-3xl -z-10 pointer-events-none" />
      
      <div className="text-center px-4 relative z-10">
        <h2 className="text-neon-blue font-body tracking-[0.3em] text-sm md:text-base uppercase mb-4 animate-pulse-slow">
          Thien Master AI System • v32.0
        </h2>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-blue to-neon-purple drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">
          DEVMASTER PRO
        </h1>
        <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Kiến tạo <span className="text-white font-semibold">Code Thực Chiến</span> & <span className="text-white font-semibold">Content Triệu Đô</span> cho giới công nghệ.
        </p>
      </div>
      
      {/* Decorative Line */}
      <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-blue mt-10 rounded-full box-shadow-[0_0_10px_#fff]" />
    </header>
  );
};

export default Header;
