// FILE: components/TutorialView.tsx
import React, { useState } from 'react';
import { validateTutorialPrompt } from '../services/geminiService';
import { PaperAirplaneIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface TutorialViewProps {
  onComplete: () => void;
}

const TutorialView: React.FC<TutorialViewProps> = ({ onComplete }) => {
  const [prompt, setPrompt] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsChecking(true);
    setFeedback(null);

    try {
      const result = await validateTutorialPrompt(prompt);
      setIsSuccess(result.passed);
      setFeedback(result.feedback);
    } catch (error) {
      setFeedback("Помилка перевірки. Спробуйте ще раз.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-8 text-white text-center">
          <h1 className="text-3xl font-extrabold mb-2">Вхідний тест (Tutorial)</h1>
          <p className="opacity-90">Перед доступом до бази завдань підтвердьте кваліфікацію.</p>
        </div>

        <div className="p-8">
          {/* Instructions */}
          {!isSuccess && (
            <div className="mb-8 space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-800">
                <strong>Увага:</strong> У наступних тестах ми оцінюємо вміння чітко виконувати інструкції.
                Якщо ви проігноруєте хоча б одну вимогу — відповідь не буде зарахована.
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Завдання:</h3>
                <p className="text-gray-700 mb-2">Напиши промпт для AI, який виконує <strong>всі</strong> умови одночасно:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Просить AI <strong>підсумувати</strong> будь-який вхідний текст.</li>
                  <li>Вимагає рівно <strong>3 марковані пункти</strong>.</li>
                  <li><strong>Забороняє</strong> вигадувати інформацію (hallucinations).</li>
                  <li>Вимагає формат <strong>Markdown</strong>.</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-red-50 p-3 rounded text-red-800">
                  <strong className="block mb-1">❌ ЗАБОРОНЕНО:</strong>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Писати сам підсумок</li>
                    <li>Додавати пояснення ("Ось мій промпт...")</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded text-green-800">
                  <strong className="block mb-1">✅ ДОЗВОЛЕНО:</strong>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Тільки чистий текст промпта</li>
                    <li>Використання плейсхолдерів (напр. [TEXT])</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {isSuccess ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
                <CheckCircleIcon className="h-16 w-16 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Тест складено!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Ви чудово впоралися. Ви довели, що вмієте формулювати чіткі інструкції для машини.
                {feedback && <span className="block mt-2 text-indigo-600 font-medium">Коментар AI: {feedback}</span>}
              </p>
              <button
                onClick={onComplete}
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold py-4 px-10 rounded-xl transition-all shadow-lg transform hover:scale-105"
              >
                Перейти до завдань 🚀
              </button>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ваш промпт:
              </label>
              <textarea
                rows={5}
                className={`w-full p-4 rounded-xl border-2 outline-none transition-all font-mono text-sm ${
                  feedback && !isSuccess ? 'border-red-300 bg-red-50 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'
                }`}
                placeholder="Введіть ваш промпт тут..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isChecking}
              />
              
              {/* Feedback Error Message */}
              {feedback && !isSuccess && (
                <div className="mt-3 flex items-start gap-2 text-red-600 bg-white p-3 rounded-lg border border-red-100 shadow-sm animate-pulse">
                  <XCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{feedback}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!prompt.trim() || isChecking}
                className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChecking ? (
                  <>Processing...</>
                ) : (
                  <>
                    Перевірити <PaperAirplaneIcon className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialView;