import React, { useState } from 'react';
import { REFERENCE_ORGANISMS } from '../data/referenceLibrary';
import { ReferenceOrganism } from '../types';
import { FlaskConical, Filter, RotateCcw, CheckCircle2, XCircle, ArrowRight, ShieldAlert, Sparkles, Layers } from 'lucide-react';

export const BiochemicalMatrixView: React.FC = () => {
  const [gramFilter, setGramFilter] = useState<string>('All');
  const [shapeFilter, setShapeFilter] = useState<string>('All');
  const [catalaseFilter, setCatalaseFilter] = useState<string>('All');
  const [oxidaseFilter, setOxidaseFilter] = useState<string>('All');
  const [coagulaseFilter, setCoagulaseFilter] = useState<string>('All');
  const [indoleFilter, setIndoleFilter] = useState<string>('All');
  const [citrateFilter, setCitrateFilter] = useState<string>('All');
  const [ureaseFilter, setUreaseFilter] = useState<string>('All');
  const [lactoseFilter, setLactoseFilter] = useState<string>('All');

  const [selectedOrganism, setSelectedOrganism] = useState<ReferenceOrganism | null>(null);

  // Reset filters
  const resetFilters = () => {
    setGramFilter('All');
    setShapeFilter('All');
    setCatalaseFilter('All');
    setOxidaseFilter('All');
    setCoagulaseFilter('All');
    setIndoleFilter('All');
    setCitrateFilter('All');
    setUreaseFilter('All');
    setLactoseFilter('All');
  };

  // Match Scoring Function
  const evaluatedOrganisms = REFERENCE_ORGANISMS.map((org) => {
    let totalCriteriaChecked = 0;
    let totalMatched = 0;

    const checkMatch = (filterVal: string, targetVal?: string) => {
      if (filterVal !== 'All') {
        totalCriteriaChecked++;
        if (targetVal && targetVal.toLowerCase().includes(filterVal.toLowerCase())) {
          totalMatched++;
        }
      }
    };

    checkMatch(gramFilter, org.gramReaction);
    checkMatch(shapeFilter, org.shape);
    checkMatch(catalaseFilter, org.biochemicals.catalase);
    checkMatch(oxidaseFilter, org.biochemicals.oxidase);
    checkMatch(coagulaseFilter, org.biochemicals.coagulase);
    checkMatch(indoleFilter, org.biochemicals.indole);
    checkMatch(citrateFilter, org.biochemicals.citrate);
    checkMatch(ureaseFilter, org.biochemicals.urease);
    checkMatch(lactoseFilter, org.biochemicals.lactoseFermentation);

    const matchPercentage = totalCriteriaChecked > 0 
      ? Math.round((totalMatched / totalCriteriaChecked) * 100) 
      : 100;

    return {
      organism: org,
      matchPercentage,
      totalMatched,
      totalCriteriaChecked
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <FlaskConical className="w-4 h-4" /> Diagnostic Flowchart Matrix
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Interactive Biochemical Test Assistant
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Select observed benchtop biochemical test results (Gram reaction, Catalase, Oxidase, Coagulase, Indole, Citrate, Urease) to narrow down bacterial & fungal species candidates in real time.
          </p>
        </div>

        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium flex items-center space-x-2 border border-slate-700 self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Diagnostic Matrix</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Test Controls */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4 h-fit">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
            <Filter className="w-4 h-4 text-emerald-400" /> Observed Biochemical Results
          </h2>

          {/* Gram Stain */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Gram Reaction
            </label>
            <select
              value={gramFilter}
              onChange={(e) => setGramFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Gram Reactions</option>
              <option value="Gram-Positive">Gram-Positive (+ve Purple)</option>
              <option value="Gram-Negative">Gram-Negative (-ve Pink)</option>
              <option value="Fungi">Fungi / Yeast</option>
              <option value="Acid-Fast">Acid-Fast Bacillus</option>
            </select>
          </div>

          {/* Cell Shape */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Microscopic Cell Morphology
            </label>
            <select
              value={shapeFilter}
              onChange={(e) => setShapeFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Shapes</option>
              <option value="Cocci">Cocci (Spherical)</option>
              <option value="Bacilli">Bacilli (Rods)</option>
              <option value="Coccobacilli">Coccobacilli</option>
              <option value="Yeast">Yeast Cells / Pseudohyphae</option>
            </select>
          </div>

          {/* Catalase */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Catalase Test (3% H₂O₂ Effervescence)
            </label>
            <select
              value={catalaseFilter}
              onChange={(e) => setCatalaseFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Catalase Reactions</option>
              <option value="Positive">Positive (Active Bubbling)</option>
              <option value="Negative">Negative (No Bubbles)</option>
            </select>
          </div>

          {/* Oxidase */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Oxidase Test (Cytochrome c)
            </label>
            <select
              value={oxidaseFilter}
              onChange={(e) => setOxidaseFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Oxidase Reactions</option>
              <option value="Positive">Positive (Deep Purple in 10s)</option>
              <option value="Negative">Negative (No Color Change)</option>
            </select>
          </div>

          {/* Coagulase */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Coagulase Test (Plasma Clotting)
            </label>
            <select
              value={coagulaseFilter}
              onChange={(e) => setCoagulaseFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Coagulase Reactions</option>
              <option value="Positive">Positive (Firm Fibrin Clot)</option>
              <option value="Negative">Negative (Liquid Suspension)</option>
            </select>
          </div>

          {/* Indole */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Indole Test (Kovac's Reagent)
            </label>
            <select
              value={indoleFilter}
              onChange={(e) => setIndoleFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Indole Reactions</option>
              <option value="Positive">Positive (Cherry Red Ring)</option>
              <option value="Negative">Negative (Yellow Ring)</option>
            </select>
          </div>

          {/* Citrate */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Citrate Utilization (Simmons Citrate)
            </label>
            <select
              value={citrateFilter}
              onChange={(e) => setCitrateFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Citrate Reactions</option>
              <option value="Positive">Positive (Royal Blue Slant)</option>
              <option value="Negative">Negative (Remains Green)</option>
            </select>
          </div>

          {/* Urease */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Urease Test (Christensen's Urea)
            </label>
            <select
              value={ureaseFilter}
              onChange={(e) => setUreaseFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Urease Reactions</option>
              <option value="Positive">Positive (Bright Pink Turn)</option>
              <option value="Negative">Negative (Yellow Slant)</option>
            </select>
          </div>

          {/* Lactose Fermentation */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Lactose Fermentation (MacConkey)
            </label>
            <select
              value={lactoseFilter}
              onChange={(e) => setLactoseFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Fermentation States</option>
              <option value="Positive">Lactose Fermenter (Pink Colonies)</option>
              <option value="Negative">Non-Lactose Fermenter (Pale/White)</option>
            </select>
          </div>
        </div>

        {/* Right Column: Species Candidate Results */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Correlated Organism Candidates ({evaluatedOrganisms.length})
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              Sorted by Biochemical Match %
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evaluatedOrganisms.map(({ organism, matchPercentage, totalMatched, totalCriteriaChecked }) => (
              <div
                key={organism.id}
                onClick={() => setSelectedOrganism(organism)}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {organism.gramReaction} • {organism.shape}
                      </span>
                      <h3 className="text-base font-bold text-slate-100 italic mt-1 group-hover:text-emerald-400 transition-colors">
                        {organism.name}
                      </h3>
                      <p className="text-xs text-slate-400">{organism.commonName}</p>
                    </div>

                    <div className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${
                      matchPercentage === 100 
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : matchPercentage >= 70
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {matchPercentage}% Match
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {organism.clinicalSummary}
                  </p>
                </div>

                {/* Key Biochemical Tag Summary */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      Catalase: {organism.biochemicals.catalase}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      Oxidase: {organism.biochemicals.oxidase}
                    </span>
                    {organism.biochemicals.coagulase && (
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                        Coag: {organism.biochemicals.coagulase}
                      </span>
                    )}
                    {organism.biochemicals.indole && (
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                        Indole: {organism.biochemicals.indole}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-400 font-medium pt-1">
                    <span>Primary Media: {organism.primaryMedia[0]}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Profile <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Organism Detail Modal */}
      {selectedOrganism && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-400">Species Profile</span>
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
                <h4 className="font-bold text-slate-200 uppercase mb-1">Clinical Overview</h4>
                <p className="text-slate-300 leading-relaxed">{selectedOrganism.clinicalSummary}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-slate-500 font-semibold block">Primary Isolation Media</span>
                  <span className="text-slate-200 font-medium">{selectedOrganism.primaryMedia.join(', ')}</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-slate-500 font-semibold block">Biosafety Level</span>
                  <span className="text-emerald-400 font-bold">{selectedOrganism.biosafetyLevel}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 uppercase mb-1">Colony Morphology</h4>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <p><strong className="text-slate-300">Colony Color:</strong> {selectedOrganism.colonyTraits.color}</p>
                  <p><strong className="text-slate-300">Form & Elevation:</strong> {selectedOrganism.colonyTraits.form}, {selectedOrganism.colonyTraits.elevation}</p>
                  <p><strong className="text-slate-300">Key Feature:</strong> {selectedOrganism.colonyTraits.uniqueFeature}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 uppercase mb-1">Biochemical Test Reaction Profile</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                    <span className="text-slate-500 block text-[10px]">Catalase</span>
                    <span className="font-bold text-slate-200">{selectedOrganism.biochemicals.catalase}</span>
                  </div>
                  <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                    <span className="text-slate-500 block text-[10px]">Oxidase</span>
                    <span className="font-bold text-slate-200">{selectedOrganism.biochemicals.oxidase}</span>
                  </div>
                  <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                    <span className="text-slate-500 block text-[10px]">Coagulase</span>
                    <span className="font-bold text-slate-200">{selectedOrganism.biochemicals.coagulase || 'N/A'}</span>
                  </div>
                  <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                    <span className="text-slate-500 block text-[10px]">Indole</span>
                    <span className="font-bold text-slate-200">{selectedOrganism.biochemicals.indole || 'N/A'}</span>
                  </div>
                  <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                    <span className="text-slate-500 block text-[10px]">Citrate</span>
                    <span className="font-bold text-slate-200">{selectedOrganism.biochemicals.citrate || 'N/A'}</span>
                  </div>
                  <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                    <span className="text-slate-500 block text-[10px]">Urease</span>
                    <span className="font-bold text-slate-200">{selectedOrganism.biochemicals.urease || 'N/A'}</span>
                  </div>
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
