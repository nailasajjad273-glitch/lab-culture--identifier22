import React, { useState } from 'react';
import { Disc3, ShieldAlert, AlertTriangle, CheckCircle2, RefreshCw, Info, Plus, Trash2, Zap } from 'lucide-react';

interface ASTPreset {
  name: string;
  potency: string;
  susceptibleMinMm: number; // e.g. >= 22
  resistantMaxMm: number; // e.g. <= 17
  defaultVal: number;
}

const ANTIBIOTIC_BENCHMARKS: Record<string, ASTPreset[]> = {
  'Staphylococcus aureus': [
    { name: 'Cefoxitin (FOX)', potency: '30 µg', susceptibleMinMm: 22, resistantMaxMm: 21, defaultVal: 18 },
    { name: 'Penicillin G (P)', potency: '10 units', susceptibleMinMm: 29, resistantMaxMm: 28, defaultVal: 15 },
    { name: 'Erythromycin (E)', potency: '15 µg', susceptibleMinMm: 23, resistantMaxMm: 13, defaultVal: 24 },
    { name: 'Clindamycin (CC)', potency: '2 µg', susceptibleMinMm: 21, resistantMaxMm: 14, defaultVal: 22 },
    { name: 'Vancomycin (VA)', potency: '30 µg', susceptibleMinMm: 15, resistantMaxMm: 14, defaultVal: 18 },
    { name: 'Trimethoprim-Sulfamethoxazole (SXT)', potency: '1.25/23.75 µg', susceptibleMinMm: 16, resistantMaxMm: 10, defaultVal: 20 },
  ],
  'Escherichia coli': [
    { name: 'Ampicillin (AMP)', potency: '10 µg', susceptibleMinMm: 17, resistantMaxMm: 13, defaultVal: 11 },
    { name: 'Amoxicillin-Clavulanate (AMC)', potency: '20/10 µg', susceptibleMinMm: 18, resistantMaxMm: 13, defaultVal: 20 },
    { name: 'Ceftriaxone (CRO)', potency: '30 µg', susceptibleMinMm: 23, resistantMaxMm: 19, defaultVal: 15 },
    { name: 'Ciprofloxacin (CIP)', potency: '5 µg', susceptibleMinMm: 26, resistantMaxMm: 21, defaultVal: 28 },
    { name: 'Meropenem (MEM)', potency: '10 µg', susceptibleMinMm: 23, resistantMaxMm: 19, defaultVal: 27 },
    { name: 'Gentamicin (CN)', potency: '10 µg', susceptibleMinMm: 15, resistantMaxMm: 12, defaultVal: 18 },
  ],
  'Pseudomonas aeruginosa': [
    { name: 'Piperacillin-Tazobactam (TZP)', potency: '100/10 µg', susceptibleMinMm: 21, resistantMaxMm: 14, defaultVal: 23 },
    { name: 'Ceftazidime (CAZ)', potency: '30 µg', susceptibleMinMm: 18, resistantMaxMm: 14, defaultVal: 20 },
    { name: 'Cefepime (FEP)', potency: '30 µg', susceptibleMinMm: 18, resistantMaxMm: 14, defaultVal: 22 },
    { name: 'Meropenem (MEM)', potency: '10 µg', susceptibleMinMm: 19, resistantMaxMm: 15, defaultVal: 24 },
    { name: 'Ciprofloxacin (CIP)', potency: '5 µg', susceptibleMinMm: 25, resistantMaxMm: 18, defaultVal: 26 },
    { name: 'Amikacin (AK)', potency: '30 µg', susceptibleMinMm: 17, resistantMaxMm: 14, defaultVal: 19 },
  ],
  'Klebsiella pneumoniae': [
    { name: 'Ceftriaxone (CRO)', potency: '30 µg', susceptibleMinMm: 23, resistantMaxMm: 19, defaultVal: 16 },
    { name: 'Cefotaxime (CTX)', potency: '30 µg', susceptibleMinMm: 26, resistantMaxMm: 22, defaultVal: 18 },
    { name: 'Meropenem (MEM)', potency: '10 µg', susceptibleMinMm: 23, resistantMaxMm: 19, defaultVal: 14 },
    { name: 'Ciprofloxacin (CIP)', potency: '5 µg', susceptibleMinMm: 26, resistantMaxMm: 21, defaultVal: 27 },
    { name: 'Gentamicin (CN)', potency: '10 µg', susceptibleMinMm: 15, resistantMaxMm: 12, defaultVal: 17 },
  ]
};

export const ASTCalculatorView: React.FC = () => {
  const [organism, setOrganism] = useState<string>('Staphylococcus aureus');
  
  const [testRows, setTestRows] = useState<
    { name: string; potency: string; susceptibleMinMm: number; resistantMaxMm: number; zoneMm: number }[]
  >(
    ANTIBIOTIC_BENCHMARKS['Staphylococcus aureus'].map((ab) => ({
      name: ab.name,
      potency: ab.potency,
      susceptibleMinMm: ab.susceptibleMinMm,
      resistantMaxMm: ab.resistantMaxMm,
      zoneMm: ab.defaultVal
    }))
  );

  const handleOrganismChange = (newOrg: string) => {
    setOrganism(newOrg);
    const defaults = ANTIBIOTIC_BENCHMARKS[newOrg] || ANTIBIOTIC_BENCHMARKS['Staphylococcus aureus'];
    setTestRows(
      defaults.map((ab) => ({
        name: ab.name,
        potency: ab.potency,
        susceptibleMinMm: ab.susceptibleMinMm,
        resistantMaxMm: ab.resistantMaxMm,
        zoneMm: ab.defaultVal
      }))
    );
  };

  const handleZoneChange = (index: number, val: number) => {
    const updated = [...testRows];
    updated[index].zoneMm = val;
    setTestRows(updated);
  };

  const getInterpretation = (row: typeof testRows[0]) => {
    if (row.zoneMm >= row.susceptibleMinMm) return { label: 'Sensitive (S)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (row.zoneMm <= row.resistantMaxMm) return { label: 'Resistant (R)', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
    return { label: 'Intermediate (I)', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
  };

  // Evaluate Superbug Multi-drug Resistance Phenotype
  const detectResistancePhenotype = () => {
    if (organism === 'Staphylococcus aureus') {
      const fox = testRows.find((r) => r.name.includes('Cefoxitin'));
      if (fox && fox.zoneMm <= fox.resistantMaxMm) {
        return {
          title: 'CRITICAL ALERT: MRSA Phenotype Detected',
          description: 'Cefoxitin zone of inhibition ≤ 21mm indicates Methicillin-Resistant Staphylococcus aureus (mecA/mecC gene presence). Standard beta-lactams are ineffective.',
          severity: 'high'
        };
      }
    }

    if (organism === 'Escherichia coli' || organism === 'Klebsiella pneumoniae') {
      const cro = testRows.find((r) => r.name.includes('Ceftriaxone') || r.name.includes('Cefotaxime'));
      const mem = testRows.find((r) => r.name.includes('Meropenem'));

      if (mem && mem.zoneMm <= mem.resistantMaxMm) {
        return {
          title: 'CRITICAL ALERT: CRE (Carbapenem-Resistant Enterobacteriaceae)',
          description: 'Carbapenem resistance confirmed (Meropenem ≤ 19mm). High mortality risk. Initiate infectious disease consult and isolation precautions immediately.',
          severity: 'high'
        };
      }

      if (cro && cro.zoneMm <= cro.resistantMaxMm) {
        return {
          title: 'ALERT: ESBL (Extended-Spectrum Beta-Lactamase) Phenotype',
          description: 'Resistance to 3rd-generation cephalosporins detected. Confirm with clavulanate combination disk test or PCR.',
          severity: 'medium'
        };
      }
    }

    return null;
  };

  const phenotypeAlert = detectResistancePhenotype();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <Disc3 className="w-4 h-4" /> CLSI M100 / EUCAST Guidelines
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Kirby-Bauer Disk Diffusion AST Calculator
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Input measured zone of inhibition diameters (in mm) from Mueller-Hinton agar plates to calculate antibiotic sensitivity, intermediate tolerance, or resistance profiles.
          </p>
        </div>
      </div>

      {/* Phenotype Alert */}
      {phenotypeAlert && (
        <div className={`p-4 rounded-2xl border flex items-start space-x-3 shadow-lg ${
          phenotypeAlert.severity === 'high'
            ? 'bg-rose-500/10 border-rose-500/40 text-rose-200'
            : 'bg-amber-500/10 border-amber-500/40 text-amber-200'
        }`}>
          <ShieldAlert className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold">{phenotypeAlert.title}</h3>
            <p className="text-xs mt-1 leading-relaxed opacity-90">{phenotypeAlert.description}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form Table */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Select Isolated Pathogen Species
              </label>
              <select
                value={organism}
                onChange={(e) => handleOrganismChange(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 italic font-semibold focus:outline-none focus:border-emerald-500"
              >
                {Object.keys(ANTIBIOTIC_BENCHMARKS).map((org) => (
                  <option key={org} value={org}>{org}</option>
                ))}
              </select>
            </div>

            <div className="text-xs text-slate-400 font-medium">
              Medium: <span className="text-slate-200 font-bold">Mueller-Hinton Agar (MHA)</span>
            </div>
          </div>

          {/* Antibiotic Zone Inputs */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Antibiotic Agent</th>
                  <th className="py-2.5 px-3">Potency</th>
                  <th className="py-2.5 px-3">CLSI Breakpoints (mm)</th>
                  <th className="py-2.5 px-3 w-32">Observed Zone (mm)</th>
                  <th className="py-2.5 px-3">Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {testRows.map((row, idx) => {
                  const interp = getInterpretation(row);
                  return (
                    <tr key={idx} className="hover:bg-slate-950/40">
                      <td className="py-3 px-3 font-semibold text-slate-200">{row.name}</td>
                      <td className="py-3 px-3 text-slate-400">{row.potency}</td>
                      <td className="py-3 px-3 text-slate-400 text-[11px]">
                        R ≤ {row.resistantMaxMm}mm | S ≥ {row.susceptibleMinMm}mm
                      </td>
                      <td className="py-3 px-3">
                        <input
                          type="number"
                          min={6}
                          max={50}
                          value={row.zoneMm}
                          onChange={(e) => handleZoneChange(idx, Number(e.target.value))}
                          className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-sm font-bold text-slate-100 text-center focus:outline-none focus:border-emerald-500"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${interp.color}`}>
                          {interp.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Visual Mueller-Hinton Plate Simulation */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col items-center justify-between">
          <div className="text-center">
            <h3 className="text-sm font-bold text-slate-200">
              Mueller-Hinton Plate Visualizer
            </h3>
            <p className="text-[11px] text-slate-400">
              Simulated 90mm Petri dish with 6 antibiotic disks & clear inhibition zones.
            </p>
          </div>

          {/* SVG Agar Plate */}
          <div className="relative w-64 h-64 bg-slate-950 rounded-full border-4 border-slate-700 p-2 shadow-inner flex items-center justify-center">
            {/* Agar base */}
            <div className="w-full h-full rounded-full bg-amber-900/30 border border-amber-600/30 relative overflow-hidden flex items-center justify-center">
              {/* Lawn of bacterial growth */}
              <div className="absolute inset-0 bg-amber-200/20 rounded-full" />

              {/* 6 Disk Positions in Circle */}
              {testRows.map((row, idx) => {
                const angle = (idx * (360 / testRows.length) - 90) * (Math.PI / 180);
                const distance = 65; // px from center
                const cx = 112 + Math.cos(angle) * distance;
                const cy = 112 + Math.sin(angle) * distance;
                const zoneRadius = Math.min(Math.max(row.zoneMm * 1.5, 10), 38);

                return (
                  <div key={idx} className="absolute" style={{ left: `${cx - zoneRadius}px`, top: `${cy - zoneRadius}px` }}>
                    {/* Inhibition Zone Halo */}
                    <div
                      className="rounded-full bg-slate-950/90 border border-amber-300/40 flex items-center justify-center"
                      style={{ width: `${zoneRadius * 2}px`, height: `${zoneRadius * 2}px` }}
                    >
                      {/* Paper Disk */}
                      <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-400 flex items-center justify-center text-[7px] font-extrabold text-slate-900 shadow">
                        {row.name.substring(0, 3)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full pt-2 text-center text-[11px] text-slate-400 border-t border-slate-800">
            Zones rendered proportional to observed mm values.
          </div>
        </div>
      </div>
    </div>
  );
};
