import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from './Logo';
import {
  Search,
  Bell,
  User,
  Briefcase,
  BookOpen,
  Sparkles,
  Award,
  Building,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  ShieldAlert,
  Flame
} from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    switchRole,
    userProfile,
    companyProfile,
    applications,
    setIsSearchOpen,
    setIsAuthModalOpen,
    setAuthMode,
    isGoogleVerified,
    setIsGoogleModalOpen,
    setIsDetailsSetupOpen
  } = useApp();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Interview Scheduled! 🎯',
      desc: 'Microsoft Analytics Lead scheduled your interview for Sep 08, 2026.',
      time: '10m ago',
      unread: true
    },
    {
      id: 2,
      title: 'New In-Demand Skill Alert 🔥',
      desc: 'Docker & Kubernetes demand increased by 34% for AI roles.',
      time: '1h ago',
      unread: true
    },
    {
      id: 3,
      title: 'Assessment Assigned 📝',
      desc: 'Customer Churn Prediction assessment is ready to start.',
      time: '1d ago',
      unread: false
    }
  ];

  const navLinks = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'jobs', label: 'Jobs', icon: null, badge: applications.length },
    { id: 'learning', label: 'Learning', icon: null },
    { id: 'indemand', label: 'In-Demand', icon: Flame, highlight: true },
    { id: 'assignments', label: 'Assignments', icon: null },
    { id: 'company', label: currentRole === 'company' ? 'Recruiter Hub' : 'Companies', icon: null },
    { id: 'profile', label: 'Profile', icon: null }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E6E9F0] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <div onClick={() => handleNavClick('home')}>
              <Logo size="md" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#2563FF] bg-blue-50/70 shadow-xs'
                        : 'text-[#64708A] hover:text-[#101936] hover:bg-slate-50'
                    }`}
                  >
                    {Icon && <Icon className={`w-4 h-4 ${link.highlight ? 'text-amber-500' : ''}`} />}
                    <span>{link.label}</span>
                    {link.badge !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-[#2563FF] text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                    {link.highlight && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Global Search Bar Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E6E9F0] bg-[#F7F8FC] hover:bg-white text-xs font-medium text-[#64708A] hover:text-[#101936] hover:border-slate-300 transition-all shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-[#2563FF]" />
              <span>Search jobs, skills...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-500">
                Ctrl K
              </kbd>
            </button>

            {/* Google Account Verification & Login Modal Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#101936] shadow-2xs transition-all cursor-pointer"
              title="Identify Account Type & Sign In"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span className="hidden sm:inline">
                {isGoogleVerified ? 'Google Verified ✓' : 'Sign in with Google'}
              </span>
            </button>

            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-2xs ${
                  currentRole === 'student'
                    ? 'bg-blue-50 text-[#2563FF] border-blue-200'
                    : currentRole === 'company'
                    ? 'bg-purple-50 text-[#7B3FF2] border-purple-200'
                    : 'bg-emerald-50 text-[#10B981] border-emerald-200'
                }`}
              >
                <span>
                  {currentRole === 'student' && '👨🎓 Student'}
                  {currentRole === 'company' && '🏢 Recruiter'}
                  {currentRole === 'admin' && '👨💼 Admin'}
                </span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isRoleMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E6E9F0] p-2 z-50 animate-in fade-in"
                  onClick={() => setIsRoleMenuOpen(false)}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64708A] px-3 py-1.5">
                    Switch Active Mode
                  </div>
                  <button
                    onClick={() => switchRole('student')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                      currentRole === 'student' ? 'bg-blue-50 text-[#2563FF]' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">👨🎓</span>
                      <div>
                        <div>Candidate (Pavs)</div>
                        <div className="text-[10px] text-[#64708A] font-normal">Student & Job Seeker</div>
                      </div>
                    </div>
                    {currentRole === 'student' && <CheckCircle2 className="w-4 h-4 text-[#2563FF]" />}
                  </button>

                  <button
                    onClick={() => switchRole('company')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                      currentRole === 'company' ? 'bg-purple-50 text-[#7B3FF2]' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🏢</span>
                      <div>
                        <div>Recruiter (Google HR)</div>
                        <div className="text-[10px] text-[#64708A] font-normal">Post Jobs & Review Candidates</div>
                      </div>
                    </div>
                    {currentRole === 'company' && <CheckCircle2 className="w-4 h-4 text-[#7B3FF2]" />}
                  </button>

                  <button
                    onClick={() => switchRole('admin')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                      currentRole === 'admin' ? 'bg-emerald-50 text-[#10B981]' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">👨💼</span>
                      <div>
                        <div>Administrator</div>
                        <div className="text-[10px] text-[#64708A] font-normal">Manage platform & metrics</div>
                      </div>
                    </div>
                    {currentRole === 'admin' && <CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-xl text-[#64708A] hover:text-[#101936] hover:bg-slate-100 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2563FF] rounded-full ring-2 ring-white"></span>
              </button>

              {isNotificationsOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#E6E9F0] p-4 z-50 animate-in fade-in"
                  onClick={() => setIsNotificationsOpen(false)}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#E6E9F0]">
                    <h4 className="text-sm font-bold text-[#101936]">Notifications</h4>
                    <span className="text-xs text-[#2563FF] font-semibold cursor-pointer hover:underline">
                      Mark all as read
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 mt-2 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2.5 hover:bg-slate-50 rounded-xl px-2 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between">
                          <h5 className="text-xs font-bold text-[#101936]">{n.title}</h5>
                          <span className="text-[10px] text-[#64708A]">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-[#64708A] mt-0.5 leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="w-full mt-3 py-2 text-center text-xs font-bold text-[#2563FF] bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    View All Activity Tracker
                  </button>
                </div>
              )}
            </div>

            {/* Profile Avatar / Quick Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2 rounded-full border border-[#E6E9F0] hover:border-slate-300 transition-all bg-white"
              >
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-bold text-[#101936] leading-none">
                    {currentRole === 'student' ? userProfile.name : companyProfile.name}
                  </div>
                  <div className="text-[10px] text-[#7B3FF2] font-semibold mt-0.5">
                    {currentRole === 'student' ? `${userProfile.profileCompletion}% Complete` : companyProfile.companyName}
                  </div>
                </div>
                <img
                  src={currentRole === 'student' ? userProfile.avatar : companyProfile.companyLogo}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#2563FF]/30"
                />
              </button>

              {isProfileMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E6E9F0] p-3 z-50 animate-in fade-in"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3 p-2 bg-[#F7F8FC] rounded-xl mb-2">
                    <img
                      src={currentRole === 'student' ? userProfile.avatar : companyProfile.companyLogo}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="overflow-hidden">
                      <div className="text-sm font-bold text-[#101936] truncate">
                        {currentRole === 'student' ? userProfile.name : companyProfile.name}
                      </div>
                      <div className="text-xs text-[#64708A] truncate">{userProfile.email}</div>
                    </div>
                  </div>

                  {currentRole === 'student' && (
                    <div className="px-2 py-2 mb-2 bg-purple-50/50 rounded-xl border border-purple-100">
                      <div className="flex items-center justify-between text-xs font-bold text-[#7B3FF2] mb-1">
                        <span>Profile Completion</span>
                        <span>{userProfile.profileCompletion}%</span>
                      </div>
                      <div className="w-full bg-purple-200/60 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${userProfile.profileCompletion}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#101936] hover:bg-slate-50 transition-colors"
                    >
                      <User className="w-4 h-4 text-[#2563FF]" /> View Full Profile
                    </button>
                    <button
                      onClick={() => setActiveTab('jobs')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#101936] hover:bg-slate-50 transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-[#7B3FF2]" /> My Applications ({applications.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('indemand')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#101936] hover:bg-slate-50 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" /> Resume Analyzer
                    </button>
                    <div className="border-t border-[#E6E9F0] my-1"></div>
                    <button
                      onClick={() => {
                        setAuthMode('login');
                        setIsAuthModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      Account Sign In / Switch
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                if (onToggleSidebar) {
                  onToggleSidebar();
                } else {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }
              }}
              className="lg:hidden p-2 rounded-xl text-[#64708A] hover:text-[#101936] hover:bg-slate-100"
              title="Toggle Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E6E9F0] bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4">
          <div className="mb-3">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] bg-[#F7F8FC] text-sm text-[#64708A]"
            >
              <Search className="w-4 h-4 text-[#2563FF]" /> Search jobs, skills, companies...
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left transition-all ${
                    isActive ? 'bg-blue-50 text-[#2563FF]' : 'text-[#101936] hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-[#2563FF] font-bold">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
