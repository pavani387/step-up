import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from './Logo';
import {
  Home,
  Briefcase,
  BookOpen,
  Flame,
  FileCode2,
  Code,
  LayoutDashboard,
  BarChart3,
  Building2,
  User,
  UserCheck,
  Camera,
  Upload,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Award
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    switchRole,
    userProfile,
    companyProfile,
    uploadUserPhoto,
    isGoogleVerified,
    setIsGoogleModalOpen,
    setIsDetailsSetupOpen,
    setIsAuthModalOpen,
    applications
  } = useApp();

  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          uploadUserPhoto(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'jobs', label: 'Find Jobs', icon: Briefcase, badge: applications.length },
    { id: 'learning', label: 'Learning Roadmaps', icon: BookOpen },
    { id: 'indemand', label: 'In-Demand Skills', icon: Flame, badge: 'Hot' },
    { id: 'assignments', label: 'Assessments & Sandbox', icon: Code },
    { id: 'dashboard', label: 'Candidate Dashboard', icon: BarChart3 },
    { id: 'company', label: 'Companies & Recruiter', icon: Building2 },
    { id: 'profile', label: 'My Profile & Proof', icon: UserCheck }
  ];

  const handleItemClick = (id) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#0C1435]/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Sidebar Container (Fixed Left Side) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-white border-r border-[#E6E9F0] shadow-lg lg:shadow-none flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Brand */}
        <div className="p-5 border-b border-[#E6E9F0] space-y-4">
          <div className="flex items-center justify-between">
            <div onClick={() => handleItemClick('home')} className="cursor-pointer">
              <Logo size="md" />
            </div>
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              ✕
            </button>
          </div>

          {/* Google Account Verification Status Pill */}
          <div
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full p-2.5 rounded-2xl bg-[#F7F8FC] hover:bg-blue-50/50 border border-[#E6E9F0] hover:border-[#2563FF] cursor-pointer transition-all flex items-center justify-between group"
            title="Identify account type and sign in with Google"
          >
            <div className="flex items-center gap-2 min-w-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <div className="truncate text-left">
                <div className="text-xs font-extrabold text-[#101936] flex items-center gap-1">
                  <span>{isGoogleVerified ? 'Google Verified' : 'Verify Account'}</span>
                  {isGoogleVerified && <CheckCircle2 className="w-3 h-3 text-[#10B981]" />}
                </div>
                <div className="text-[10px] text-[#64708A] truncate">
                  {currentRole === 'student' ? userProfile.email : companyProfile.email}
                </div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#2563FF] shrink-0" />
          </div>
        </div>

        {/* Middle: Navigation Items on Left Side */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-black uppercase tracking-wider text-[#64708A]">
            Navigation
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white shadow-md shadow-blue-500/20'
                    : 'text-[#64708A] hover:text-[#101936] hover:bg-[#F7F8FC]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#64708A]'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'Hot'
                        ? 'bg-rose-100 text-rose-600'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom: Profile widget customized per role */}
        <div className="p-4 border-t border-[#E6E9F0] bg-[#F7F8FC]/60 space-y-3">
          {currentRole === 'student' ? (
            /* CANDIDATE / STUDENT PROFILE CARD */
            <>
              <div className="p-3 rounded-2xl bg-white border border-[#E6E9F0] shadow-2xs flex items-center gap-3">
                {/* Clickable Photo Avatar with Camera Overlay */}
                <div className="relative group shrink-0">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#2563FF]/30 shadow-xs group-hover:opacity-80 transition-opacity"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    title="Click to upload your photo"
                  >
                    <Camera className="w-4 h-4" />
                  </button>

                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#10B981] border border-white flex items-center justify-center text-white text-[9px] font-bold">
                    ✓
                  </span>
                </div>

                {/* Hidden File Input for Direct Local Photo Upload */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                {/* Name & Academic info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div
                      onClick={() => handleItemClick('profile')}
                      className="text-xs font-black text-[#101936] hover:text-[#2563FF] cursor-pointer truncate"
                    >
                      {userProfile.name}
                    </div>
                  </div>
                  <div className="text-[10px] text-[#7B3FF2] font-semibold truncate">
                    {userProfile.degree} ({userProfile.department ? userProfile.department.split(' ')[0] : 'AI&DS'})
                  </div>
                  <div className="text-[10px] text-[#64708A] truncate">
                    {userProfile.college ? userProfile.college.split(' ')[0] : 'Tech'} • CGPA {userProfile.cgpa}
                  </div>
                </div>
              </div>

              {/* 1-Click Upload Photo & Setup Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 rounded-xl border border-dashed border-[#2563FF] hover:bg-blue-50 text-[11px] font-extrabold text-[#2563FF] transition-all flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload Photo</span>
                </button>
                <button
                  onClick={() => setIsDetailsSetupOpen(true)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-[#101936] transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Edit Details</span>
                </button>
              </div>
            </>
          ) : (
            /* RECRUITER / EMPLOYER PROFILE CARD */
            <>
              <div className="p-3 rounded-2xl bg-white border border-purple-200/80 shadow-2xs flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl p-2 bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                  <img
                    src={companyProfile.companyLogo}
                    alt={companyProfile.companyName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    onClick={() => handleItemClick('company')}
                    className="text-xs font-black text-[#101936] hover:text-[#7B3FF2] cursor-pointer truncate"
                  >
                    {companyProfile.name}
                  </div>
                  <div className="text-[10px] text-[#7B3FF2] font-semibold truncate">
                    {companyProfile.companyName} • Talent Lead
                  </div>
                  <div className="text-[10px] text-[#64708A] truncate">
                    {companyProfile.location}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleItemClick('company')}
                  className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-[#7B3FF2] to-[#2563FF] text-white text-[11px] font-extrabold transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <span>Post a Job ➕</span>
                </button>
                <button
                  onClick={() => handleItemClick('company')}
                  className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[11px] font-bold text-[#7B3FF2] transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Recruiter Hub</span>
                </button>
              </div>
            </>
          )}

          {/* Quick Role Switcher */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px]">
            <span className="font-semibold text-[#64708A]">Active View:</span>
            <div className="flex gap-1">
              <button
                onClick={() => switchRole('student')}
                className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                  currentRole === 'student'
                    ? 'bg-[#2563FF] text-white'
                    : 'text-slate-500 hover:bg-slate-200'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => switchRole('company')}
                className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                  currentRole === 'company'
                    ? 'bg-[#7B3FF2] text-white'
                    : 'text-slate-500 hover:bg-slate-200'
                }`}
              >
                Recruiter
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
