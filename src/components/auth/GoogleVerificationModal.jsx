import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, X, ArrowLeft, RefreshCw, CheckCircle2, Lock } from 'lucide-react';

export default function GoogleVerificationModal() {
  const {
    isGoogleModalOpen,
    setIsGoogleModalOpen,
    verifyGoogleAccount,
    switchRole
  } = useApp();

  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [selectedAcc, setSelectedAcc] = useState(null);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');

  if (!isGoogleModalOpen) return null;

  // Exact Google accounts list from user's uploaded screenshot (media_1788367337459.png)
  const googleAccounts = [
    {
      id: 'acc_01',
      name: 'Pavani Kondreddy',
      email: 'kondreddypavani081@gmail.com',
      initial: 'P',
      badgeColor: 'bg-[#1E7E34]' // Dark green matching screenshot
    },
    {
      id: 'acc_02',
      name: 'Pavani Kondreddy',
      email: 'kondreddypavani26@gmail.com',
      initial: 'P',
      badgeColor: 'bg-[#6F42C1]' // Purple matching screenshot
    },
    {
      id: 'acc_03',
      name: 'PAVANI P',
      email: '192425288.simats@saveetha.com',
      initial: 'P',
      badgeColor: 'bg-[#495057]' // Dark grey matching screenshot
    },
    {
      id: 'acc_04',
      name: 'Arula Satya',
      email: 'satyaarula73@gmail.com',
      initial: 'A',
      badgeColor: 'bg-[#D9534F]' // Orange matching screenshot
    },
    {
      id: 'acc_05',
      name: 'pavani Kondreddy',
      email: 'pavanikondreddy41@gmail.com',
      initial: 'p',
      badgeColor: 'bg-[#E65100]' // Red-orange matching screenshot
    },
    {
      id: 'acc_06',
      name: 'Lakshmireddy Kondreddy',
      email: 'kondreddylakshmireddy3@gmail.com',
      initial: 'L',
      badgeColor: 'bg-[#2E7D32]' // Green matching screenshot
    },
    {
      id: 'acc_07',
      name: 'kondreddy Pavani',
      email: 'pavanikondreddyupsc@gmail.com',
      initial: 'k',
      badgeColor: 'bg-[#5D4037]' // Brown matching screenshot
    },
    {
      id: 'acc_08',
      name: 'Pavs Ffb',
      email: 'pavsffb@gmail.com',
      initial: 'P',
      badgeColor: 'bg-[#E64A19]' // Deep orange matching screenshot
    },
    {
      id: 'acc_09',
      name: 'Oavagya Hhdje',
      email: 'pavani1890o@gmail.com',
      initial: 'O',
      badgeColor: 'bg-[#00897B]' // Teal matching screenshot
    },
    {
      id: 'acc_10',
      name: 'Divyasree Yarranagu',
      email: 'divyasreeyarranagu143@gmail.com',
      initial: 'D',
      badgeColor: 'bg-[#D84315]' // Coral red matching screenshot
    }
  ];

  const handleSelectAccount = (acc) => {
    setSelectedAcc(acc);
    setIsAuthorizing(true);

    setTimeout(() => {
      setIsAuthorizing(false);
      verifyGoogleAccount(
        {
          name: acc.name,
          email: acc.email,
          picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
          verifiedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          oauthProvider: 'Google Accounts (OAuth 2.0)'
        },
        false
      );
      switchRole('student');
    }, 1100);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail) return;

    const name = customName || customEmail.split('@')[0];
    setIsAuthorizing(true);

    setTimeout(() => {
      setIsAuthorizing(false);
      verifyGoogleAccount(
        {
          name,
          email: customEmail,
          picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
          verifiedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          oauthProvider: 'Google Accounts (OAuth 2.0)'
        },
        false
      );
      switchRole('student');
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0C1435]/75 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E6E9F0] overflow-hidden max-h-[92vh] flex flex-col font-sans text-[#1F1F1F]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Google Header */}
        <div className="p-6 pb-4 border-b border-slate-100 relative">
          <button
            onClick={() => setIsGoogleModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Official Google G Logo & Title */}
          <div className="flex items-center gap-2 mb-4">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span className="text-sm font-semibold text-slate-700">Sign in with Google</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Choose an account</h2>
          <p className="text-sm text-slate-600 mt-1">
            to continue to <strong className="text-[#2563FF]">stepup.com</strong>
          </p>
        </div>

        {/* Modal Body: Google Accounts List or Loading Authorization */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-100">
          {isAuthorizing ? (
            <div className="py-16 px-6 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#4285F4] animate-spin mx-auto" />
              <h3 className="text-sm font-bold text-slate-900">
                Authorizing with Google Accounts...
              </h3>
              <p className="text-xs text-slate-500">
                Connecting as {selectedAcc ? selectedAcc.email : 'Google User'}
              </p>
            </div>
          ) : !isCustomMode ? (
            <>
              {/* Account list items matching media_1788367337459.png */}
              {googleAccounts.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => handleSelectAccount(acc)}
                  className="w-full px-4 py-3 hover:bg-slate-50 transition-colors flex items-center gap-3.5 text-left group"
                >
                  <div
                    className={`w-9 h-9 rounded-full ${acc.badgeColor} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs`}
                  >
                    {acc.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-[#2563FF] truncate">
                      {acc.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{acc.email}</div>
                  </div>
                </button>
              ))}

              {/* Use another account row */}
              <button
                onClick={() => setIsCustomMode(true)}
                className="w-full px-4 py-3 hover:bg-slate-50 transition-colors flex items-center gap-3.5 text-left group"
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-sm font-semibold text-slate-800 group-hover:text-[#2563FF]">
                  Use another account
                </div>
              </button>
            </>
          ) : (
            /* Custom Email Input Mode */
            <form onSubmit={handleCustomSubmit} className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2563FF]">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to accounts
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Account Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Pavani Kondreddy"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-[#4285F4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email or phone *
                </label>
                <input
                  type="email"
                  required
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-[#4285F4]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-bold transition-all shadow-xs"
                >
                  Next & Authorize
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer (Matching Google UI in Screenshot) */}
        <div className="p-4 border-t border-slate-100 bg-white text-[11px] text-slate-500 space-y-2">
          <p>
            Before using this app, you can review stepup.com's{' '}
            <a href="#privacy" className="text-[#1A73E8] hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#terms" className="text-[#1A73E8] hover:underline">
              Terms of Service
            </a>
            .
          </p>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span className="cursor-pointer hover:text-slate-800">English (United States) ▾</span>
            <div className="flex items-center gap-3">
              <a href="#help" className="hover:text-slate-800">Help</a>
              <a href="#privacy" className="hover:text-slate-800">Privacy</a>
              <a href="#terms" className="hover:text-slate-800">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
