import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Briefcase,
  BookOpen,
  Layers,
  FileCheck,
  TrendingUp,
  ArrowRight,
  Flame,
  Award,
  CheckCircle2,
  AlertTriangle,
  Play,
  Calendar
} from 'lucide-react';

export default function CandidateDashboardPage() {
  const {
    userProfile,
    jobs,
    courses,
    applications,
    setActiveTab,
    resumeAnalysis
  } = useApp();

  const skillsToLearn = [
    { name: 'Machine Learning', reason: 'High demand for AI & Data Analyst roles (+42% hiring surge)' },
    { name: 'SQL & Data Warehousing', reason: 'Required for 90% of Big Tech analytics positions' },
    { name: 'AWS Cloud & Docker', reason: 'Critical missing gap detected on your resume analysis' },
    { name: 'Power BI / DAX', reason: 'Top skill sought by Microsoft, Deloitte, & Accenture' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Greeting & Profile Completeness Hero */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0C1435] via-[#141B44] to-[#7B3FF2] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs text-blue-300 font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" /> Candidate Control Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Hello, {userProfile.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {userProfile.degree} ({userProfile.department}) • {userProfile.college}
          </p>
        </div>

        {/* Profile Completion Box (Matching User Specification 10) */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 w-full sm:max-w-xs space-y-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold">
            <span>Profile Completion</span>
            <span className="text-blue-300">{userProfile.profileCompletion}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${userProfile.profileCompletion}%` }}
            ></div>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="text-[11px] text-blue-200 hover:text-white font-semibold flex items-center gap-1 pt-1"
          >
            Complete profile achievements <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 4 Metric Summary Tiles (Matching User Specification 10) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Recommended Jobs */}
        <div
          onClick={() => setActiveTab('jobs')}
          className="p-5 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:border-[#2563FF] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-[#64708A] mb-2">
            <span>Recommended Jobs</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563FF] flex items-center justify-center font-bold">
              💼
            </div>
          </div>
          <div className="text-3xl font-black text-[#101936] group-hover:text-[#2563FF] transition-colors">
            12
          </div>
          <div className="text-[11px] text-[#2563FF] font-semibold mt-1 flex items-center gap-1">
            <span>View matched openings</span> <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Recommended Courses */}
        <div
          onClick={() => setActiveTab('learning')}
          className="p-5 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:border-[#7B3FF2] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-[#64708A] mb-2">
            <span>Recommended Courses</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7B3FF2] flex items-center justify-center font-bold">
              📚
            </div>
          </div>
          <div className="text-3xl font-black text-[#101936] group-hover:text-[#7B3FF2] transition-colors">
            5
          </div>
          <div className="text-[11px] text-[#7B3FF2] font-semibold mt-1 flex items-center gap-1">
            <span>Start learning roadmaps</span> <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Assignments */}
        <div
          onClick={() => setActiveTab('assignments')}
          className="p-5 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-[#64708A] mb-2">
            <span>Assessments</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              📝
            </div>
          </div>
          <div className="text-3xl font-black text-[#101936] group-hover:text-amber-600 transition-colors">
            3
          </div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1 flex items-center gap-1">
            <span>Solve domain tasks</span> <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Applications */}
        <div
          onClick={() => setActiveTab('jobs')}
          className="p-5 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-[#64708A] mb-2">
            <span>Applications</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center font-bold">
              🎯
            </div>
          </div>
          <div className="text-3xl font-black text-[#101936] group-hover:text-[#10B981] transition-colors">
            {applications.length || 7}
          </div>
          <div className="text-[11px] text-[#10B981] font-semibold mt-1 flex items-center gap-1">
            <span>Track pipeline status</span> <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Main 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Skills You Should Learn (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E9F0]">
              <div>
                <h3 className="text-lg font-black text-[#101936] flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" /> 🔥 Skills You Should Learn
                </h3>
                <p className="text-xs text-[#64708A] mt-0.5">
                  Prioritized based on your current resume gap analysis
                </p>
              </div>
              <button
                onClick={() => setActiveTab('indemand')}
                className="text-xs font-bold text-[#2563FF] hover:underline"
              >
                Scan Resume
              </button>
            </div>

            <div className="space-y-3">
              {skillsToLearn.map((sk, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTab('learning')}
                  className="p-4 rounded-2xl bg-[#F7F8FC] hover:bg-blue-50/40 border border-[#E6E9F0] hover:border-[#2563FF] transition-all cursor-pointer flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-xs text-[#2563FF] shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#101936] group-hover:text-[#2563FF] transition-colors">
                        {sk.name}
                      </h4>
                      <p className="text-xs text-[#64708A] mt-0.5">{sk.reason}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2563FF] group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('learning')}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-extrabold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Recommended Learning Paths</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Your Career Match Breakdown (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E9F0]">
              <div>
                <h3 className="text-lg font-black text-[#101936] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#2563FF]" /> 🎯 Your Career Match
                </h3>
                <p className="text-xs text-[#64708A] mt-0.5">
                  AI match scores for key industry roles
                </p>
              </div>
              <button
                onClick={() => setActiveTab('jobs')}
                className="text-xs font-bold text-[#2563FF] hover:underline"
              >
                View Jobs
              </button>
            </div>

            <div className="space-y-4">
              {userProfile.careerMatches.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-extrabold text-[#101936]">{m.role}</span>
                      <span className="text-[11px] text-[#64708A] ml-2">Avg: {m.avgSalary}</span>
                    </div>
                    <span className="text-sm font-black text-[#2563FF]">{m.match}%</span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-700 ${
                        idx === 0
                          ? 'bg-gradient-to-r from-[#2563FF] to-[#7B3FF2]'
                          : idx === 1
                          ? 'bg-blue-600'
                          : 'bg-purple-500'
                      }`}
                      style={{ width: `${m.match}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#64708A]">
                    <span>Market Demand: <strong className="text-[#101936]">{m.demand}</strong></span>
                    <button
                      onClick={() => setActiveTab('jobs')}
                      className="text-[#2563FF] font-bold hover:underline"
                    >
                      Find matching openings →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
