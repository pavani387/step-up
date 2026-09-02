import React from 'react';
import { useApp } from '../../context/AppContext';
import Logo from './Logo';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  Heart
} from 'lucide-react';

export default function Footer() {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-[#0C1435] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" isDark={true} />
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              <strong className="text-white">StepUp — Learn. Build. Apply. Grow.</strong> The intelligent career growth platform connecting student talent with skill gap detection, hands-on assignments, and verified hiring pipelines.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> AI-Verified Skills
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
                <Award className="w-3.5 h-3.5 text-[#2563FF]" /> Direct Recruiter Pipeline
              </div>
            </div>
          </div>

          {/* Core Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="text-slate-300 hover:text-[#2563FF] transition-colors flex items-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5" /> Search Job Postings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('learning')}
                  className="text-slate-300 hover:text-[#7B3FF2] transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Tech Learning Roadmaps
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('indemand')}
                  className="text-slate-300 hover:text-[#2563FF] transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> In-Demand Skill Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className="text-slate-300 hover:text-[#7B3FF2] transition-colors flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" /> Practical Assessments
                </button>
              </li>
            </ul>
          </div>

          {/* Tech Domains */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Tech Domains
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('learning')}>
                AI & Machine Learning
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('learning')}>
                Data Science & Analytics
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('learning')}>
                Full Stack Web Development
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('learning')}>
                Cloud Infrastructure & DevOps
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('learning')}>
                Enterprise Java & Spring
              </li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              For Companies
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('company')}
                  className="text-slate-300 hover:text-[#2563FF] transition-colors"
                >
                  Post New Opening
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('company')}
                  className="text-slate-300 hover:text-[#2563FF] transition-colors"
                >
                  Recruiter Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('company')}
                  className="text-slate-300 hover:text-[#2563FF] transition-colors"
                >
                  Verified Candidate Pool
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="text-slate-300 hover:text-[#2563FF] transition-colors"
                >
                  Candidate Showcase
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 STEPUP Platform Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Campus Ambassador Program</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
