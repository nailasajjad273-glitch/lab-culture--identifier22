/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, CultureIdentificationResult, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { LoginView } from './components/LoginView';
import { AIIdentifierView } from './components/AIIdentifierView';
import { BiochemicalMatrixView } from './components/BiochemicalMatrixView';
import { ASTCalculatorView } from './components/ASTCalculatorView';
import { ReferenceAtlasView } from './components/ReferenceAtlasView';
import { LabCaseQuizView } from './components/LabCaseQuizView';
import { ReportsHistoryView } from './components/ReportsHistoryView';
import { LabReportModal } from './components/LabReportModal';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const storedUser = localStorage.getItem('lab_culture_auth_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<TabType>('identifier');
  const [savedReports, setSavedReports] = useState<CultureIdentificationResult[]>(() => {
    try {
      const stored = localStorage.getItem('lab_culture_reports_history');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeReportModal, setActiveReportModal] = useState<CultureIdentificationResult | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('lab_culture_reports_history', JSON.stringify(savedReports));
    } catch (e) {
      console.error('Failed to save reports history to localStorage', e);
    }
  }, [savedReports]);

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('lab_culture_auth_user');
    setCurrentUser(null);
  };

  const handleIdentificationComplete = (result: CultureIdentificationResult) => {
    setSavedReports((prev) => [result, ...prev]);
  };

  const handleClearReports = () => {
    setSavedReports([]);
  };

  if (!currentUser) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedReportsCount={savedReports.length}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="pb-16">
        {activeTab === 'identifier' && (
          <AIIdentifierView
            onIdentificationComplete={handleIdentificationComplete}
            onOpenReportModal={(res) => setActiveReportModal(res)}
          />
        )}

        {activeTab === 'matrix' && <BiochemicalMatrixView />}

        {activeTab === 'ast' && <ASTCalculatorView />}

        {activeTab === 'atlas' && <ReferenceAtlasView />}

        {activeTab === 'quiz' && <LabCaseQuizView />}

        {activeTab === 'reports' && (
          <ReportsHistoryView
            reports={savedReports}
            onOpenReportModal={(res) => setActiveReportModal(res)}
            onClearReports={handleClearReports}
          />
        )}
      </main>

      {/* Printable Report Modal */}
      {activeReportModal && (
        <LabReportModal
          result={activeReportModal}
          onClose={() => setActiveReportModal(null)}
        />
      )}
    </div>
  );
}

