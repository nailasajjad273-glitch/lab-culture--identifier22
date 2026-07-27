import React, { useState } from 'react';
import { REFERENCE_ORGANISMS } from '../data/referenceLibrary';
import { ReferenceOrganism } from '../types';
import { BookOpen, Search, Filter, ShieldCheck, Microscope, FlaskConical, Stethoscope } from 'lucide-react';

export const ReferenceAtlasView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGram, setSelectedGram] = useState<string>('All');
  const [selectedOrganism, setSelectedOrganism] = useState<ReferenceOrganism | null>(null);

  const filteredOrganisms = REFERENCE_ORGANISMS.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.commonInfections.some((inf) => inf.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesGram =
      selectedGram === 'All' || org.gramReaction.toLowerCase() === selectedGram.toLowerCase();

    return matchesSearch && matchesGram;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <BookOpen className="w-4 h-4" /> Reference Microbiology Atlas
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Clinical Pathogen & Agar Culture Library
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Explore detailed colony morphology descriptions, biochemical profiles, primary growth media preferences, and clinical significance for major human bacterial and fungal pathogens.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search organism name, disease, or trait..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          {['All', 'Gram-Positive', 'Gram-Negative', 'Fungi', 'Acid-Fast'].map((gram) => (
            <button
              key={gram}
              onClick={() => setSelectedGram(gram)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedGram === gram
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {gram}
            </button>
          ))}
        </div>
      </div>

      {/* Organisms Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrganisms.map((org) => (
          <div
            key={org.id}
            onClick={() => setSelectedOrganism(org)}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {org.gramReaction} • {org.shape}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 italic mt-1 group-hover:text-emerald-400 transition-colors">
                    {org.name}
                  </h3>
                  <p className="text-xs text-slate-400">{org.commonName}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                  org.biosafetyLevel === 'BSL-3' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {org.biosafetyLevel}
                </span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {org.clinicalSummary}
              </p>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Primary Growth Media</span>
                <span className="text-slate-200 font-medium">{org.primaryMedia.join(', ')}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center space-x-1.5 text-amber-400 font-medium">
                <Stethoscope className="w-3.5 h-3.5" />
                <span className="truncate">{org.commonInfections.slice(0, 2).join(', ')}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedOrganism(org);
                }}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
              >
                View Full Colony & Biochemical Specs
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedOrganism && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-400">Reference Organism Spec</span>
                <h2 className="text-2xl font-bold text-slate-100 italic">{selectedOrganism.name}</h2>
                <p className="text-xs text-slate-400">{selectedOrganism.commonName} • {selectedOrganism.category}</p>
              </div>
              <button
                onClick={() => setSelectedOrganism(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-200 uppercase mb-1">Clinical Overview & Pathogenicity</h4>
                <p className="text-slate-300 leading-relaxed">{selectedOrganism.clinicalSummary}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 uppercase mb-1">Common Associated Diseases</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedOrganism.commonInfections.map((inf, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-lg">
                      • {inf}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 uppercase mb-1">Colony Trait Specs</h4>
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                  <p><strong className="text-slate-300">Colony Color & Pigment:</strong> {selectedOrganism.colonyTraits.color}</p>
                  <p><strong className="text-slate-300">Form & Margin:</strong> {selectedOrganism.colonyTraits.form}, {selectedOrganism.colonyTraits.margin}</p>
                  <p><strong className="text-slate-300">Hemolysis:</strong> {selectedOrganism.colonyTraits.hemolysis || 'N/A'}</p>
                  <p><strong className="text-slate-300">Diagnostic Feature:</strong> {selectedOrganism.colonyTraits.uniqueFeature}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedOrganism(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
