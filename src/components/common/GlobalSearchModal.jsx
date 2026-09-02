import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Briefcase, BookOpen, Sparkles, Building2, ArrowRight, X } from 'lucide-react';

export default function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen, jobs, courses, setActiveTab } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedJobs = q
    ? jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.companyName.toLowerCase().includes(q) ||
          j.requiredSkills.some((s) => s.toLowerCase().includes(q))
      ).slice(0, 4)
    : jobs.slice(0, 3);

  const matchedCourses = q
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.skillsGained.some((s) => s.toLowerCase().includes(q))
      ).slice(0, 3)
    : courses.slice(0, 3);

  const quickNav = (tab) => {
    setActiveTab(tab);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#0C1435]/60 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E6E9F0] overflow-hidden transform scale-100 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Search Box */}
        <div className="relative flex items-center border-b border-[#E6E9F0] px-4 py-3 bg-[#F7F8FC]/50">
          <Search className="w-5 h-5 text-[#2563FF] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs, skills, courses, or companies... (e.g. Python, Google, React)"
            className="w-full bg-transparent border-none outline-none text-base text-[#101936] placeholder-[#64708A] font-medium"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {/* Quick Categories */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#64708A] px-2 block mb-2">
              Quick Shortcuts
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => quickNav('jobs')}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#E6E9F0] hover:border-[#2563FF] hover:bg-blue-50/50 transition-all text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2563FF] flex items-center justify-center font-bold">
                  💼
                </div>
                <div>
                  <div className="text-xs font-bold text-[#101936] group-hover:text-[#2563FF]">Explore Jobs</div>
                  <div className="text-[10px] text-[#64708A]">Find top roles</div>
                </div>
              </button>

              <button
                onClick={() => quickNav('learning')}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#E6E9F0] hover:border-[#7B3FF2] hover:bg-purple-50/50 transition-all text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7B3FF2] flex items-center justify-center font-bold">
                  📚
                </div>
                <div>
                  <div className="text-xs font-bold text-[#101936] group-hover:text-[#7B3FF2]">Tech Courses</div>
                  <div className="text-[10px] text-[#64708A]">Skill roadmaps</div>
                </div>
              </button>

              <button
                onClick={() => quickNav('indemand')}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#E6E9F0] hover:border-[#2563FF] hover:bg-blue-50/50 transition-all text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                  🔥
                </div>
                <div>
                  <div className="text-xs font-bold text-[#101936] group-hover:text-[#2563FF]">Resume Scanner</div>
                  <div className="text-[10px] text-[#64708A]">Match companies</div>
                </div>
              </button>
            </div>
          </div>

          {/* Jobs Results */}
          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64708A] flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#2563FF]" /> Job Postings ({matchedJobs.length})
              </span>
              <button
                onClick={() => quickNav('jobs')}
                className="text-xs text-[#2563FF] font-semibold hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1.5">
              {matchedJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => quickNav('jobs')}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8FC] cursor-pointer border border-transparent hover:border-[#E6E9F0] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img src={job.logo} alt={job.companyName} className="w-8 h-8 rounded-lg object-contain bg-slate-50 p-1 border border-slate-100" />
                    <div>
                      <h4 className="text-sm font-bold text-[#101936]">{job.title}</h4>
                      <p className="text-xs text-[#64708A]">{job.companyName} • {job.location} • {job.salary}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#2563FF] border border-blue-200/50">
                    {job.matchScore}% Match
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Courses Results */}
          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64708A] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#7B3FF2]" /> Learning Modules ({matchedCourses.length})
              </span>
              <button
                onClick={() => quickNav('learning')}
                className="text-xs text-[#7B3FF2] font-semibold hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1.5">
              {matchedCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => quickNav('learning')}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8FC] cursor-pointer border border-transparent hover:border-[#E6E9F0] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7B3FF2] flex items-center justify-center font-bold text-xs">
                      {course.rating}★
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#101936]">{course.title}</h4>
                      <p className="text-xs text-[#64708A]">{course.level} • {course.duration} • {course.instructor}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-[#7B3FF2] border border-purple-200/50">
                    {course.progress}% Completed
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="bg-[#F7F8FC] px-4 py-2.5 border-t border-[#E6E9F0] flex items-center justify-between text-xs text-[#64708A]">
          <span>Tip: Use <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px]">ESC</kbd> to close</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px]">K</kbd> anywhere</span>
        </div>
      </div>
    </div>
  );
}
