import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase mb-1">
        <span>Завдання {current + 1} з {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;