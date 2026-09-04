import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Building,
  Award,
  Sparkles,
  Plus,
  Code,
  ExternalLink,
  CheckCircle2,
  Trash2,
  Upload,
  X,
  FileCheck2,
  FileBadge,
  Share2,
  Edit3,
  Globe,
  Link2,
  Camera,
  MapPin,
  Briefcase
} from 'lucide-react';

export default function ProfilePage() {
  const {
    currentRole,
    companyProfile,
    jobs,
    setActiveTab,
    userProfile,
    setUserProfile,
    uploadUserPhoto,
    achievements,
    addAchievement,
    deleteAchievement,
    triggerCelebration,
    showToast,
    isGoogleVerified,
    googleAccount,
    setIsGoogleModalOpen,
    setIsDetailsSetupOpen
  } = useApp();

  const photoInputRef = React.useRef(null);

  const handlePhotoFileChange = (e) => {
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

  const [isAddAchOpen, setIsAddAchOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');

  // New Achievement Form State
  const [achForm, setAchForm] = useState({
    title: '',
    type: 'Hackathon',
    issuer: '',
    description: '',
    date: 'September 2026',
    certificateFileName: ''
  });

  // Edit Profile Form State
  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    college: userProfile.college,
    degree: userProfile.degree,
    department: userProfile.department,
    graduationYear: userProfile.graduationYear,
    cgpa: userProfile.cgpa,
    github: userProfile.github,
    linkedin: userProfile.linkedin,
    hackerrank: userProfile.hackerrank
  });

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() && !userProfile.skills.includes(newSkillInput.trim())) {
      const updated = [...userProfile.skills, newSkillInput.trim()];
      setUserProfile((prev) => ({ ...prev, skills: updated }));
      setNewSkillInput('');
      showToast('Skill Added', `${newSkillInput.trim()} added to your profile skills.`, 'success');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setUserProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove)
    }));
  };

  const handleAchSubmit = (e) => {
    e.preventDefault();
    if (!achForm.title || !achForm.description) return;

    addAchievement({
      title: achForm.title,
      type: achForm.type,
      issuer: achForm.issuer || 'Recognized Tech Organization',
      description: achForm.description,
      date: achForm.date
    });

    setAchForm({
      title: '',
      type: 'Hackathon',
      issuer: '',
      description: '',
      date: 'September 2026',
      certificateFileName: ''
    });

    setIsAddAchOpen(false);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setUserProfile((prev) => ({
      ...prev,
      ...editForm,
      graduationYear: Number(editForm.graduationYear),
      cgpa: parseFloat(editForm.cgpa)
    }));
    setIsEditProfileOpen(false);
    showToast('Profile Updated', 'Your educational & contact details were updated.', 'success');
  };

  const getAchIcon = (type) => {
    if (type.includes('Hackathon')) return '🏆';
    if (type.includes('Certif')) return '📜';
    if (type.includes('Competition') || type.includes('Badge')) return '🥇';
    return '🚀';
  };

  // If in Recruiter role, render the Recruiter & Company Profile!
  if (currentRole === 'company') {
    const companyJobs = jobs.filter((j) =>
      j.company?.toLowerCase().includes(companyProfile.companyName.toLowerCase())
    );

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
        {/* Recruiter & Company Hero */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-purple-50 p-4 border-2 border-purple-200 shadow-md flex items-center justify-center shrink-0">
                <img
                  src={companyProfile.companyLogo}
                  alt={companyProfile.companyName}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#101936]">
                    {companyProfile.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#7B3FF2] text-xs font-extrabold border border-purple-200">
                    Recruiter Profile
                  </span>
                </div>
                <p className="text-sm font-bold text-[#2563FF]">
                  {companyProfile.companyName} • Campus Talent Acquisition Lead
                </p>
                <p className="text-xs text-[#64708A] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {companyProfile.location} • {companyProfile.industry}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('company')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7B3FF2] to-[#2563FF] text-white text-xs font-extrabold shadow-md shadow-purple-500/20 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Job Opening</span>
              </button>
              <button
                onClick={() => setActiveTab('company')}
                className="px-4 py-2.5 rounded-xl border border-[#E6E9F0] hover:bg-slate-50 text-xs font-bold text-[#101936] transition-all flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-[#7B3FF2]" />
                <span>Go to Recruiter Hub</span>
              </button>
            </div>
          </div>
        </div>

        {/* Company Overview & Hiring Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Company Info & Jobs */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-4">
              <h2 className="text-lg font-black text-[#101936] flex items-center gap-2">
                <Building className="w-5 h-5 text-[#7B3FF2]" />
                <span>About {companyProfile.companyName}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#64708A] leading-relaxed">
                {companyProfile.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[#64708A] font-medium block">Official Website</span>
                  <a
                    href={companyProfile.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2563FF] font-bold hover:underline flex items-center gap-1 mt-0.5"
                  >
                    {companyProfile.website} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <span className="text-[#64708A] font-medium block">Recruiting Email</span>
                  <span className="text-[#101936] font-bold block mt-0.5">{companyProfile.email}</span>
                </div>
              </div>
            </div>

            {/* Active Company Job Postings */}
            <div className="p-8 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-[#101936] flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#2563FF]" />
                  <span>Active Job Postings ({companyJobs.length})</span>
                </h2>
                <button
                  onClick={() => setActiveTab('company')}
                  className="text-xs font-bold text-[#2563FF] hover:underline"
                >
                  Manage in Recruiter Hub →
                </button>
              </div>

              <div className="space-y-3">
                {companyJobs.slice(0, 4).map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-[#101936]">{job.title}</h4>
                      <p className="text-[11px] text-[#64708A]">
                        {job.location} • {job.salary} • {job.jobType}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Recruiter Identity Card */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-4">
              <h3 className="text-sm font-black text-[#101936]">Recruiter Identity</h3>
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-3">
                <div>
                  <div className="text-xs font-bold text-slate-800">{companyProfile.name}</div>
                  <div className="text-[11px] text-[#7B3FF2] font-semibold">
                    {companyProfile.companyName} Campus Hiring
                  </div>
                  <div className="text-[11px] text-slate-500">{companyProfile.email}</div>
                  <div className="text-[11px] text-slate-500">{companyProfile.phone}</div>
                </div>
                <div className="pt-2 border-t border-purple-200/60 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-700">Verification</span>
                  <span className="font-black text-emerald-700">Verified Partner ✓</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('company')}
                className="w-full py-2.5 rounded-xl bg-[#0C1435] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Open Candidate Pipeline
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Hero Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Clickable Profile Photo with Camera Upload Badge */}
            <div className="flex flex-col items-center gap-2">
              <div
                onClick={() => photoInputRef.current?.click()}
                className="relative group cursor-pointer"
                title="Click to upload new profile photo"
              >
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-blue-500/20 shadow-lg group-hover:opacity-85 transition-opacity"
                />
                <div className="absolute inset-0 rounded-3xl bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-bold">Change Photo</span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-xs">
                  ✓
                </span>
              </div>

              {/* Hidden File Input for Local Image Selection */}
              <input
                type="file"
                ref={photoInputRef}
                accept="image/*"
                onChange={handlePhotoFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="px-3 py-1 rounded-xl border border-dashed border-[#2563FF] hover:bg-blue-50 text-[11px] font-bold text-[#2563FF] transition-colors flex items-center gap-1 shadow-2xs"
              >
                <Upload className="w-3 h-3" />
                <span>Upload Photo</span>
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[#101936]">
                  {userProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563FF] text-xs font-extrabold border border-blue-200">
                  Verified Candidate
                </span>
              </div>
              <p className="text-sm font-bold text-[#7B3FF2]">
                {userProfile.degree} — {userProfile.department}
              </p>
              <p className="text-xs text-[#64708A] flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" /> {userProfile.college}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (isGoogleVerified) {
                  setIsDetailsSetupOpen(true);
                } else {
                  setIsGoogleModalOpen(true);
                }
              }}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#101936] transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>{isGoogleVerified ? 'Google Verified 🛡️' : 'Verify with Google'}</span>
            </button>
            <button
              onClick={() => setIsDetailsSetupOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-bold text-[#2563FF] transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" /> Setup Details (Unstop Style)
            </button>
            <button
              onClick={() => setIsAddAchOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-extrabold shadow-md shadow-blue-500/20 hover:opacity-95 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Achievement
            </button>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="mt-8 pt-6 border-t border-[#E6E9F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:max-w-md space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#101936]">
              <span>Profile Completeness</span>
              <span className="text-[#2563FF]">{userProfile.profileCompletion}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] h-2 rounded-full transition-all duration-500"
                style={{ width: `${userProfile.profileCompletion}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#64708A]">
            <a
              href={userProfile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-semibold text-[#101936] hover:text-[#2563FF]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
            <a
              href={userProfile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-semibold text-[#101936] hover:text-[#2563FF]"
            >
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45 1.45 1.45 0 0 0-1.45 1.45 1.45 1.45 0 0 0 1.45 1.45m1.37 9.74v-8.37H5.09v8.37h2.74z"/></svg>
              LinkedIn
            </a>
            <a
              href={userProfile.hackerrank}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-semibold text-[#101936] hover:text-[#10B981]"
            >
              <Code className="w-4 h-4 text-emerald-600" /> HackerRank (5★)
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Academic & Contact Information (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Academic Stats Box */}
          <div className="p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#64708A] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#2563FF]" /> Academic Background
            </h3>

            <div className="space-y-3 text-xs text-[#101936]">
              <div className="p-3 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0]">
                <div className="text-[10px] text-[#64708A]">College / University</div>
                <div className="font-bold text-sm mt-0.5">{userProfile.college}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0]">
                  <div className="text-[10px] text-[#64708A]">Degree</div>
                  <div className="font-bold mt-0.5">{userProfile.degree}</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0]">
                  <div className="text-[10px] text-[#64708A]">Batch / Year</div>
                  <div className="font-bold mt-0.5">{userProfile.graduationYear}</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#2563FF] font-bold">Cumulative CGPA</div>
                  <div className="text-lg font-black text-[#101936]">{userProfile.cgpa} / 10.0</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-white text-[#2563FF] shadow-2xs">
                  Top 5% Batch
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details Box */}
          <div className="p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#64708A]">
              Contact Details
            </h3>
            <div className="space-y-2.5 text-xs text-[#101936]">
              <div className="flex items-center gap-2.5 text-slate-700">
                <Mail className="w-4 h-4 text-[#2563FF]" /> {userProfile.email}
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <Phone className="w-4 h-4 text-[#7B3FF2]" /> {userProfile.phone}
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <Building className="w-4 h-4 text-slate-400" /> {userProfile.location}
              </div>
            </div>
          </div>

          {/* Skills Cloud */}
          <div className="p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#64708A]">
                Validated Skills ({userProfile.skills.length})
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {userProfile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F8FC] text-[#101936] text-xs font-semibold border border-[#E6E9F0] hover:border-[#2563FF] transition-colors"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Quick Add Skill Input */}
            <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="+ Add skill..."
                className="flex-1 px-3 py-1.5 rounded-xl border border-[#E6E9F0] text-xs outline-none focus:border-[#2563FF]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-[#2563FF] text-white text-xs font-bold hover:bg-blue-700"
              >
                Add
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Achievements & Career Proof Timeline (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6E9F0]">
              <div>
                <h3 className="text-xl font-black text-[#101936] flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#7B3FF2]" /> Dynamic Achievements & Certifications
                </h3>
                <p className="text-xs text-[#64708A] mt-0.5">
                  Frequently updated achievements showcase your continuous growth beyond static resumes
                </p>
              </div>

              <button
                onClick={() => setIsAddAchOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold shadow-xs hover:opacity-95 flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Achievement</span>
              </button>
            </div>

            {/* Achievements List */}
            <div className="space-y-4">
              {achievements.map((ach) => {
                const iconSymbol = getAchIcon(ach.type);

                return (
                  <div
                    key={ach.id}
                    className="p-5 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] hover:border-[#7B3FF2] hover:bg-white shadow-2xs hover:shadow-md transition-all space-y-3 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-white border border-purple-200/70 flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                          {iconSymbol}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-extrabold text-[#101936]">{ach.title}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#7B3FF2]">
                              {ach.type}
                            </span>
                          </div>
                          <p className="text-xs text-[#64708A] mt-0.5">
                            Issued by: <strong>{ach.issuer}</strong> • {ach.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          ✓ Verified
                        </span>
                        <button
                          onClick={() => deleteAchievement(ach.id)}
                          className="p-1 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove achievement"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-[#64708A] leading-relaxed pl-14">
                      {ach.description}
                    </p>

                    <div className="pl-14 pt-2 flex items-center gap-4 text-xs">
                      <a
                        href={ach.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-[#2563FF] hover:underline flex items-center gap-1"
                      >
                        <FileBadge className="w-3.5 h-3.5" /> View Credential Certificate
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: ADD ACHIEVEMENT MODAL (Matching User Specification 7) */}
      {isAddAchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C1435]/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E6E9F0] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-[#E6E9F0] flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-[#101936] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#7B3FF2]" /> + Add New Achievement
                </h3>
                <p className="text-xs text-[#64708A]">
                  Publish your latest hackathon win, project milestone, or certification
                </p>
              </div>
              <button
                onClick={() => setIsAddAchOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAchSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">
                  Achievement Title *
                </label>
                <input
                  type="text"
                  required
                  value={achForm.title}
                  onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                  placeholder="e.g. AI Hackathon 2026 — 2nd Place"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">
                    Achievement Category
                  </label>
                  <select
                    value={achForm.type}
                    onChange={(e) => setAchForm({ ...achForm, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none bg-white"
                  >
                    <option value="Hackathon">🏆 Hackathon</option>
                    <option value="Certification">📜 Certification</option>
                    <option value="Coding Competition">🥇 Coding Competition</option>
                    <option value="Research & Project">🚀 Project / Research</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Date Achieved</label>
                  <input
                    type="text"
                    value={achForm.date}
                    onChange={(e) => setAchForm({ ...achForm, date: e.target.value })}
                    placeholder="e.g. September 2026"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">
                  Issuing Organization / Event
                </label>
                <input
                  type="text"
                  value={achForm.issuer}
                  onChange={(e) => setAchForm({ ...achForm, issuer: e.target.value })}
                  placeholder="e.g. Microsoft & National AI Conclave"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">
                  Description & Impact *
                </label>
                <textarea
                  rows={3}
                  required
                  value={achForm.description}
                  onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
                  placeholder="Secured 2nd position among 450+ collegiate teams for developing a generative AI agricultural detector..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none resize-none"
                />
              </div>

              {/* Certificate Upload Simulation */}
              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">
                  Upload Certificate / Proof
                </label>
                <div className="border border-dashed border-[#2563FF]/40 rounded-xl p-3 bg-blue-50/30 text-center flex items-center justify-center gap-2 text-xs text-[#2563FF]">
                  <Upload className="w-4 h-4" />
                  <span>[ Upload Certificate PDF / JPG ]</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6E9F0]">
                <button
                  type="button"
                  onClick={() => setIsAddAchOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-bold text-[#64708A] hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-extrabold shadow-md hover:opacity-95"
                >
                  Publish Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PROFILE MODAL */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C1435]/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E6E9F0] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-[#F7F8FC] border-b border-[#E6E9F0] flex items-center justify-between">
              <h3 className="text-lg font-black text-[#101936]">Edit Candidate Profile</h3>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProfileSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">College Name</label>
                <input
                  type="text"
                  value={editForm.college}
                  onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Degree</label>
                  <input
                    type="text"
                    value={editForm.degree}
                    onChange={(e) => setEditForm({ ...editForm, degree: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Batch</label>
                  <input
                    type="number"
                    value={editForm.graduationYear}
                    onChange={(e) => setEditForm({ ...editForm, graduationYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editForm.cgpa}
                    onChange={(e) => setEditForm({ ...editForm, cgpa: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#2563FF] text-white text-xs font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
