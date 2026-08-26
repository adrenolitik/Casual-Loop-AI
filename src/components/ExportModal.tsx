import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  FileText, 
  Share2, 
  Database, 
  Printer 
} from 'lucide-react';
import { CausalStudy } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  study: CausalStudy;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, study }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownload = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const jsonStudyData = JSON.stringify(study, null, 2);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Экспорт исследования OmniCausal</h3>
              <p className="text-xs text-slate-400">Сохраните структуру диаграммы или научную публикацию</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {/* JSON Export */}
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">JSON Схема причинного графа</h4>
                <p className="text-[11px] text-slate-400">Полная модель: узлы, полярности связей, петли и координаты</p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => handleCopy(jsonStudyData, 'json')}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs transition"
                title="Копировать"
              >
                {copiedType === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => handleDownload(jsonStudyData, `${study.id}.json`, 'application/json')}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition"
              >
                Скачать JSON
              </button>
            </div>
          </div>

          {/* Markdown Paper Export */}
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Научный отчет в Markdown (.md)</h4>
                <p className="text-[11px] text-slate-400">Готовая академическая статья с таблицами и выводами</p>
              </div>
            </div>
            <button
              onClick={() => handleDownload(study.scientificPaper?.introduction || '', `${study.id}-paper.md`, 'text/markdown')}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition"
            >
              Скачать .md
            </button>
          </div>

          {/* Printable Layout */}
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Печать / Сохранить в PDF</h4>
                <p className="text-[11px] text-slate-400">Форматированная версия для печати через диалог браузера</p>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition cursor-pointer"
            >
              Печать (Ctrl+P)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
