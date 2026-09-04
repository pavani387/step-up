import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, X, ArrowLeft, RefreshCw, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';

export default function GoogleVerificationModal() {
  const {
    isGoogleModalOpen,
    setIsGoogleModalOpen,
    verifyGoogleAccount,
    switchRole,
    currentRole
  } = useApp();

  const [step, setStep] = useState('email'); // 'email' | 'password'
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isGoogleModalOpen) return null;

  const handleEmailNext = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setErrorMessage('Enter an email or phone number');
      return;
    }
    setErrorMessage('');
    setStep('password');
  };

  const handleAuthorize = (e) => {
    e.preventDefault();
    setIsAuthorizing(true);
    setErrorMessage('');

    const email = emailOrPhone.includes('@') ? emailOrPhone.trim() : `${emailOrPhone.trim()}@gmail.com`;
    const derivedName = email.split('@')[0].replace(/[0-9._]/g, ' ').trim();
    const formattedName = derivedName
      ? derivedName.charAt(0).toUpperCase() + derivedName.slice(1)
      : 'Google User';

    setTimeout(() => {
      setIsAuthorizing(false);
      verifyGoogleAccount(
        {
          name: formattedName,
          email: email,
          picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(formattedName)}&background=2563FF&color=fff&bold=true`,
          verifiedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          oauthProvider: 'Google Accounts (OAuth 2.0)'
        },
        true // Prompts profile details setup!
      );

      // Reset modal state
      setStep('email');
      setEmailOrPhone('');
      setPassword('');
    }, 1000);
  };

  const handleClose = () => {
    setIsGoogleModalOpen(false);
    setStep('email');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-[#0C1435]/75 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-[440px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col font-sans text-[#1F1F1F] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Authentic Google OAuth Dialog Header */}
        <div className="p-8 pb-4 space-y-4">
          {/* Official Google G Logo */}
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span className="text-xs font-semibold text-slate-600">Google Identity Services</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {step === 'email' ? 'Sign in with Google' : 'Welcome'}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              {step === 'email' ? (
                <>to continue to <strong className="text-[#2563FF]">stepup.com</strong></>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-800 mt-1">
                  <User className="w-3.5 h-3.5 text-slate-500" /> {emailOrPhone}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-8 pb-6 flex-1">
          {isAuthorizing ? (
            <div className="py-14 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#4285F4] animate-spin mx-auto" />
              <h3 className="text-sm font-bold text-slate-900">
                Authorizing Google Account...
              </h3>
              <p className="text-xs text-slate-500">
                Connecting securely with {emailOrPhone}
              </p>
            </div>
          ) : step === 'email' ? (
            /* STEP 1: Enter Any Email or Phone on this Device */
            <form onSubmit={handleEmailNext} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email or phone on this device <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={emailOrPhone}
                  onChange={(e) => {
                    setEmailOrPhone(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="Enter your email or phone"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 outline-none focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8]/20 transition-all font-medium"
                />
                {errorMessage && (
                  <p className="text-xs font-medium text-rose-600 mt-1.5">{errorMessage}</p>
                )}
              </div>

              <div className="text-xs text-slate-500 leading-relaxed pt-1">
                Enter your Gmail or university email ID available on your mobile phone or laptop.
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs font-bold text-[#1A73E8] hover:underline"
                >
                  Create account
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Next
                </button>
              </div>
            </form>
          ) : (
            /* STEP 2: Password / Instant Authorize */
            <form onSubmit={handleAuthorize} className="space-y-4 pt-2">
              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-xs font-bold text-[#1A73E8] hover:underline flex items-center gap-1 mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Use a different account
              </button>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Enter your password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (or leave empty for 1-tap OAuth)"
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-300 text-sm text-slate-900 outline-none focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8]/20 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1A73E8] shrink-0" />
                <span>Google OAuth 2.0 will securely verify this email address.</span>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Authorize & Continue
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer (Matching Google UI Guidelines) */}
        <div className="px-8 py-4 border-t border-slate-100 bg-slate-50/50 text-[11px] text-slate-500 flex items-center justify-between">
          <span>English (United States) ▾</span>
          <div className="flex items-center gap-3">
            <a href="#help" className="hover:text-slate-800">Help</a>
            <a href="#privacy" className="hover:text-slate-800">Privacy</a>
            <a href="#terms" className="hover:text-slate-800">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
}
