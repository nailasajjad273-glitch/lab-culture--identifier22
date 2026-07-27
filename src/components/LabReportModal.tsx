import React from 'react';
import { CultureIdentificationResult } from '../types';
import { Printer, Download, CheckCircle2, ShieldCheck, Microscope, X } from 'lucide-react';

interface LabReportModalProps {
  result: CultureIdentificationResult;
  onClose: () => void;
}

export const LabReportModal: React.FC<LabReportModalProps> = ({ result, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none print:p-0 print:bg-white print:text-slate-900">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Official Clinical Report Content */}
        <div className="space-y-6 print:text-black">
          
          {/* Header */}
          <div className="border-b border-slate-800 print:border-slate-300 pb-5 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Microscope className="w-6 h-6 text-emerald-400 print:text-emerald-700" />
                <h1 className="text-xl font-bold text-slate-100 print:text-slate-900 tracking-tight">
                  CLINICAL MICROBIOLOGY LABORATORY REPORT
                </h1>
              </div>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
                Diagnostic Culture Identification & Pathogen Analysis
              </p>
            </div>

            <div className="text-right text-xs text-slate-400 print:text-slate-600 space-y-0.5">
              <p><strong className="text-slate-200 print:text-slate-900">Report ID:</strong> {result.id}</p>
              <p><strong className="text-slate-200 print:text-slate-900">Date:</strong> {result.timestamp}</p>
            </div>
          </div>

          {/* Specimen Metadata Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 print:bg-slate-100 p-4 rounded-xl border border-slate-800 print:border-slate-300">
            <div>
              <span className="text-[10px] text-slate-500 print:text-slate-600 block uppercase font-bold">Specimen Source</span>
              <span className="font-semibold text-slate-200 print:text-slate-900">{result.specimenSource || 'Wound Swab'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 print:text-slate-600 block uppercase font-bold">Isolation Medium</span>
              <span className="font-semibold text-slate-200 print:text-slate-900">{result.agarMedium || 'Blood Agar'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 print:text-slate-600 block uppercase font-bold">Biosafety Alert</span>
              <span className="font-bold text-emerald-400 print:text-emerald-700">{result.biosafetyLevel}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 print:text-slate-600 block uppercase font-bold">AI Match Score</span>
              <span className="font-extrabold text-emerald-400 print:text-emerald-700">{result.confidenceScore}%</span>
            </div>
          </div>

          {/* Primary Result Banner */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 print:bg-emerald-50 print:border-emerald-300 rounded-xl space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-400 print:text-emerald-800">Primary Culture Identification</span>
            <h2 className="text-2xl font-extrabold text-slate-100 print:text-slate-900 italic">
              {result.organismName}
            </h2>
            <p className="text-xs text-slate-300 print:text-slate-700 font-medium">
              Common Name: {result.commonName} • Category: {result.category}
            </p>
          </div>

          {/* Colony Morphology Grid */}
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-slate-200 print:text-slate-900 uppercase">Colony Visual Morphology</h3>
            <div className="grid grid-cols-3 gap-2 bg-slate-950 print:bg-slate-50 p-3 rounded-xl border border-slate-800 print:border-slate-300">
              <p><strong className="text-slate-400 print:text-slate-700">Form:</strong> {result.colonyMorphology.form}</p>
              <p><strong className="text-slate-400 print:text-slate-700">Elevation:</strong> {result.colonyMorphology.elevation}</p>
              <p><strong className="text-slate-400 print:text-slate-700">Margin:</strong> {result.colonyMorphology.margin}</p>
              <p><strong className="text-slate-400 print:text-slate-700">Pigment:</strong> {result.colonyMorphology.colorAndPigment}</p>
              <p><strong className="text-slate-400 print:text-slate-700">Hemolysis:</strong> {result.colonyMorphology.hemolysis}</p>
              <p><strong className="text-slate-400 print:text-slate-700">Texture:</strong> {result.colonyMorphology.texture}</p>
            </div>
          </div>

          {/* Differential Diagnoses */}
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-slate-200 print:text-slate-900 uppercase">Differential Diagnoses Considered</h3>
            <ul className="divide-y divide-slate-800 print:divide-slate-300 bg-slate-950 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-300">
              {result.differentialDiagnoses.map((dd, idx) => (
                <li key={idx} className="p-2.5 flex items-center justify-between">
                  <span className="italic font-semibold text-slate-200 print:text-slate-900">{dd.organism} ({dd.probability}%)</span>
                  <span className="text-slate-400 print:text-slate-600 text-[11px]">{dd.keyDistinguishingFeature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Significance */}
          <div className="p-4 bg-slate-950 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-300 text-xs space-y-1">
            <h3 className="font-bold text-slate-200 print:text-slate-900 uppercase">Clinical Significance</h3>
            <p className="text-slate-300 print:text-slate-800 leading-relaxed">{result.clinicalSignificance}</p>
          </div>

          {/* Signoff */}
          <div className="pt-6 border-t border-slate-800 print:border-slate-300 grid grid-cols-2 gap-8 text-xs text-slate-400 print:text-slate-700">
            <div>
              <p className="font-bold text-slate-200 print:text-slate-900">Examining Microbiologist / Tech:</p>
              <p className="mt-4 border-b border-dashed border-slate-700 print:border-slate-400 pb-1">Sign: ____________________</p>
            </div>
            <div>
              <p className="font-bold text-slate-200 print:text-slate-900">Pathology Supervisor Verification:</p>
              <p className="mt-4 border-b border-dashed border-slate-700 print:border-slate-400 pb-1">Sign: ____________________</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-800 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
};
