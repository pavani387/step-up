import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Briefcase,
  BookOpen,
  Flame,
  FileText,
  Building2,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Layers,
  Star,
  Users,
  Check
} from 'lucide-react';

export default function HomePage() {
  const {
    setActiveTab,
    jobs,
    courses,
    applyToJob,
    setIsSearchOpen,
    isGoogleVerified,
    setIsGoogleModalOpen,
    setIsDetailsSetupOpen
  } = useApp();
  const [searchWord, setSearchWord] = useState('');

  const featuredJobs = jobs.slice(0, 3);
  const featuredCourses = courses.slice(0, 3);

  const recommendedRoles = [
    { name: 'AI Engineer', demand: 'Explosive 🔥', count: '340+ Jobs', tab: 'jobs' },
    { name: 'Data Analyst', demand: 'High 📈', count: '520+ Jobs', tab: 'jobs' },
    { name: 'Web Developer', demand: 'Steady ⚡', count: '780+ Jobs', tab: 'jobs' },
    { name: 'ML Engineer', demand: 'Very High 🚀', count: '290+ Jobs', tab: 'jobs' },
    { name: 'Software Engineer', demand: 'Massive 💼', count: '1,100+ Jobs', tab: 'jobs' },
    { name: 'Cyber Security', demand: 'High 🛡️', count: '180+ Jobs', tab: 'jobs' }
  ];

  const careerLoopSteps = [
    { step: 1, title: 'Profile', desc: 'Academics & Skills', icon: '👤', color: 'from-blue-500 to-blue-600' },
    { step: 2, title: 'Resume Analysis', desc: 'Instant NLP Parse', icon: '📄', color: 'from-blue-600 to-indigo-600' },
    { step: 3, title: 'Missing Skills', desc: 'Gap Identification', icon: '⚠️', color: 'from-indigo-600 to-purple-600' },
    { step: 4, title: 'Learning', desc: 'Targeted Roadmaps', icon: '📚', color: 'from-purple-600 to-purple-700' },
    { step: 5, title: 'Assignments', desc: 'Real-world Projects', icon: '📝', color: 'from-purple-700 to-fuchsia-600' },
    { step: 6, title: 'Skill Score', desc: 'Verified Badges', icon: '⭐', color: 'from-fuchsia-600 to-pink-600' },
    { step: 7, title: 'Recommended Jobs', desc: 'Direct Matching', icon: '💼', color: 'from-pink-600 to-rose-600' },
    { step: 8, title: 'Apply & Grow', desc: 'Hired at Top Tech', icon: '🎯', color: 'from-rose-600 to-emerald-600' }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2563FF]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#7B3FF2]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E6E9F0] shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7B3FF2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7B3FF2]"></span>
            </span>
            <span className="text-xs font-bold text-[#101936]">
              Next-Gen Career Acceleration & Placement Engine
            </span>
          </div>

          {/* Platform Title & Tagline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0C1435] tracking-tight leading-tight">
            STEPUP
          </h1>
          <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] bg-clip-text text-transparent">
            StepUp — Learn. Build. Apply. Grow.
          </p>

          <p className="text-base sm:text-lg text-[#64708A] max-w-2xl mx-auto leading-relaxed">
            The all-in-one platform for college students and engineers to analyze resume skill gaps, master in-demand technologies, solve real domain assignments, and get hired by top tech companies.
          </p>

          {/* Central Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center p-2 rounded-2xl bg-white shadow-xl shadow-blue-900/5 border border-[#E6E9F0] transition-all focus-within:border-[#2563FF] focus-within:ring-4 focus-within:ring-blue-500/10">
              <Search className="w-6 h-6 text-[#2563FF] ml-3 shrink-0" />
              <input
                type="text"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setActiveTab('jobs');
                  }
                }}
                placeholder="Search Jobs, Skills, Companies... (e.g. Python, Google, React, Data Analyst)"
                className="w-full px-3 py-2 text-sm sm:text-base text-[#101936] placeholder-[#64708A] bg-transparent outline-none font-medium"
              />
              <button
                onClick={() => setActiveTab('jobs')}
                className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:opacity-95 transition-all flex items-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Google OAuth & Unstop / Glassdoor Onboarding Quick Button */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
              <button
                onClick={() => {
                  if (isGoogleVerified) {
                    setIsDetailsSetupOpen(true);
                  } else {
                    setIsGoogleModalOpen(true);
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-[#2563FF] text-[#101936] font-bold shadow-xs hover:bg-blue-50/30 transition-all cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Verify Google Account & Enter Profile Details (Like Unstop & Glassdoor)</span>
              </button>
            </div>
          </div>

          {/* 3 Core Interactive Pillar Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 max-w-4xl mx-auto">
            {/* Card 1: Find Jobs */}
            <div
              onClick={() => setActiveTab('jobs')}
              className="group p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:shadow-xl hover:border-[#2563FF] transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563FF] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                💼
              </div>
              <h3 className="text-lg font-bold text-[#101936] group-hover:text-[#2563FF] transition-colors flex items-center justify-between">
                <span>Find Jobs</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2563FF] group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-[#64708A] mt-1.5 leading-relaxed">
                Explore 1,200+ verified company openings with batch, branch, and CGPA filters.
              </p>
            </div>

            {/* Card 2: Learning */}
            <div
              onClick={() => setActiveTab('learning')}
              className="group p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:shadow-xl hover:border-[#7B3FF2] transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#7B3FF2] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📚
              </div>
              <h3 className="text-lg font-bold text-[#101936] group-hover:text-[#7B3FF2] transition-colors flex items-center justify-between">
                <span>Learning</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#7B3FF2] group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-[#64708A] mt-1.5 leading-relaxed">
                Master 5 tech tracks: AI/ML, Cloud/DevOps, Data, Web, and Core Programming.
              </p>
            </div>

            {/* Card 3: In-Demand Skills */}
            <div
              onClick={() => setActiveTab('indemand')}
              className="group p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🔥
              </div>
              <h3 className="text-lg font-bold text-[#101936] group-hover:text-amber-600 transition-colors flex items-center justify-between">
                <span>In-Demand</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-[#64708A] mt-1.5 leading-relaxed">
                Upload your resume for AI skill gap analysis & instant company hiring match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Recommended For You Role Chips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#101936] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#2563FF]" /> Recommended Roles For You
              </h2>
              <p className="text-xs text-[#64708A] mt-0.5">
                Top career profiles matched with current Indian & global hiring demands
              </p>
            </div>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs font-bold text-[#2563FF] hover:underline flex items-center gap-1"
            >
              Explore All 140+ Roles <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {recommendedRoles.map((role, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab(role.tab)}
                className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] hover:border-[#2563FF] hover:bg-blue-50/40 transition-all cursor-pointer group text-left"
              >
                <div className="text-xs font-bold text-[#7B3FF2] mb-1">{role.demand}</div>
                <h4 className="text-sm font-bold text-[#101936] group-hover:text-[#2563FF] transition-colors">
                  {role.name}
                </h4>
                <p className="text-[11px] text-[#64708A] mt-1 font-medium">{role.count}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E6E9F0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#64708A]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              <span>Hiring batches: <strong>2025, 2026, 2027, 2028</strong></span>
            </div>
            <button
              onClick={() => setActiveTab('indemand')}
              className="px-5 py-2 rounded-xl bg-[#0C1435] text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <span>Analyze Your Profile Fit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. The StepUp Career Loop Visualizer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0C1435] to-[#141F4D] text-white shadow-2xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-blue-300 backdrop-blur-md mb-3">
              ⭐ What Makes StepUp Different?
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              The Complete StepUp Career Loop
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              StepUp isn't just another job board. We turn raw student resumes into industry-ready candidate portfolios through targeted learning and proof-of-work assessments.
            </p>
          </div>

          {/* Interactive Career Loop Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10">
            {careerLoopSteps.map((s, idx) => (
              <div
                key={s.step}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/15 transition-all text-center group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <div className="text-[10px] font-mono text-blue-400 font-semibold uppercase">Step 0{s.step}</div>
                  <h4 className="text-xs font-bold text-white mt-0.5">{s.title}</h4>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#10B981]" /> Verified Skill Scores</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#10B981]" /> AI Missing Skill Detection</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#10B981]" /> Direct Interview Pipelines</span>
            </div>
            <button
              onClick={() => setActiveTab('indemand')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold hover:opacity-95 transition-all shadow-md shadow-blue-500/30 flex items-center gap-2"
            >
              <span>Start Your Career Loop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Featured Job Openings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-[#101936] flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-[#2563FF]" /> Featured Job Postings
            </h2>
            <p className="text-xs text-[#64708A] mt-0.5">
              Direct openings from Google, Microsoft, Deloitte, TCS, and more
            </p>
          </div>
          <button
            onClick={() => setActiveTab('jobs')}
            className="px-4 py-2 rounded-xl border border-[#2563FF] text-[#2563FF] text-xs font-bold hover:bg-blue-50 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All {jobs.length} Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.logo}
                      alt={job.companyName}
                      className="w-12 h-12 rounded-2xl object-contain p-2 bg-[#F7F8FC] border border-slate-100"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#101936]">{job.companyName}</h4>
                      <p className="text-xs text-[#64708A]">{job.location}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#2563FF] border border-blue-200/50">
                    {job.matchScore}% Match
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#101936] mb-2">{job.title}</h3>
                <p className="text-xs text-[#64708A] line-clamp-2 mb-4 leading-relaxed">
                  {job.description}
                </p>

                {/* Eligibility chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    🎓 {job.degree}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    🎯 Batch: {job.batch}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    📊 CGPA &gt; {job.cgpaCutoff}
                  </span>
                </div>

                {/* Required Skills */}
                <div className="space-y-1 mb-6">
                  <span className="text-[10px] font-bold text-[#64708A] uppercase tracking-wider block">
                    Required Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {job.requiredSkills.map((sk, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50/80 text-[#2563FF] border border-blue-100"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6E9F0] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#64708A]">Package</div>
                  <div className="text-xs font-extrabold text-[#101936]">{job.salary}</div>
                </div>
                <button
                  onClick={() => applyToJob(job)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold hover:opacity-95 transition-all shadow-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Trending Courses Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-[#101936] flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#7B3FF2]" /> In-Demand Learning Modules
            </h2>
            <p className="text-xs text-[#64708A] mt-0.5">
              Hands-on interactive roadmaps covering AI, Data, Cloud, and Full Stack
            </p>
          </div>
          <button
            onClick={() => setActiveTab('learning')}
            className="px-4 py-2 rounded-xl border border-[#7B3FF2] text-[#7B3FF2] text-xs font-bold hover:bg-purple-50 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore All {courses.length} Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((crs) => (
            <div
              key={crs.id}
              onClick={() => setActiveTab('learning')}
              className="p-5 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:shadow-xl hover:border-[#7B3FF2] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <img
                  src={crs.thumbnail}
                  alt={crs.title}
                  className="w-full h-40 rounded-2xl object-cover mb-4"
                />
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#7B3FF2] bg-purple-50 px-2.5 py-0.5 rounded-full">
                    {crs.level}
                  </span>
                  <span className="font-semibold text-amber-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {crs.rating} ({crs.enrolledCount.toLocaleString()} enrolled)
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-[#101936] mb-1.5">{crs.title}</h3>
                <p className="text-xs text-[#64708A] line-clamp-2 leading-relaxed mb-4">
                  {crs.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-xs font-bold text-[#101936]">
                    <span>Progress</span>
                    <span className="text-[#2563FF]">{crs.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${crs.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E6E9F0] flex items-center justify-between">
                <span className="text-xs text-[#64708A]">{crs.duration} • {crs.modules.length} Modules</span>
                <span className="text-xs font-bold text-[#2563FF] flex items-center gap-1">
                  Continue Learning <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Platform Stats Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] bg-clip-text text-transparent">
                15,000+
              </div>
              <div className="text-xs font-bold text-[#101936] mt-1">Active Students Enrolled</div>
              <div className="text-[11px] text-[#64708A]">Across 120+ top engineering colleges</div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] bg-clip-text text-transparent">
                1,200+
              </div>
              <div className="text-xs font-bold text-[#101936] mt-1">Hiring Tech Companies</div>
              <div className="text-[11px] text-[#64708A]">FAANG, unicorns & MNC tech advisory</div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] bg-clip-text text-transparent">
                94.2%
              </div>
              <div className="text-xs font-bold text-[#101936] mt-1">Shortlist Placement Rate</div>
              <div className="text-[11px] text-[#64708A]">After completing StepUp assessments</div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] bg-clip-text text-transparent">
                ₹14.2 LPA
              </div>
              <div className="text-xs font-bold text-[#101936] mt-1">Average Graduate Package</div>
              <div className="text-[11px] text-[#64708A]">For StepUp verified profiles</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Get Started Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#2563FF] via-[#5B3DF5] to-[#7B3FF2] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Upload your resume now to uncover high-demand missing skills, enroll in targeted hands-on roadmaps, and get matched to top companies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('indemand')}
              className="px-6 py-3.5 rounded-2xl bg-white text-[#2563FF] font-extrabold text-sm shadow-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <span>Scan Resume & Match Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className="px-6 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-sm backdrop-blur-md transition-all text-center"
            >
              Browse Openings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
