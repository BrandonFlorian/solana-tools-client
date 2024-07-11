import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const TestButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative inline-block px-4 py-2 font-bold text-white bg-blue-500 border-2 border-blue-700 rounded overflow-hidden active:outline-none focus:outline-none w-32 h-32"
    >
      <span className="absolute inset-0 flex items-center justify-center transform transition-transform active:translate-x-[2px] active:translate-y-[2px]">
        {children}
      </span>
    </button>
  );
};

export default TestButton;
