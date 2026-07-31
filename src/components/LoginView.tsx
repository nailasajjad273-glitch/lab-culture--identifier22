import React, { useState } from 'react';
import { Microscope, ShieldCheck, Lock, Mail, Building, UserCheck, ArrowRight, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginViewProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('dr.sullivan@clinicalmicro.org');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<'Senior Microbiologist' | 'Pathology Resident' | 'Lab Technologist' | 'Medical Student'>('Senior Microbiologist');
  const [facility, setFacility] = useState('Central Diagnostic Pathology Lab');
  const [fullName, setFullName] = useState('Dr. Sarah Sullivan, MD, FCAP');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid clinical institutional email address.');
      return;
    }

    if (password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);

    // Simulate clinical authentication verification
    setTimeout(() => {
      const user: UserProfile = {
        name: fullName || 'Clinical Laboratory Staff',
        email,
        role,
        facility: facility || 'Clinical Diagnostic Center',
        token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        loginTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (rememberMe) {
        localStorage.setItem('lab_culture_auth_user', JSON.stringify(user));
      }

      setIsLoading(false);
      onLoginSuccess(user);
    }, 600);
  };

  const handleQuickPreset = (
    presetName: string,
    presetEmail: string,
    presetRole: 'Senior Microbiologist' | 'Pathology Resident' | 'Lab Technologist' | 'Medical Student',
    presetFacility: string
  ) => {
    setFullName(presetName);
    setEmail(presetEmail);
    setRole(presetRole);
    setFacility(presetFacility);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl shadow-xl shadow-emerald-500/20 text-slate-950 flex items-center justify-center">
            <Microscope className="w-10 h-10 text-slate-950" />
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Clinical Diagnostic Portal
          </div>
          <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            Lab Culture Identifier
          </h2>
          <p className="mt-2 text-xs text-slate-400 max-w-sm mx-auto">
            Authorized access portal for diagnostic AI culture identification, AST zone calculations, and clinical pathology reports.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 space-y-6">
          
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Clinical Name & Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Alex Mercer, MD"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Institutional / Hospital Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@hospital.org"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Professional Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Senior Microbiologist">Senior Microbiologist</option>
                  <option value="Pathology Resident">Pathology Resident</option>
                  <option value="Lab Technologist">Lab Technologist</option>
                  <option value="Medical Student">Medical Student</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Facility / Hospital
                </label>
                <input
                  type="text"
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                  placeholder="Lab Name"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Security Password / PIN
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
                <span>Keep session active</span>
              </label>
              <span className="text-emerald-400 hover:underline cursor-pointer text-[11px]">
                CLSI Standards Enforced
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Staff Credentials...</span>
              ) : (
                <>
                  <span>Access Lab Culture Identifier</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Sign-in Profiles */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block text-center">
              Quick One-Click Staff Credentials
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() =>
                  handleQuickPreset(
                    'Dr. Sarah Sullivan, MD',
                    'sullivan@pathology.org',
                    'Senior Microbiologist',
                    'St. Jude Pathology Lab'
                  )
                }
                className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left space-y-0.5 transition-colors"
              >
                <div className="font-bold text-slate-200 text-[11px]">Dr. Sarah Sullivan</div>
                <div className="text-[10px] text-emerald-400 font-medium">Senior Microbiologist</div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickPreset(
                    'Marcus Vance, MLS(ASCP)',
                    'vance@diagnosticlab.com',
                    'Lab Technologist',
                    'Metro General Hospital'
                  )
                }
                className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left space-y-0.5 transition-colors"
              >
                <div className="font-bold text-slate-200 text-[11px]">Marcus Vance</div>
                <div className="text-[10px] text-teal-400 font-medium">Lab Technologist</div>
              </button>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-500 pt-2 flex items-center justify-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure ISO 15189 Clinical Pathology Compliance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
