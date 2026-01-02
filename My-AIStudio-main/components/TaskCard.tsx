
// FILE: components/TaskCard.tsx
import React, { useState } from 'react';
import { Task } from '../types';
import { 
  PaperAirplaneIcon, 
  ShieldExclamationIcon, 
  BriefcaseIcon, 
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid';

interface TaskCardProps {
  task: Task;
  onSubmit: (prompt: string) => void;
  isEvaluating: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onSubmit, isEvaluating }) => {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);

  const MIN_LENGTH = 20;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (prompt.trim().length < MIN_LENGTH) {
      setError(`Промпт занадто короткий. Опишіть вашу інструкцію детальніше (мінімум ${MIN_LENGTH} символів).`);
      return;
    }

    onSubmit(prompt);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Sales': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Marketing': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Support': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Development': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Legal/Compliance': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'Recruiting': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Operations': return 'bg-orange-100 text-orange-800 border-orange-200';
      // Added support for Management role styling
      case 'Management': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskBadge = () => {
    switch (task.risk_type) {
      case 'privacy':
        return (
          <span className="flex items-center gap-1 bg-orange-50 text-orange-700 px-2.5 py-1 rounded border border-orange-200 text-xs font-semibold">
            <ShieldExclamationIcon className="h-3 w-3" />
            Privacy
          </span>
        );
      case 'hallucination':
        return (
          <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-1 rounded border border-purple-200 text-xs font-semibold">
            <ExclamationTriangleIcon className="h-3 w-3" />
            Fact-Check
          </span>
        );
      case 'safety':
        return (
          <span className="flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded border border-red-200 text-xs font-semibold">
            <ShieldExclamationIcon className="h-3 w-3" />
            Safety
          </span>
        );
      default:
        return (
          <span className="bg-gray-50 text-gray-600 px-2.5 py-1 rounded border border-gray-200 text-xs font-medium">
            General Skill
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-3xl w-full mx-auto border border-gray-100 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex gap-2 items-center">
          <span className={`text-xs font-bold px-3 py-1 rounded border flex items-center gap-1.5 shadow-sm ${getRoleColor(task.business_role || 'General')}`}>
            <BriefcaseIcon className="h-3.5 w-3.5" /> 
            {task.business_role || 'General'}
          </span>
          {getRiskBadge()}
        </div>
        <div className="text-xs text-gray-400 font-mono">ID: {task.id}</div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">{task.title}</h2>
      
      <div className="bg-gradient-to-r from-slate-50 to-white p-5 rounded-xl border-l-4 border-indigo-500 mb-8 shadow-sm">
        <p className="text-gray-800 text-lg leading-relaxed font-medium">{task.scenario}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-red-50/80 p-5 rounded-xl border border-red-100">
          <h3 className="font-bold text-red-800 flex items-center gap-2 mb-3 text-sm uppercase tracking-wide">
            <ShieldExclamationIcon className="h-4 w-4"/> Заборонено
          </h3>
          <ul className="space-y-2">
            {(task.constraints || []).map((constraint, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-red-700">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                <span className="leading-snug">{constraint}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-emerald-50/80 p-5 rounded-xl border border-emerald-100">
          <h3 className="font-bold text-emerald-800 flex items-center gap-2 mb-3 text-sm uppercase tracking-wide">
            <CheckBadgeIcon className="h-4 w-4"/> Критерії успіху
          </h3>
          <div className="text-sm text-emerald-800 leading-relaxed p-2 bg-white/50 rounded-lg">
            {task.success_criteria}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="promptInput" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            Ваш системний промпт:
          </label>
          <textarea
            id="promptInput"
            rows={6}
            className={`w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white outline-none transition-all resize-none text-gray-800 shadow-inner font-mono text-sm leading-relaxed ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'}`}
            placeholder="Введіть інструкцію для AI..."
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              if(error) setError(null);
            }}
            disabled={isEvaluating}
          />
          {error && (
            <div className="mt-2 flex items-center gap-2 text-red-600 text-sm font-medium animate-pulse">
              <InformationCircleIcon className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!prompt.trim() || isEvaluating}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 text-lg ${!prompt.trim() || isEvaluating ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'}`}
        >
          {isEvaluating ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              AI-ревізор перевіряє...
            </>
          ) : (
            <>
              Відправити на перевірку
              <PaperAirplaneIcon className="h-5 w-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TaskCard;
