import React from 'react';

interface InputFieldProps {
  label: string;
  children: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({ label, children }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-neon-blue text-xs uppercase tracking-widest font-bold font-display ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
        <div className="relative bg-cyber-black rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};
