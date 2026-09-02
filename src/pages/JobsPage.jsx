import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  MapPin,
  GraduationCap,
  Calendar,
  DollarSign,
  Building2,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Send,
  X,
  FileCheck,
  UserCheck,
  Award,
  Layers
} from 'lucide-react';

export default function JobsPage() {
  const {
    jobs,
    applications,
    savedJobIds,
    toggleSaveJob,
    applyToJob,
    userProfile,
    currentRole,
    setActiveTab
  } = useApp();

  const [activeView, setActiveView] = useState('explore'); // 'explore' | 'tracker' | 'saved'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Apply Modal State
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [applyNote, setApplyNote] = useState('');
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);

  const branches = ['All', 'CSE', 'IT', 'AI & DS', 'ECE', 'EEE', 'MCA', 'All Branches'];
  const batches = ['All', '2026–2027', '2027–2028', '2025–2026'];
  const jobTypes = ['All', 'Full-time', 'Internship'];
  const locations = ['All', 'Bangalore, India', 'Hyderabad, India', 'Bengaluru / Gurgaon', 'Pune / Remote', 'Chennai / Hyderabad', 'Remote'];
  const skillsList = ['All', 'Python', 'SQL', 'React', 'Java', 'Machine Learning', 'Power BI', 'Docker', 'AWS', 'DSA'];

  // Filter Jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requiredSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesBranch =
      selectedBranch === 'All' ||
      job.branches.includes(selectedBranch) ||
      job.branches.includes('All Branches');

    const matchesBatch = selectedBatch === 'All' || job.batch === selectedBatch;
    const matchesType = selectedJobType === 'All' || job.jobType === selectedJobType;
    const matchesLocation = selectedLocation === 'All' || job.location.includes(selectedLocation.replace(', India', ''));
    const matchesSkill =
      selectedSkillFilter === 'All' ||
      job.requiredSkills.some((s) => s.toLowerCase() === selectedSkillFilter.toLowerCase());

    return matchesSearch && matchesBranch && matchesBatch && matchesType && matchesLocation && matchesSkill;
  });

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (selectedJobForApply) {
      applyToJob(selectedJobForApply, { note: applyNote });
      setSelectedJobForApply(null);
      setApplyNote('');
    }
  };

  const statusSteps = [
    { step: 1, label: 'Applied', icon: Send },
    { step: 2, label: 'Resume Shortlisted', icon: FileCheck },
    { step: 3, label: 'Assessment', icon: Layers },
    { step: 4, label: 'Interview', icon: UserCheck },
    { step: 5, label: 'Selected 🎉', icon: Award }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0C1435] via-[#101F52] to-[#0C1435] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-2">
            💼 Verified Campus & Graduate Hiring Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Discover & Apply to Top Tech Jobs
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Apply with your StepUp verified profile. Track your application pipeline in real time from Resume Shortlist to Final Selection.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 self-stretch md:self-auto">
          <button
            onClick={() => setActiveView('explore')}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeView === 'explore'
                ? 'bg-white text-[#0C1435] shadow-md'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Explore Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setActiveView('tracker')}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeView === 'tracker'
                ? 'bg-white text-[#0C1435] shadow-md'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <span>My Applications</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#2563FF] text-white text-[10px]">
              {applications.length}
            </span>
          </button>
          <button
            onClick={() => setActiveView('saved')}
            className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeView === 'saved'
                ? 'bg-white text-[#0C1435] shadow-md'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Saved ({savedJobIds.length})
          </button>
        </div>
      </div>

      {/* VIEW 1: EXPLORE JOBS */}
      {activeView === 'explore' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E9F0]">
                <h3 className="text-sm font-extrabold text-[#101936] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#2563FF]" /> Filter Openings
                </h3>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedBranch('All');
                    setSelectedBatch('All');
                    setSelectedJobType('All');
                    setSelectedSkillFilter('All');
                    setSelectedLocation('All');
                  }}
                  className="text-xs text-[#2563FF] font-semibold hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1.5">
                  Search Job / Company
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="e.g. Google, Python, SDE"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                  />
                </div>
              </div>

              {/* Skills Filter */}
              <div>
                <label className="block text-xs font-bold text-[#101936] mb-2">
                  Required Skill
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {skillsList.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => setSelectedSkillFilter(skill)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                        selectedSkillFilter === skill
                          ? 'bg-[#2563FF] text-white'
                          : 'bg-[#F7F8FC] text-[#64708A] hover:bg-slate-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch Filter */}
              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1.5">
                  Eligible Branch
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none bg-white"
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Batch Filter */}
              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1.5">
                  Graduation Batch
                </label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none bg-white"
                >
                  {batches.map((batch) => (
                    <option key={batch} value={batch}>
                      {batch}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Type Filter */}
              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1.5">
                  Job Type
                </label>
                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none bg-white"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1.5">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none bg-white"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Jobs Listing Cards */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#64708A] px-1">
              <span>Showing <strong>{filteredJobs.length}</strong> active openings</span>
              <span>Sorted by: <strong>Relevance & Skill Match</strong></span>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#E6E9F0] space-y-3">
                <div className="text-4xl">🔍</div>
                <h4 className="text-base font-bold text-[#101936]">No job openings matched your filters</h4>
                <p className="text-xs text-[#64708A]">Try adjusting your skill, branch or location filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => {
                  const isSaved = savedJobIds.includes(job.id);
                  const isApplied = applications.some((a) => a.jobId === job.id);

                  return (
                    <div
                      key={job.id}
                      className="p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:shadow-xl hover:border-slate-300 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={job.logo}
                            alt={job.companyName}
                            className="w-14 h-14 rounded-2xl object-contain p-2 bg-[#F7F8FC] border border-slate-100 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#64708A] uppercase tracking-wider">
                                {job.companyName}
                              </span>
                              {job.featured && (
                                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-[#2563FF]">
                                  FEATURED
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-black text-[#101936] mt-0.5 hover:text-[#2563FF] cursor-pointer transition-colors"
                              onClick={() => setSelectedJobDetails(job)}
                            >
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-[#64708A]">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location} ({job.workMode})
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> {job.salary}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-slate-400" /> Deadline: {job.deadline}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Top Right Match & Bookmark */}
                        <div className="flex items-center sm:flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-[#2563FF] border border-blue-200/60 shadow-2xs">
                              {job.matchScore}% Match
                            </span>
                            <button
                              onClick={() => toggleSaveJob(job.id)}
                              className="p-1.5 rounded-xl border border-[#E6E9F0] hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors"
                            >
                              {isSaved ? (
                                <BookmarkCheck className="w-4 h-4 text-[#2563FF] fill-[#2563FF]" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400">{job.postedDate}</span>
                        </div>
                      </div>

                      {/* Description Snippet */}
                      <p className="text-xs text-[#64708A] mt-4 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      {/* Eligibility & Branch Tags */}
                      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                          🎓 {job.degree}
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                          🎯 Batch: {job.batch}
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                          📊 CGPA &gt; {job.cgpaCutoff}
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-purple-50 text-[#7B3FF2]">
                          🏢 {job.jobType}
                        </span>
                      </div>

                      {/* Skills & Action Buttons */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-bold text-[#101936] mr-1">Skills:</span>
                          {job.requiredSkills.map((sk, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-[#2563FF] border border-blue-100"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => setSelectedJobDetails(job)}
                            className="px-4 py-2 rounded-xl border border-[#E6E9F0] text-xs font-bold text-[#101936] hover:bg-slate-50 transition-colors"
                          >
                            Details
                          </button>
                          {isApplied ? (
                            <button
                              onClick={() => setActiveView('tracker')}
                              className="px-5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Track Status
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedJobForApply(job)}
                              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:opacity-95 transition-all"
                            >
                              Apply Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: APPLICATION STATUS TRACKER */}
      {activeView === 'tracker' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[#101936] flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-[#2563FF]" /> My Applications Pipeline Tracker
              </h2>
              <p className="text-xs text-[#64708A]">
                Follow your verified candidacy progress across recruitment stages
              </p>
            </div>
            <button
              onClick={() => setActiveView('explore')}
              className="text-xs font-bold text-[#2563FF] hover:underline flex items-center gap-1"
            >
              + Apply to More Openings
            </button>
          </div>

          <div className="space-y-6">
            {applications.map((app) => {
              return (
                <div
                  key={app.id}
                  className="p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:shadow-md transition-all space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6E9F0]">
                    <div className="flex items-center gap-4">
                      <img
                        src={app.logo}
                        alt={app.companyName}
                        className="w-12 h-12 rounded-2xl object-contain p-2 bg-[#F7F8FC] border border-slate-100"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#64708A] uppercase tracking-wider">
                          {app.companyName}
                        </span>
                        <h3 className="text-base font-extrabold text-[#101936]">{app.title}</h3>
                        <p className="text-xs text-[#64708A]">
                          Applied on: {app.appliedDate} • {app.location} • {app.salary}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#2563FF]">
                        {app.matchScore}% Match Score
                      </span>
                      <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                        app.status === 'Selected 🎉'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Interview'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-[#2563FF]'
                      }`}>
                        Current: {app.status}
                      </span>
                    </div>
                  </div>

                  {/* 5-Stage Visual Progress Bar */}
                  <div>
                    <div className="grid grid-cols-5 gap-2 relative">
                      {statusSteps.map((step, idx) => {
                        const isCompleted = app.statusStep >= step.step;
                        const isCurrent = app.statusStep === step.step;
                        const Icon = step.icon;

                        return (
                          <div key={step.step} className="flex flex-col items-center text-center space-y-2">
                            <div
                              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                                isCompleted
                                  ? 'bg-[#2563FF] text-white shadow-md shadow-blue-500/30'
                                  : 'bg-slate-100 text-slate-400'
                              } ${isCurrent ? 'ring-4 ring-blue-100 scale-105' : ''}`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span
                              className={`text-[11px] font-bold ${
                                isCompleted ? 'text-[#101936]' : 'text-slate-400'
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes / Action Container */}
                  <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="text-xs text-[#64708A]">
                      <strong className="text-[#101936]">Recruiter Update:</strong> {app.notes}
                    </div>
                    {app.status === 'Assessment' && (
                      <button
                        onClick={() => setActiveTab('assignments')}
                        className="shrink-0 px-4 py-2 rounded-xl bg-[#2563FF] text-white text-xs font-bold shadow-xs hover:bg-blue-700"
                      >
                        Start Assigned Test
                      </button>
                    )}
                    {app.status === 'Interview' && (
                      <button
                        onClick={() => alert('Interview details and meeting link sent to your registered email.')}
                        className="shrink-0 px-4 py-2 rounded-xl bg-[#7B3FF2] text-white text-xs font-bold shadow-xs hover:bg-purple-700"
                      >
                        View Interview Agenda
                      </button>
                    )}
                    {app.status === 'Selected 🎉' && (
                      <button
                        onClick={() => alert('Congratulations! Your verified StepUp Offer Letter is ready for download.')}
                        className="shrink-0 px-4 py-2 rounded-xl bg-[#10B981] text-white text-xs font-bold shadow-xs hover:bg-emerald-600"
                      >
                        Download Offer Letter 🎉
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: SAVED JOBS */}
      {activeView === 'saved' && (
        <div className="space-y-6">
          <h2 className="text-xl font-extrabold text-[#101936] flex items-center gap-2">
            <BookmarkCheck className="w-6 h-6 text-[#2563FF]" /> Saved Job Bookmarks ({savedJobs.length})
          </h2>
          {savedJobs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#E6E9F0]">
              <p className="text-sm text-[#64708A]">You haven't bookmarked any jobs yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedJobs.map((job) => (
                <div key={job.id} className="p-5 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img src={job.logo} alt={job.companyName} className="w-10 h-10 rounded-xl p-1 bg-slate-50 border" />
                        <div>
                          <h4 className="text-sm font-bold text-[#101936]">{job.title}</h4>
                          <p className="text-xs text-[#64708A]">{job.companyName} • {job.location}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#2563FF] bg-blue-50 px-2 py-0.5 rounded-full">
                        {job.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-xs text-[#64708A] line-clamp-2 mb-3">{job.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs font-extrabold text-[#101936]">{job.salary}</span>
                    <button
                      onClick={() => setSelectedJobForApply(job)}
                      className="px-4 py-1.5 rounded-xl bg-[#2563FF] text-white text-xs font-bold hover:bg-blue-700"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: APPLY TO JOB MODAL */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C1435]/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E6E9F0] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-[#E6E9F0] flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedJobForApply.logo}
                  alt={selectedJobForApply.companyName}
                  className="w-12 h-12 rounded-2xl object-contain p-2 bg-white border border-slate-100"
                />
                <div>
                  <span className="text-xs font-bold text-[#64708A] uppercase tracking-wider">
                    {selectedJobForApply.companyName}
                  </span>
                  <h3 className="text-base font-extrabold text-[#101936]">
                    Apply for {selectedJobForApply.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedJobForApply(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] space-y-1">
                <span className="text-xs font-bold text-[#101936]">Applying Candidate:</span>
                <p className="text-xs text-[#64708A]">
                  <strong>{userProfile.name}</strong> • {userProfile.degree} ({userProfile.department}), {userProfile.college}
                </p>
                <p className="text-xs text-[#2563FF] font-semibold">
                  Verified CGPA: {userProfile.cgpa} • Skills: {userProfile.skills.slice(0, 5).join(', ')}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">
                  Why are you a strong fit for {selectedJobForApply.companyName}? (Optional Note)
                </label>
                <textarea
                  rows={3}
                  value={applyNote}
                  onChange={(e) => setApplyNote(e.target.value)}
                  placeholder="Mention your relevant projects, hackathon achievements, or skill assessments..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-2 text-xs text-[#2563FF]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Your StepUp Verified Resume & Skill Scores will be attached automatically.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJobForApply(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-bold text-[#64708A] hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold shadow-md shadow-blue-500/25 hover:opacity-95 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: JOB DETAILS DEEP DIVE MODAL */}
      {selectedJobDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C1435]/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E6E9F0] overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-[#F7F8FC] border-b border-[#E6E9F0] flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedJobDetails.logo}
                  alt={selectedJobDetails.companyName}
                  className="w-14 h-14 rounded-2xl object-contain p-2 bg-white border border-slate-100"
                />
                <div>
                  <span className="text-xs font-bold text-[#64708A] uppercase tracking-wider">
                    {selectedJobDetails.companyName}
                  </span>
                  <h3 className="text-lg font-black text-[#101936]">{selectedJobDetails.title}</h3>
                  <p className="text-xs text-[#64708A]">
                    {selectedJobDetails.location} • {selectedJobDetails.jobType}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJobDetails(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64708A] mb-2">
                  Job Description
                </h4>
                <p className="text-xs text-[#101936] leading-relaxed">
                  {selectedJobDetails.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64708A] mb-2">
                  Eligibility Criteria
                </h4>
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] text-xs">
                  <div><strong>Degree:</strong> {selectedJobDetails.degree}</div>
                  <div><strong>Branches:</strong> {selectedJobDetails.branches.join(', ')}</div>
                  <div><strong>Batch:</strong> {selectedJobDetails.batch}</div>
                  <div><strong>Minimum CGPA:</strong> {selectedJobDetails.cgpaCutoff} / 10.0</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64708A] mb-2">
                  Required Technical Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJobDetails.requiredSkills.map((sk, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-3 py-1 rounded-xl bg-blue-50 text-[#2563FF] border border-blue-200"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#7B3FF2]">Compensation Package</div>
                  <div className="text-base font-extrabold text-[#101936]">{selectedJobDetails.salary}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#64708A]">Application Deadline</div>
                  <div className="text-xs font-bold text-[#101936]">{selectedJobDetails.deadline}</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F7F8FC] border-t border-[#E6E9F0] flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedJobDetails(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#64708A] hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedJobForApply(selectedJobDetails);
                  setSelectedJobDetails(null);
                }}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold shadow-md hover:opacity-95"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
