import React from 'react';
import { 
  Network, 
  Sparkles, 
  Play, 
  FileText, 
  Activity, 
  Download, 
  PlusCircle, 
  Bot, 
  Layers,
  BookOpen
} from 'lucide-react';
import { CausalStudy } from '../types';
import { BENCHMARK_STUDIES } from '../data/benchmarks';

interface NavbarProps {
  currentStudy: CausalStudy;
  activeTab: 'canvas' | 'simulation' | 'paper' | 'timeline' | 'leverage';
  setActiveTab: (tab: 'canvas' | 'simulation' | 'paper' | 'timeline' | 'leverage') => void;
  onSelectBenchmark: (study: CausalStudy) => void;
  onOpenNewStudy: () => void;
  onOpenExport: () => void;
  onOpenCopilot: () => void;
  isInvestigating: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStudy,
  activeTab,
  setActiveTab,
  onSelectBenchmark,
  onOpenNewStudy,
  onOpenExport,
  onOpenCopilot,
  isInvestigating,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Network className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                  OmniCausal
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AI Scientist
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
                {currentStudy.title}
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              id="tab-canvas"
              onClick={() => setActiveTab('canvas')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'canvas'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>CLD Диаграмма</span>
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-slate-900/60 text-slate-300 font-mono">
                {currentStudy.nodes.length}
              </span>
            </button>

            <button
              id="tab-simulation"
              onClick={() => setActiveTab('simulation')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'simulation'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Симуляция</span>
            </button>

            <button
              id="tab-leverage"
              onClick={() => setActiveTab('leverage')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'leverage'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Точки воздействия</span>
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-amber-500/20 text-amber-300 font-mono">
                {currentStudy.loops.length} петель
              </span>
            </button>

            <button
              id="tab-paper"
              onClick={() => setActiveTab('paper')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'paper'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Научный отчет</span>
            </button>

            <button
              id="tab-timeline"
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'timeline'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Пайплайн агента</span>
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2">
            {/* Benchmark Dropdown */}
            <div className="relative group">
              <select
                id="benchmark-selector"
                onChange={(e) => {
                  const found = BENCHMARK_STUDIES.find((b) => b.id === e.target.value);
                  if (found) onSelectBenchmark(found);
                }}
                value={currentStudy.id}
                className="bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-700 px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer max-w-[140px] sm:max-w-none"
              >
                <option value="" disabled>Примеры исследований...</option>
                {BENCHMARK_STUDIES.map((study) => (
                  <option key={study.id} value={study.id}>
                    {study.title.slice(0, 36)}...
                  </option>
                ))}
              </select>
            </div>

            {/* New Autonomous Investigation */}
            <button
              id="btn-new-study"
              onClick={onOpenNewStudy}
              disabled={isInvestigating}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Новое исследование</span>
              <span className="sm:hidden">Создать</span>
            </button>

            {/* AI Co-pilot Critique */}
            <button
              id="btn-open-copilot"
              onClick={onOpenCopilot}
              title="AI Рецензент и Ко-пилот модели"
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </button>

            {/* Export */}
            <button
              id="btn-open-export"
              onClick={onOpenExport}
              title="Экспорт исследования"
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-950 border-t border-slate-800 py-1.5 px-2">
        <button
          onClick={() => setActiveTab('canvas')}
          className={`text-xs px-2 py-1 rounded ${activeTab === 'canvas' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
        >
          Диаграмма
        </button>
        <button
          onClick={() => setActiveTab('simulation')}
          className={`text-xs px-2 py-1 rounded ${activeTab === 'simulation' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
        >
          Симуляция
        </button>
        <button
          onClick={() => setActiveTab('leverage')}
          className={`text-xs px-2 py-1 rounded ${activeTab === 'leverage' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          Рычаги
        </button>
        <button
          onClick={() => setActiveTab('paper')}
          className={`text-xs px-2 py-1 rounded ${activeTab === 'paper' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
        >
          Отчет
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`text-xs px-2 py-1 rounded ${activeTab === 'timeline' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
        >
          Агент
        </button>
      </div>
    </header>
  );
};
