import React from 'react';

export default function Logo({ size = 'md', isDark = false, className = '' }) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center gap-2 font-extrabold tracking-tight select-none cursor-pointer ${className}`}>
      {/* Visual Stylized SVG Logo matching user reference */}
      <div className={`relative flex items-center justify-center ${iconSizes[size] || 'w-8 h-8'} rounded-xl bg-gradient-to-br from-[#2563FF] to-[#7B3FF2] p-1.5 shadow-md shadow-blue-500/20 text-white font-bold transition-transform hover:scale-105`}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M5 15.5V9C5 6.23858 7.23858 4 10 4H10C12.7614 4 15 6.23858 15 9V15.5"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M15 9L15 4M11.5 6.5L15 3L18.5 6.5"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className={`font-black tracking-tight leading-none ${sizeClasses[size] || 'text-2xl'}`}>
        <span className={isDark ? 'text-white' : 'text-[#0C1435]'}>Step</span>
        <span className="bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] bg-clip-text text-transparent">Up</span>
      </div>
    </div>
  );
}
