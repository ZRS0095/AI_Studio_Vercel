import React from 'react';
import { EvaluationResult } from '../types';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface ResultViewProps {
  result: EvaluationResult;
  onNext: () => void;
  isLast: boolean;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onNext, isLast }) => {
  const isSecurityFail = result.securityViolation;
  const isPass = result.isSuccess && !isSecurityFail;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl w-full mx-auto border border-gray-100 text-center animate-fade-in">
      <div className="flex justify-center mb-6">
        {isSecurityFail ? (
           <ExclamationTriangleIcon className="h-20 w-20 text-red-500" />
        ) : isPass ? (
          <CheckCircleIcon className="h-20 w-20 text-green-500" />
        ) : (
          <XCircleIcon className="h-20 w-20 text-amber-500" />
        )}
      </div>

      <h2 className="text-3xl font-bold mb-2 text-gray-900">
        {isSecurityFail ? 'Увага! Порушення приватності' : isPass ? 'Чудово!' : 'Треба допрацювати'}
      </h2>
      
      <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
        {result.score}/100
      </div>

      <div className={`p-4 rounded-lg text-left mb-8 ${isPass ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
        <p className="font-medium mb-1">Фідбек:</p>
        <p>{result.feedback}</p>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
      >
        {isLast ? 'Завершити тест' : 'Наступне завдання'}
      </button>
    </div>
  );
};

export default ResultView;