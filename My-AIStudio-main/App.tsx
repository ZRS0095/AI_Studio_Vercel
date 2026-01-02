
// FILE: App.tsx
import React, { useState, useEffect } from 'react';
import { TASKS } from './data';
import { Task, EvaluationResult } from './types';
import { evaluateSubmission } from './services/geminiService';

import TaskCard from './components/TaskCard';
import ResultView from './components/ResultView';
import ProgressBar from './components/ProgressBar';
import Summary from './components/Summary';
import TutorialView from './components/TutorialView';

import { AcademicCapIcon, BoltIcon, ShieldCheckIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const LEVELS = [
  {
    id: 'beginner',
    name: 'LEVEL 1 — AI Beginner',
    desc: 'Базові навички комунікації та сумаризації. (1-7)',
    range: [0, 7], 
    icon: <AcademicCapIcon className="h-8 w-8 text-green-500" />,
    qualification: 'Спеціаліст з AI-комунікацій',
    courseName: 'Основи взаємодії з ШІ та Промпт-інжинірингу'
  },
  {
    id: 'pro',
    name: 'LEVEL 2 — AI Pro',
    desc: 'Складні інструкції, логіка та формати даних. (8-16)',
    range: [7, 16], 
    icon: <BoltIcon className="h-8 w-8 text-amber-500" />,
    qualification: 'Архітектор AI-рішень',
    courseName: 'Професійне використання AI в бізнес-процесах'
  },
  {
    id: 'expert',
    name: 'LEVEL 3 — AI Expert',
    desc: 'Безпека (Safety), приватність та фактчекінг. (17-30)',
    range: [16, 30], 
    icon: <ShieldCheckIcon className="h-8 w-8 text-purple-500" />,
    qualification: 'Експерт зі стратегічного впровадження AI',
    courseName: 'Безпека, Етика та Професійний Аудит AI-систем'
  }
];

interface Toast {
  message: string;
  type: 'success' | 'error';
}

const App: React.FC = () => {
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [started, setStarted] = useState(false);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentResult, setCurrentResult] = useState<EvaluationResult | null>(null);
  const [allResults, setAllResults] = useState<Record<string, EvaluationResult>>({});
  const [allAnswers, setAllAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setToast({ message, type });
  };

  const handleStartLevel = (levelIndex: number) => {
    const level = LEVELS[levelIndex];
    const levelTasks = TASKS.slice(level.range[0], level.range[1]);
    setActiveTasks(levelTasks);
    setCurrentLevelIndex(levelIndex);
    setStarted(true);
  };

  const handleSubmitPrompt = async (prompt: string) => {
    if (!activeTasks[currentTaskIndex]) return;
    setIsEvaluating(true);
    const currentTask = activeTasks[currentTaskIndex];
    setAllAnswers(prev => ({ ...prev, [currentTask.id]: prompt }));

    try {
      const result = await evaluateSubmission(currentTask, prompt);
      setCurrentResult(result);
      setAllResults(prev => ({ ...prev, [currentTask.id]: result }));
    } catch (error) {
      console.error(error);
      showToast("Помилка зв'язку з AI. Спробуйте пізніше.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNext = () => {
    setCurrentResult(null);
    if (currentTaskIndex < activeTasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentTaskIndex(0);
    setCurrentLevelIndex(null);
    setCurrentResult(null);
    setAllResults({});
    setAllAnswers({});
    setIsFinished(false);
  };

  const ToastMessage = () => {
    if (!toast) return null;
    return (
      <div className={`fixed bottom-4 right-4 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border animate-fade-in ${toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
        {toast.type === 'error' ? <XCircleIcon className="h-6 w-6" /> : <CheckCircleIcon className="h-6 w-6" />}
        <span className="font-bold">{toast.message}</span>
        <button onClick={() => setToast(null)} className="ml-2 hover:opacity-50">✕</button>
      </div>
    );
  };

  if (!tutorialCompleted) {
    return <TutorialView onComplete={() => setTutorialCompleted(true)} />;
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl w-full text-center border border-white/20">
          <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner transform -rotate-3 hover:rotate-0 transition-transform">
             <span className="text-5xl">🤖</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">AI Skills Portal</h1>
          <p className="text-gray-500 mb-10 text-xl font-medium">Перевірте свої навички роботи з Gemini 3 Flash</p>
          <div className="grid gap-4">
            {LEVELS.map((level, index) => (
              <button
                key={level.id}
                onClick={() => handleStartLevel(index)}
                className="group flex items-center p-6 bg-slate-50 hover:bg-white border-2 border-transparent hover:border-indigo-500 hover:shadow-xl rounded-2xl transition-all text-left"
              >
                <div className="mr-6 bg-white p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform">{level.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700">{level.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{level.desc}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 text-indigo-600 font-black ml-4">Start →</div>
              </button>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400 text-sm">
            <ShieldCheckIcon className="h-4 w-4" /> Powered by Gemini 3 Flash (Free)
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full">
        {!isFinished && <ProgressBar current={currentTaskIndex} total={activeTasks.length} />}
        {isFinished ? (
          <Summary 
            results={allResults} 
            answers={allAnswers} 
            totalTasks={activeTasks.length} 
            onRestart={handleRestart}
            currentLevel={currentLevelIndex !== null ? LEVELS[currentLevelIndex] : null}
          />
        ) : currentResult ? (
          <ResultView result={currentResult} onNext={handleNext} isLast={currentTaskIndex === activeTasks.length - 1} />
        ) : activeTasks[currentTaskIndex] ? (
          <TaskCard task={activeTasks[currentTaskIndex]} onSubmit={handleSubmitPrompt} isEvaluating={isEvaluating} />
        ) : null}
      </div>
      <ToastMessage />
    </div>
  );
};

export default App;
