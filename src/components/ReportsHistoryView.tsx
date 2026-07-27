import React, { useState } from 'react';
import { CultureIdentificationResult } from '../types';
import { FileSpreadsheet, Search, Printer, Trash2, Microscope, ArrowRight, ShieldCheck } from 'lucide-react';

interface ReportsHistoryViewProps {
  reports: CultureIdentificationResult[];
  onOpenReportModal: (result: CultureIdentificationResult) => void;
  onClearReports: () => void;
}

export const ReportsHistoryView: React.FC<ReportsHistoryViewProps> = ({
  reports,
  onOpenReportModal,
  onClearReports,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredReports = reports.filter((r) =>
    r.organismName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.id && r.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <FileSpreadsheet className="w-4 h-4" /> Clinical Specimen Archive
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Saved Laboratory Diagnostic Reports ({reports.length})
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Access previous AI culture identifications, re-print official clinical diagnostic reports, or export history logs.
          </p>
        </div>

        {reports.length > 0 && (
          <button
            onClick={onClearReports}
            className="px-4 py-2 bg-slate-800 hover:bg-rose-500/20 text-rose-300 rounded-xl text-xs font-semibold border border-slate-700 flex items-center space-x-2 self-start md:self-center"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search report ID, organism name..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    ID: {report.id}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{report.timestamp}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-100 italic">{report.organismName}</h3>
                  <p className="text-xs text-slate-400">{report.commonName}</p>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                  <p><strong className="text-slate-400">Specimen Source:</strong> {report.specimenSource || 'Wound Swab'}</p>
                  <p><strong className="text-slate-400">Isolation Medium:</strong> {report.agarMedium || 'Blood Agar'}</p>
                  <p><strong className="text-slate-400">AI Match Score:</strong> <span className="text-emerald-400 font-bold">{report.confidenceScore}%</span></p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={() => onOpenReportModal(report)}
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>View & Print Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center shadow-lg space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <h3 className="text-base font-semibold text-slate-200">
            No Lab Reports Saved
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Run an AI culture identification on the main tab to automatically generate and save clinical specimen reports.
          </p>
        </div>
      )}
    </div>
  );
};
