import React, { useState } from 'react';
import { ClinicalQuizCase } from '../types';
import { GraduationCap, Sparkles, CheckCircle2, XCircle, RefreshCw, BookOpen, Award, ArrowRight } from 'lucide-react';

const PRESET_QUIZ_CASES: ClinicalQuizCase[] = [
  {
    caseTitle: 'Case 1: Burn Wound Sepsis',
    patientVignette: 'A 38-year-old male burn unit patient develops high fever (39.2°C) and purulent green exudate at his graft site. Blood culture bottle signals positive after 18 hours.',
    specimenType: 'Burn Exudate Swab / Blood Culture',
    agarMediumUsed: 'Nutrient Agar & MacConkey Agar',
    colonyDescription: 'Flat, spreading colonies with a metallic iridescent sheen and a prominent blue-green pigment diffusing into the agar. Distinct sweet grape-like odor.',
    gramStainResult: 'Gram-negative slender rods',
    initialBiochemicals: 'Oxidase (+), Non-lactose fermenter on MacConkey, Motile, Growth at 42°C.',
    options: ['Escherichia coli', 'Pseudomonas aeruginosa', 'Klebsiella pneumoniae', 'Proteus mirabilis'],
    correctOptionIndex: 1,
    explanation: 'Pseudomonas aeruginosa produces characteristic pyocyanin (blue) and pyoverdine (yellow-green) diffusible pigments, possesses cytochrome oxidase, and is a non-lactose fermenter.',
    clinicalPearls: [
      'Intrinsic resistance to many standard beta-lactams.',
      'Pyocyanin generates reactive oxygen species damaging host tissue.',
      'Classic cause of ecthyma gangrenosum in neutropenic patients.'
    ]
  },
  {
    caseTitle: 'Case 2: Neonatal Meningitis',
    patientVignette: 'A 4-day-old newborn presents with lethargy, poor feeding, bulging fontanelle, and fever. Lumbar puncture yields cloudy CSF.',
    specimenType: 'Cerebrospinal Fluid (CSF)',
    agarMediumUsed: '5% Sheep Blood Agar',
    colonyDescription: 'Small, pinpoint, smooth colonies surrounded by a narrow zone of beta-hemolysis.',
    gramStainResult: 'Gram-positive cocci in short chains and pairs',
    initialBiochemicals: 'Catalase (-), CAMP Test positive (arrowhead hemolysis with S. aureus), Hippurate hydrolysis positive.',
    options: ['Streptococcus pyogenes', 'Streptococcus agalactiae (Group B)', 'Listeria monocytogenes', 'Enterococcus faecalis'],
    correctOptionIndex: 1,
    explanation: 'Streptococcus agalactiae (Group B Streptococcus / GBS) is a leading cause of neonatal sepsis and meningitis. It is CAMP test positive and hydrolyzes sodium hippurate.',
    clinicalPearls: [
      'Maternal rectovaginal screening recommended at 36-37 weeks gestation.',
      'Intrapartum penicillin prophylaxis prevents early-onset GBS disease.',
      'Narrow beta-hemolysis compared to wide zone of Group A Strep.'
    ]
  }
];

export const LabCaseQuizView: React.FC = () => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [currentCase, setCurrentCase] = useState<ClinicalQuizCase>(PRESET_QUIZ_CASES[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [totalAttempted, setTotalAttempted] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleSelectOption = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setTotalAttempted((prev) => prev + 1);
    if (index === currentCase.correctOptionIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextPreset = () => {
    const nextIdx = (currentCaseIndex + 1) % PRESET_QUIZ_CASES.length;
    setCurrentCaseIndex(nextIdx);
    setCurrentCase(PRESET_QUIZ_CASES[nextIdx]);
    setSelectedAnswer(null);
  };

  const handleGenerateAICase = async () => {
    setIsGenerating(true);
    setSelectedAnswer(null);

    try {
      const response = await fetch('/api/generate-ai-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty: 'Intermediate' })
      });

      const data = await response.json();
      if (data.success && data.data) {
        setCurrentCase(data.data);
      }
    } catch (err) {
      console.error('Failed to generate AI case:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <GraduationCap className="w-4 h-4" /> Diagnostic Case Simulator
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Microbiology Case Quiz & Spotter Challenge
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Test your diagnostic skills on clinical patient vignettes, agar colony descriptions, and benchtop test results.
          </p>
        </div>

        {/* Score & AI Case Button */}
        <div className="flex items-center space-x-4 self-start md:self-center">
          <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Score</p>
            <p className="text-sm font-bold text-emerald-400">{score} / {totalAttempted}</p>
          </div>

          <button
            onClick={handleGenerateAICase}
            disabled={isGenerating}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-2 shadow-lg disabled:opacity-50"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>Generate New AI Case</span>
          </button>
        </div>
      </div>

      {/* Case Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-100">{currentCase.caseTitle}</h2>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-semibold">
            Specimen: {currentCase.specimenType}
          </span>
        </div>

        {/* Patient Vignette */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Clinical Vignette & History</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{currentCase.patientVignette}</p>
        </div>

        {/* Lab Findings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Isolation Medium</span>
            <span className="font-semibold text-slate-200">{currentCase.agarMediumUsed}</span>
          </div>
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Gram Stain Reaction</span>
            <span className="font-semibold text-emerald-400">{currentCase.gramStainResult}</span>
          </div>
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Benchtop Test Results</span>
            <span className="font-semibold text-slate-200">{currentCase.initialBiochemicals}</span>
          </div>
        </div>

        {/* Colony Description */}
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-xs space-y-1">
          <span className="font-bold text-slate-300">Colony Morphology Observation:</span>
          <p className="text-slate-400 leading-relaxed">{currentCase.colonyDescription}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Which microorganism is the most likely cause?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentCase.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentCase.correctOptionIndex;
              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

              if (selectedAnswer !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span className="italic">{opt}</span>
                  {selectedAnswer !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {selectedAnswer !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Section */}
        {selectedAnswer !== null && (
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3 text-xs animate-fadeIn">
            <div className="flex items-center space-x-2 font-bold text-sm">
              {selectedAnswer === currentCase.correctOptionIndex ? (
                <span className="text-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Correct Answer!</span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1.5"><XCircle className="w-4 h-4" /> Incorrect</span>
              )}
            </div>
            <p className="text-slate-300 leading-relaxed">{currentCase.explanation}</p>

            <div className="pt-2 border-t border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 block">Clinical Pearls:</span>
              <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                {currentCase.clinicalPearls.map((pearl, i) => (
                  <li key={i}>{pearl}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={handleNextPreset}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5"
              >
                <span>Next Case Challenge</span> <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
