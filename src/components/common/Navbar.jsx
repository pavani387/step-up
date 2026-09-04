import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from './Logo';
import {
  Search,
  Bell,
  User,
  Briefcase,
  ChevronDown,
  Building,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  LogOut,
  Flame,
  Camera
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
    isGoogleVerified,
    setIsDetailsSetupOpen,
    isAuthenticated,
    logoutUser
  } = useApp();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Interview Scheduled! 🎯',
      desc: 'Analytics Lead scheduled your interview for Sep 08, 2026.',
      time: '10m ago',
      unread: true
    },
    {
      id: 2,
      title: 'Resume Matched 91% 🔥',
      desc: 'Your profile is a 91% match for Data Analyst roles.',
      time: '1h ago',
      unread: true
    },
    {
      id: 3,
      title: 'Assessment Cleared 🏆',
      desc: 'Score: 92/100 in Python & SQL Core Assessment.',
      time: '1d ago',
      unread: false
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E6E9F0] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Left Sidebar Trigger (No duplicate top nav links) */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-[#64708A] hover:text-[#101936] hover:bg-slate-100 transition-colors"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div onClick={() => setActiveTab('home')} className="cursor-pointer">
              <Logo size="md" />
            </div>

            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-[#E6E9F0] text-xs font-semibold text-[#64708A]">
              <span>Learn</span>
              <span>•</span>
              <span>Build</span>
              <span>•</span>
              <span>Apply</span>
              <span>•</span>
              <span>Grow</span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Bar Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E6E9F0] bg-[#F7F8FC] hover:bg-white text-xs font-medium text-[#64708A] hover:text-[#101936] hover:border-slate-300 transition-all shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-[#2563FF]" />
              <span>Search jobs, skills...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-500">
                Ctrl K
              </kbd>
            </button>

            {/* Authentication Condition: If Not Signed In, show Sign In / Identify Account */}
            {!isAuthenticated ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:opacity-95 transition-all cursor-pointer"
              >
                <span>Sign In / Choose Role</span>
              </button>
            ) : (
              <>
                {/* Google Account Verification & Details Button */}
                <button
                  onClick={() => setIsDetailsSetupOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#101936] shadow-2xs transition-all cursor-pointer"
                  title="Update Candidate Profile Details"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  <span className="hidden sm:inline">
                    {isGoogleVerified ? 'Verified ✓' : 'Update Profile'}
                  </span>
                </button>

                {/* Role Switcher Pill */}
                <div className="relative">
                  <button
                    onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-2xs ${
                      currentRole === 'student'
                        ? 'bg-blue-50 text-[#2563FF] border-blue-200'
                        : currentRole === 'company'
                        ? 'bg-purple-50 text-[#7B3FF2] border-purple-200'
                        : 'bg-emerald-50 text-[#10B981] border-emerald-200'
                    }`}
                  >
                    <span className="capitalize">{currentRole === 'student' ? 'Candidate' : currentRole}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Role Dropdown */}
                  {isRoleMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#E6E9F0] p-2 z-50 animate-in fade-in"
                      onClick={() => setIsRoleMenuOpen(false)}
                    >
                      <div className="text-[10px] font-black uppercase text-[#64708A] px-3 py-1">
                        Active Role View
                      </div>
                      <button
                        onClick={() => switchRole('student')}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                          currentRole === 'student' ? 'bg-blue-50 text-[#2563FF]' : 'text-[#101936] hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" /> Candidate / Student
                        </div>
                        {currentRole === 'student' && <CheckCircle2 className="w-4 h-4 text-[#2563FF]" />}
                      </button>

                      <button
                        onClick={() => switchRole('company')}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                          currentRole === 'company' ? 'bg-purple-50 text-[#7B3FF2]' : 'text-[#101936] hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" /> Employer / Recruiter
                        </div>
                        {currentRole === 'company' && <CheckCircle2 className="w-4 h-4 text-[#7B3FF2]" />}
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

                      <div className="space-y-1">
                        <button
                          onClick={() => setIsDetailsSetupOpen(true)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#2563FF] hover:bg-blue-50 transition-colors"
                        >
                          <Sparkles className="w-4 h-4 text-[#2563FF]" /> Update Profile Details
                        </button>

                        <button
                          onClick={() => setActiveTab('profile')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#101936] hover:bg-slate-50 transition-colors"
                        >
                          <User className="w-4 h-4 text-[#7B3FF2]" /> View Full Profile
                        </button>

                        <button
                          onClick={() => setActiveTab('jobs')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#101936] hover:bg-slate-50 transition-colors"
                        >
                          <Briefcase className="w-4 h-4 text-[#2563FF]" /> My Applications ({applications.length})
                        </button>

                        <div className="border-t border-[#E6E9F0] my-1"></div>

                        <button
                          onClick={logoutUser}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out / Switch Account
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
