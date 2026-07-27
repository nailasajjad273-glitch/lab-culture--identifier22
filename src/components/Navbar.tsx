import React from 'react';
import { TabType } from '../types';
import { Microscope, FlaskConical, Disc3, BookOpen, GraduationCap, FileSpreadsheet, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  savedReportsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, savedReportsCount }) => {
  const tabs = [
    { id: 'identifier' as TabType, label: 'AI Visual Identifier', icon: Microscope, badge: 'AI Powered' },
    { id: 'matrix' as TabType, label: 'Biochemical Matrix', icon: FlaskConical },
    { id: 'ast' as TabType, label: 'AST Zone Calculator', icon: Disc3 },
    { id: 'atlas' as TabType, label: 'Reference Culture Atlas', icon: BookOpen },
    { id: 'quiz' as TabType, label: 'Diagnostic Quiz', icon: GraduationCap },
    { id: 'reports' as TabType, label: 'Lab Reports', icon: FileSpreadsheet, count: savedReportsCount }
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('identifier')}>
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl shadow-lg shadow-emerald-500/20 text-white">
              <Microscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-100 tracking-tight">Lab Culture</span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Vision
                </span>
              </div>
              <p className="text-xs text-slate-400">Microbiology & Pathogen Identifier</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded uppercase">
                      {tab.badge}
                    </span>
                  )}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs font-bold bg-slate-700 text-slate-200 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto py-2.5 no-scrollbar border-t border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
