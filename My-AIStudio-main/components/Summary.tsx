// FILE: components/Summary.tsx
import React, { useState } from 'react';
import { EvaluationResult, FinalReport } from '../types';
import { generateFinalReport } from '../services/geminiService';
import { TASKS } from '../data';
import Certificate from './Certificate';

interface SummaryProps {
  results: Record<string, EvaluationResult>;
  answers: Record<string, string>;
  totalTasks: number;
  onRestart: () => void;
  currentLevel?: any; // <--- ДОДАНО: Тепер компонент приймає цей параметр і не ламає збірку
}

const Summary: React.FC<SummaryProps> = ({ results, answers, totalTasks, onRestart, currentLevel }) => {
  const [report, setReport] = useState<FinalReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [userName, setUserName] = useState("Студент AI Academy");

  const resultValues = Object.values(results) as EvaluationResult[];
  
  const safeTotal = totalTasks > 0 ? totalTasks : 1;
  const simpleTotalScore = resultValues.reduce((acc, curr) => acc + curr.score, 0);
  const averageScore = Math.round(simpleTotalScore / safeTotal);
  const passedCount = resultValues.filter(r => r.isSuccess && !r.securityViolation).length;

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const data = await generateFinalReport(TASKS, answers);
      setReport(data);
    } catch (e) {
      console.error(e);
      alert("Не вдалося згенерувати детальний звіт.");
    } finally {
      setLoading(false);
    }
  };

  if (showCertificate) {
    return (
      <Certificate 
        userName={userName} 
        score={averageScore} 
        onBack={() => setShowCertificate(false)} 
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full mx-auto text-center animate-fade-in my-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Результати тесту</h1>
      {currentLevel && (
        <p className="text-indigo-600 font-medium mb-4 uppercase tracking-wide">
          {currentLevel.name}
        </p>
      )}
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-indigo-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm uppercase">Середній бал</p>
          <p className="text-4xl font-bold text-indigo-600">{averageScore}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm uppercase">Успішно пройдено</p>
          <p className="text-4xl font-bold text-green-600">{passedCount}/{totalTasks}</p>
        </div>
      </div>

      <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Отримати сертифікат</h3>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <input 
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full sm:w-auto flex-1 p-3 border border-gray-300 rounded-lg text-center sm:text-left focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Введіть ваше ім'я та прізвище"
          />
          <button
            onClick={() => setShowCertificate(true)}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>📜</span> Відкрити сертифікат
          </button>
        </div>
      </div>

      {!report && (
        <div className="mb-8 border-t border-gray-100 pt-6">
          <p className="text-gray-600 mb-4">Бажаєте детальний аналіз помилок?</p>
          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md disabled:bg-gray-400 flex items-center justify-center mx-auto gap-2"
          >
            {loading ? "Аналізуємо..." : "Отримати звіт від AI-ментора"}
          </button>
        </div>
      )}

      {report && (
        <div className="text-left bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Детальний аналіз</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
              <h3 className="font-bold text-green-700 mb-2">💪 Сильні сторони</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">{report.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
              <h3 className="font-bold text-red-700 mb-2">⚠️ Слабкі сторони</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">{report.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
            </div>
          </div>
           <div className="bg-indigo-50 p-4 rounded-lg mb-6 border border-indigo-100">
            <h3 className="font-bold text-indigo-800 mb-2">💡 Рекомендації</h3>
            <ul className="list-disc pl-5 space-y-1 text-indigo-900 text-sm">{report.recommendations.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </div>
        </div>
      )}

      <button onClick={onRestart} className="text-gray-500 hover:text-gray-900 font-semibold underline">Пройти тест знову</button>
    </div>
  );
};

export default Summary;