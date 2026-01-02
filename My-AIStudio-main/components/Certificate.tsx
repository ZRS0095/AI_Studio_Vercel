// FILE: components/Certificate.tsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

interface CertificateProps {
  userName: string;
  score: number;
  onBack?: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ userName, score, onBack }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Certificate_${userName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Certificate download failed", error);
      alert("Не вдалося зберегти сертифікат.");
    } finally {
      setIsDownloading(false);
    }
  };

  const currentDate = new Date().toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col items-center gap-8 my-8 px-4">
      {onBack && (
        <button 
          onClick={onBack}
          className="self-start text-indigo-600 font-medium hover:underline mb-[-20px]"
        >
          ← Назад
        </button>
      )}

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isDownloading ? (
          <span className="animate-pulse">Генеруємо PDF...</span>
        ) : (
          <>
            <ArrowDownTrayIcon className="h-6 w-6" />
            Завантажити Сертифікат (PDF)
          </>
        )}
      </button>

      <div className="w-full overflow-x-auto p-4 md:p-8 bg-slate-200 rounded-xl border border-slate-300 shadow-inner flex justify-center">
        <div
          ref={certificateRef}
          className="relative bg-white text-gray-900 shadow-2xl flex-shrink-0"
          style={{ width: '297mm', height: '210mm', padding: '0', boxSizing: 'border-box' }}
        >
          {/* Декоративний фон */}
          <div className="absolute inset-0" style={{
             background: `radial-gradient(circle at 50% 50%, #ffffff 20%, #f0f4f8 100%)`,
             border: '15px solid #fff'
          }}></div>
          
          <div className="absolute inset-6 border-[3px] border-indigo-900 opacity-20 pointer-events-none"></div>
          <div className="absolute inset-8 border border-indigo-900 opacity-10 pointer-events-none"></div>

          <div className="relative h-full flex flex-col items-center justify-between py-16 z-10">
            <div className="text-center mt-4">
              <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-indigo-50 rounded-full border border-indigo-100">
                <span className="text-3xl">🎓</span> 
                <span className="text-xl font-bold text-indigo-900 tracking-widest uppercase">AI Skills Academy</span>
              </div>
              <h1 className="text-6xl font-serif font-bold text-gray-800 tracking-wide mb-2">СЕРТИФІКАТ</h1>
              <p className="text-lg text-indigo-500 font-medium tracking-[0.3em] uppercase">про підтвердження кваліфікації</p>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center w-full">
              <p className="text-gray-500 text-xl italic mb-6">Цим засвідчується, що</p>
              <h2 className="text-7xl font-serif font-bold text-indigo-800 mb-8 border-b-2 border-indigo-100 pb-4 px-12 min-w-[50%] text-center">{userName}</h2>
              <p className="text-2xl text-gray-700 max-w-4xl text-center leading-relaxed font-light">
                успішно пройшов(-ла) практичний курс та склав(-ла) фінальне тестування за напрямом:
              </p>
              <h3 className="text-4xl font-bold text-gray-900 mt-6 mb-8 text-center max-w-5xl">«Промпт-інжиніринг та основи взаємодії з ШІ»</h3>
              <div className="bg-indigo-600 text-white px-10 py-3 rounded-full shadow-lg">
                <p className="font-bold text-xl tracking-wide">Результат: {score}/100 балів • Рівень: PRO</p>
              </div>
            </div>

            <div className="w-full flex justify-between items-end px-24 mb-4">
              <div className="text-left">
                <p className="text-gray-400 text-sm uppercase tracking-wide mb-1">Дата видачі</p>
                <p className="text-xl font-bold text-gray-800">{currentDate}</p>
              </div>
              <div className="flex flex-col items-center opacity-60">
                <div className="w-20 h-20 border-2 border-dashed border-gray-400 flex items-center justify-center bg-gray-50 rounded-lg mb-1">
                  <span className="text-gray-400 font-mono text-xs">QR CODE</span>
                </div>
                <p className="text-[10px] font-mono tracking-wider text-gray-400">ID: {Date.now().toString().slice(-10)}</p>
              </div>
              <div className="text-right">
                <div className="w-64 h-px bg-gray-300 mb-4"></div>
                <p className="text-xl font-bold text-gray-800">Головний Інструктор</p>
                <p className="text-sm text-indigo-600 font-medium">AI Skills Academy Ukraine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;