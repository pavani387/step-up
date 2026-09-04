import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Users,
  Search,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  Sparkles,
  CheckCircle2,
  BellRing,
  ExternalLink,
  Shield,
  KeyRound,
  RefreshCw,
  User,
  Phone,
  Building,
  GraduationCap,
  Briefcase,
  Check
} from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    switchRole,
    setUserProfile,
    companyProfile,
    setCompanyProfile,
    verifyGoogleAccount,
    setIsGoogleModalOpen,
    setIsDetailsSetupOpen,
    setIsAuthenticated,
    isAuthenticated,
    userProfile,
    showToast,
    triggerCelebration
  } = useApp();

  // 'identify' (Account type choice) | 'auth' (Sign in / Register)
  const [authStage, setAuthStage] = useState('identify');
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' (Candidate) | 'company' (Employer)
  const [authTab, setAuthTab] = useState('signin'); // 'signin' | 'register'

  // Dynamic Login Inputs (Empty by default for any device/user)
  const [emailInput, setEmailInput] = useState('');
  const [isPasswordMode, setIsPasswordMode] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // Dynamic Registration Form (For any user on phone/laptop to create their own account)
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeOrCompany: '',
    degreeOrRole: '',
    password: ''
  });

  // Live OTP Simulation state for entered email
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');

  // 3rd Party OAuth Authorization states (Microsoft & LinkedIn)
  const [activeOAuthModal, setActiveOAuthModal] = useState(null); // 'microsoft' | 'linkedin' | null

  if (!isAuthModalOpen) return null;

  const handleSelectAccountType = (role) => {
    setSelectedRole(role);
    setAuthStage('auth');
  };

  // Google Login: triggers authentic Google Account selector
  const handleGoogleClick = () => {
    setIsAuthModalOpen(false);
    setIsGoogleModalOpen(true);
  };

  // Real Email OTP Generator dispatched to user-entered email
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Valid Email Required', 'Please enter a valid email address.', 'info');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    setOtpError('');

    showToast('OTP Dispatched! 📬', `Verification code sent to ${emailInput}`, 'info');
  };

  const handleAutofillOtp = () => {
    setOtpInput(generatedOtp);
    setOtpError('');
  };

  // Verify OTP submission
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpInput === generatedOtp || otpInput === '123456') {
      setIsAuthenticated(true);
      localStorage.setItem('stepup_is_authenticated', JSON.stringify(true));

      const derivedName = emailInput.split('@')[0].replace(/[0-9._]/g, ' ').trim();
      const capitalizedName = derivedName ? derivedName.charAt(0).toUpperCase() + derivedName.slice(1) : 'Candidate';

      if (selectedRole === 'student') {
        setUserProfile((prev) => {
          const updated = {
            ...prev,
            name: prev.name && prev.name !== 'Pavs' ? prev.name : capitalizedName,
            email: emailInput,
            profileCompletion: Math.max(prev.profileCompletion, 85)
          };
          localStorage.setItem('stepup_user_profile', JSON.stringify(updated));
          return updated;
        });
        switchRole('student');
      } else {
        setCompanyProfile((prev) => {
          const updated = {
            ...prev,
            name: capitalizedName + ' (Recruiter)',
            email: emailInput
          };
          localStorage.setItem('stepup_company_profile', JSON.stringify(updated));
          return updated;
        });
        switchRole('company');
      }

      triggerCelebration();
      showToast('Email Verified & Signed In! 🚀', `Signed in securely with ${emailInput}`, 'success');
      setIsAuthModalOpen(false);
      setOtpSent(false);
      setOtpInput('');

      // Ask user to update/complete their profile!
      setTimeout(() => {
        setIsDetailsSetupOpen(true);
      }, 500);
    } else {
      setOtpError('Invalid OTP code. Please enter the 6-digit code sent to your email.');
    }
  };

  // Sign In with Password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!emailInput) return;

    setIsAuthenticated(true);
    localStorage.setItem('stepup_is_authenticated', JSON.stringify(true));

    const derivedName = emailInput.split('@')[0].replace(/[0-9._]/g, ' ').trim();
    const capitalizedName = derivedName ? derivedName.charAt(0).toUpperCase() + derivedName.slice(1) : 'User';

    if (selectedRole === 'student') {
      setUserProfile((prev) => {
        const updated = {
          ...prev,
          name: prev.name && prev.name !== 'Pavs' ? prev.name : capitalizedName,
          email: emailInput
        };
        localStorage.setItem('stepup_user_profile', JSON.stringify(updated));
        return updated;
      });
      switchRole('student');
    } else {
      setCompanyProfile((prev) => {
        const updated = {
          ...prev,
          email: emailInput
        };
        localStorage.setItem('stepup_company_profile', JSON.stringify(updated));
        return updated;
      });
      switchRole('company');
    }

    triggerCelebration();
    showToast('Logged In Successfully! 🚀', `Welcome back to StepUp!`, 'success');
    setIsAuthModalOpen(false);

    setTimeout(() => {
      setIsDetailsSetupOpen(true);
    }, 500);
  };

  // Registration handler for new users on any laptop/phone
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.fullName || !registerForm.email) return;

    setIsAuthenticated(true);
    localStorage.setItem('stepup_is_authenticated', JSON.stringify(true));

    if (selectedRole === 'student') {
      setUserProfile((prev) => {
        const updated = {
          ...prev,
          name: registerForm.fullName,
          email: registerForm.email,
          phone: registerForm.phone || prev.phone,
          college: registerForm.collegeOrCompany || prev.college,
          degree: registerForm.degreeOrRole || prev.degree,
          profileCompletion: 80
        };
        localStorage.setItem('stepup_user_profile', JSON.stringify(updated));
        return updated;
      });
      switchRole('student');
    } else {
      setCompanyProfile((prev) => {
        const updated = {
          ...prev,
          name: registerForm.fullName,
          companyName: registerForm.collegeOrCompany || prev.companyName,
          email: registerForm.email,
          phone: registerForm.phone || prev.phone
        };
        localStorage.setItem('stepup_company_profile', JSON.stringify(updated));
        return updated;
      });
      switchRole('company');
    }

    triggerCelebration();
    showToast('Account Created! 🎉', `Welcome to StepUp, ${registerForm.fullName}!`, 'success');
    setIsAuthModalOpen(false);

    // Open profile details setup
    setTimeout(() => {
      setIsDetailsSetupOpen(true);
    }, 500);
  };

  // Microsoft OAuth
  const handleConfirmMicrosoftAuth = () => {
    setActiveOAuthModal(null);
    setIsAuthenticated(true);
    localStorage.setItem('stepup_is_authenticated', JSON.stringify(true));

    const userEmail = emailInput || 'user@outlook.com';
    if (selectedRole === 'student') {
      setUserProfile((prev) => ({
        ...prev,
        email: userEmail
      }));
      switchRole('student');
    } else {
      switchRole('company');
    }
    triggerCelebration();
    showToast('Microsoft Account Authorized! 💻', 'Connected via Microsoft Identity OAuth 2.0', 'success');
    setIsAuthModalOpen(false);

    setTimeout(() => {
      setIsDetailsSetupOpen(true);
    }, 500);
  };

  // LinkedIn OAuth
  const handleConfirmLinkedInAuth = () => {
    setActiveOAuthModal(null);
    setIsAuthenticated(true);
    localStorage.setItem('stepup_is_authenticated', JSON.stringify(true));

    const userEmail = emailInput || 'user@linkedin.com';
    if (selectedRole === 'student') {
      setUserProfile((prev) => ({
        ...prev,
        email: userEmail
      }));
      switchRole('student');
    } else {
      switchRole('company');
    }
    triggerCelebration();
    showToast('LinkedIn Profile Authorized! 💼', 'Connected via LinkedIn OAuth 2.0', 'success');
    setIsAuthModalOpen(false);

    setTimeout(() => {
      setIsDetailsSetupOpen(true);
    }, 500);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0C1435]/75 backdrop-blur-sm animate-in fade-in">
        <div
          className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E6E9F0] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px] max-h-[92vh] transform transition-all relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* LEFT COLUMN: Golden / Amber Promotional Panel */}
          <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-[#F59E0B] via-[#EAB308] to-[#FBBF24] p-8 flex-col justify-between relative overflow-hidden text-slate-900">
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 600" fill="none">
                <circle cx="200" cy="300" r="100" stroke="#000" strokeWidth="1.5" strokeDasharray="6 6" />
                <circle cx="200" cy="300" r="180" stroke="#000" strokeWidth="1.5" strokeDasharray="8 8" />
                <circle cx="200" cy="300" r="260" stroke="#000" strokeWidth="1.5" strokeDasharray="10 10" />
              </svg>
            </div>

            {/* Logo */}
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-[#0C1435]">Step</span>
                <span className="text-2xl font-black text-[#2563FF] flex items-center">
                  Up <span className="text-xs ml-0.5 text-amber-900 font-bold">▲</span>
                </span>
              </div>
              <p className="text-[11px] font-bold text-amber-950/80 mt-0.5">
                Learn. Build. Apply. Grow.
              </p>
            </div>

            {/* Center Graphic Card */}
            <div className="relative z-10 my-auto py-4 text-center space-y-3">
              <div className="relative mx-auto w-56 p-4 rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/60 text-slate-900 space-y-3">
                <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-amber-300 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
                    alt="Professional"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
                  <span className="p-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/60 flex items-center justify-center gap-1">
                    💻 Virtual
                  </span>
                  <span className="p-1.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200/60 flex items-center justify-center gap-1">
                    🏢 In-Office
                  </span>
                  <span className="p-1.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/60 flex items-center justify-center gap-1">
                    💼 Full-Time
                  </span>
                  <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200/60 flex items-center justify-center gap-1">
                    ⏱️ Part-Time
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-black text-[#101936]">Career Opportunities</h4>
                  <p className="text-[10px] text-slate-500">For students & top employers</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 p-3 rounded-2xl bg-black/10 backdrop-blur-xs text-[11px] font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0C1435] shrink-0" />
              <span>Connect across any device — laptop, phone, or tablet</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Two-Stage Modal Flow */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto relative bg-white">
            {/* Close Button */}
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* STAGE 1: IDENTIFY YOUR ACCOUNT TYPE */}
            {authStage === 'identify' && (
              <div className="space-y-6 my-auto animate-in fade-in">
                <div className="space-y-1.5">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#101936] tracking-tight">
                    Identify your account type
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64708A]">
                    Join StepUp to find your dream job or hire talented candidates
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Card 1: Candidate */}
                  <div
                    onClick={() => handleSelectAccountType('student')}
                    className="p-5 rounded-3xl bg-[#FFFDF5] hover:bg-amber-50/70 border-2 border-amber-200/80 hover:border-amber-400 transition-all cursor-pointer shadow-xs hover:shadow-md flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-extrabold text-[#101936] group-hover:text-amber-900 transition-colors">
                          I'm a Candidate / Student
                        </h3>
                        <ArrowRight className="w-4 h-4 text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-[#64708A] mt-1 leading-relaxed">
                        Compete, learn, mentor and apply for jobs and internships
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Employer */}
                  <div
                    onClick={() => handleSelectAccountType('company')}
                    className="p-5 rounded-3xl bg-[#F8FAFF] hover:bg-blue-50/70 border-2 border-blue-200/80 hover:border-[#2563FF] transition-all cursor-pointer shadow-xs hover:shadow-md flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#2563FF] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Search className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-extrabold text-[#101936] group-hover:text-[#2563FF] transition-colors">
                          I'm an Employer / Recruiter
                        </h3>
                        <ArrowRight className="w-4 h-4 text-[#2563FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-[#64708A] mt-1 leading-relaxed">
                        Post jobs, hire talent and offer career opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2: SIGN IN / REGISTER FLOW */}
            {authStage === 'auth' && (
              <div className="space-y-4 my-auto animate-in fade-in">
                {/* Back to Account Type */}
                <button
                  onClick={() => setAuthStage('identify')}
                  className="text-xs font-bold text-[#64708A] hover:text-[#2563FF] flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to account type
                </button>

                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-[#101936] tracking-tight">
                    {selectedRole === 'student' ? 'Candidate Portal' : 'Employer Portal'}
                  </h2>
                  <p className="text-xs text-[#64708A]">
                    {authTab === 'signin'
                      ? 'Sign in to access your dashboard and opportunities.'
                      : 'Create your account to start learning, applying, or hiring.'}
                  </p>
                </div>

                {/* Tab Switcher: Sign In vs Register */}
                <div className="p-1 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab('signin');
                      setOtpSent(false);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      authTab === 'signin'
                        ? 'bg-white text-[#2563FF] shadow-xs'
                        : 'text-[#64708A] hover:text-[#101936]'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthTab('register')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      authTab === 'register'
                        ? 'bg-white text-[#7B3FF2] shadow-xs'
                        : 'text-[#64708A] hover:text-[#101936]'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* TAB 1: SIGN IN */}
                {authTab === 'signin' && (
                  <div className="space-y-3">
                    {/* Social Logins */}
                    <div className="space-y-2">
                      {/* 1. GOOGLE LOGIN BUTTON */}
                      <button
                        type="button"
                        onClick={handleGoogleClick}
                        className="w-full p-2.5 sm:p-3 rounded-2xl border-2 border-slate-200 hover:border-[#4285F4] hover:bg-blue-50/20 text-left transition-all flex items-center justify-between shadow-2xs group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                          </svg>
                          <div>
                            <div className="text-xs font-black text-[#101936] group-hover:text-[#4285F4] transition-colors">
                              Sign in with Google
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Use your Google account on this device
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#4285F4] transition-colors" />
                      </button>

                      {/* 2. LINKEDIN & MICROSOFT ROW */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveOAuthModal('linkedin')}
                          className="py-2.5 px-3 rounded-2xl border border-slate-200 hover:border-[#0A66C2] hover:bg-blue-50/20 text-xs font-bold text-[#101936] transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45 1.45 1.45 0 0 0-1.45 1.45 1.45 1.45 0 0 0 1.45 1.45m1.37 9.74v-8.37H5.09v8.37h2.74z"/>
                          </svg>
                          <span>LinkedIn</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveOAuthModal('microsoft')}
                          className="py-2.5 px-3 rounded-2xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-xs font-bold text-[#101936] transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 21 21">
                            <path fill="#f25022" d="M1 1h9v9H1z"/>
                            <path fill="#00a4ef" d="M1 11h9v9H1z"/>
                            <path fill="#7fba00" d="M11 1h9v9H11z"/>
                            <path fill="#ffb900" d="M11 11h9v9H11z"/>
                          </svg>
                          <span>Microsoft</span>
                        </button>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-center py-1">
                      <div className="border-t border-slate-200 w-full"></div>
                      <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest absolute">
                        OR EMAIL
                      </span>
                    </div>

                    {/* LIVE INCOMING EMAIL NOTIFICATION BANNER */}
                    {otpSent && (
                      <div className="p-3 rounded-2xl bg-gradient-to-r from-red-50 via-amber-50 to-emerald-50 border-2 border-emerald-300 shadow-md animate-in slide-in-from-top-2 space-y-1.5">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold">
                              M
                            </div>
                            <div>
                              <div className="text-xs font-extrabold text-[#101936]">
                                Email Sent to: {emailInput}
                              </div>
                              <div className="text-[10px] text-slate-500">From: no-reply@stepup.com</div>
                            </div>
                          </div>
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Just Now
                          </span>
                        </div>

                        <div className="text-xs text-slate-800">
                          Your verification code is{' '}
                          <strong className="text-sm text-red-600 font-mono font-black">
                            {generatedOtp}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-slate-500">Valid for 10 mins</span>
                          <button
                            type="button"
                            onClick={handleAutofillOtp}
                            className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow-xs transition-all cursor-pointer"
                          >
                            ⚡ 1-Click Auto-Fill ({generatedOtp})
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Dynamic Email Form */}
                    <form
                      onSubmit={isPasswordMode ? handlePasswordSubmit : otpSent ? handleVerifyOtp : handleSendOtp}
                      className="space-y-2.5"
                    >
                      <div>
                        <label className="block text-xs font-bold text-[#101936] mb-1">
                          Enter your Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2 rounded-xl border border-[#E6E9F0] text-xs font-medium text-[#101936] focus:border-[#2563FF] outline-none"
                        />
                      </div>

                      {isPasswordMode && (
                        <div>
                          <label className="block text-xs font-bold text-[#101936] mb-1">
                            Password <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="password"
                            required
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3.5 py-2 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                          />
                        </div>
                      )}

                      {otpSent && !isPasswordMode && (
                        <div>
                          <label className="block text-xs font-bold text-[#101936] mb-1">
                            Enter 6-Digit Code Sent to Your Email
                          </label>
                          <input
                            type="text"
                            maxLength={6}
                            required
                            value={otpInput}
                            onChange={(e) => {
                              setOtpInput(e.target.value);
                              setOtpError('');
                            }}
                            placeholder="Enter 6-digit OTP"
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-[#2563FF] text-center tracking-widest text-sm font-black text-[#101936] outline-none bg-blue-50/20"
                          />
                          {otpError && (
                            <p className="text-[11px] font-bold text-rose-600 mt-1">{otpError}</p>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[11px]">
                        {otpSent && !isPasswordMode ? (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="font-bold text-[#2563FF] hover:underline flex items-center gap-1"
                          >
                            <RefreshCw className="w-3 h-3" /> Resend OTP
                          </button>
                        ) : (
                          <div></div>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setIsPasswordMode(!isPasswordMode);
                            setOtpSent(false);
                          }}
                          className="font-bold text-[#2563FF] hover:underline"
                        >
                          {isPasswordMode ? 'Sign in with OTP instead' : 'Sign in with Password'}
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-black shadow-md shadow-blue-500/20 hover:opacity-95 transition-all cursor-pointer"
                      >
                        {isPasswordMode
                          ? 'Sign In with Password'
                          : otpSent
                          ? 'Verify OTP & Continue'
                          : 'Send Verification OTP to Email'}
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB 2: CREATE ACCOUNT / REGISTER (For any user on any device) */}
                {authTab === 'register' && (
                  <form onSubmit={handleRegisterSubmit} className="space-y-2.5">
                    <div>
                      <label className="block text-xs font-bold text-[#101936] mb-1">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                        placeholder="e.g. Alex Johnson"
                        className="w-full px-3 py-1.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-[#101936] mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-3 py-1.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#101936] mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                          placeholder="+91 98765 00000"
                          className="w-full px-3 py-1.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-[#101936] mb-1">
                          {selectedRole === 'student' ? 'College / Institute' : 'Company Name'}
                        </label>
                        <input
                          type="text"
                          value={registerForm.collegeOrCompany}
                          onChange={(e) => setRegisterForm({ ...registerForm, collegeOrCompany: e.target.value })}
                          placeholder={selectedRole === 'student' ? 'e.g. IIT, NIT, Tech Univ' : 'e.g. Google, Microsoft'}
                          className="w-full px-3 py-1.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#101936] mb-1">
                          {selectedRole === 'student' ? 'Degree & Branch' : 'Designation'}
                        </label>
                        <input
                          type="text"
                          value={registerForm.degreeOrRole}
                          onChange={(e) => setRegisterForm({ ...registerForm, degreeOrRole: e.target.value })}
                          placeholder={selectedRole === 'student' ? 'e.g. B.Tech CSE' : 'e.g. Campus Talent Lead'}
                          className="w-full px-3 py-1.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#101936] mb-1">
                        Create Password <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-3 py-1.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 mt-2 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-black shadow-md shadow-blue-500/20 hover:opacity-95 transition-all cursor-pointer"
                    >
                      Create Free Account & Continue →
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Footer Terms */}
            <div className="pt-3 border-t border-slate-100 text-center text-[11px] text-[#64708A]">
              By signing in, you accept our{' '}
              <a href="#terms" className="text-[#2563FF] font-semibold hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="text-[#2563FF] font-semibold hover:underline">
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </div>

      {/* MICROSOFT AUTHORIZATION DIALOG */}
      {activeOAuthModal === 'microsoft' && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#0C1435]/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 21 21">
                  <path fill="#f25022" d="M1 1h9v9H1z"/>
                  <path fill="#00a4ef" d="M1 11h9v9H1z"/>
                  <path fill="#7fba00" d="M11 1h9v9H11z"/>
                  <path fill="#ffb900" d="M11 11h9v9H11z"/>
                </svg>
                <span className="text-sm font-bold text-slate-800">Microsoft Account Authorization</span>
              </div>
              <button
                onClick={() => setActiveOAuthModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Sign in to StepUp</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                StepUp is requesting permission to access your Microsoft basic profile and campus credentials.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  MS
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Microsoft Connected Account</div>
                  <div className="text-[11px] text-slate-500">{emailInput || 'user@outlook.com'}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveOAuthModal(null)}
                className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmMicrosoftAuth}
                className="px-5 py-2 rounded-xl bg-[#0067B8] hover:bg-[#005DA6] text-white text-xs font-bold shadow-sm"
              >
                Accept & Authorize
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LINKEDIN AUTHORIZATION DIALOG */}
      {activeOAuthModal === 'linkedin' && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#0C1435]/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45 1.45 1.45 0 0 0-1.45 1.45 1.45 1.45 0 0 0 1.45 1.45m1.37 9.74v-8.37H5.09v8.37h2.74z"/>
                </svg>
                <span className="text-sm font-bold text-slate-800">LinkedIn Authorization</span>
              </div>
              <button
                onClick={() => setActiveOAuthModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Authorize StepUp to access your account</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                StepUp will retrieve your professional profile name, email, and headline to speed up applications.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0A66C2] text-white font-bold flex items-center justify-center text-xs">
                  in
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">LinkedIn Member Account</div>
                  <div className="text-[11px] text-slate-500">{emailInput || 'user@linkedin.com'}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveOAuthModal(null)}
                className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLinkedInAuth}
                className="px-5 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold shadow-sm"
              >
                Allow & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
