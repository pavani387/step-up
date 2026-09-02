import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building,
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  Award,
  Plus,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  FileText,
  Calendar,
  DollarSign,
  MapPin,
  Sparkles,
  X,
  Send,
  UserCheck,
  Check
} from 'lucide-react';

export default function CompanyDashboardPage() {
  const {
    companyProfile,
    jobs,
    postNewJob,
    recruiterCandidates,
    updateCandidateStatus,
    recruiterStats,
    showToast
  } = useApp();

  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateFilter, setCandidateFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Post Job Form State
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    location: 'Bangalore, India',
    salary: '₹12,00,000 / year',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    batch: '2026–2027',
    degree: 'B.Tech / B.E',
    branches: 'CSE, IT, AI & DS',
    experience: 'Fresher',
    cgpaCutoff: '7.0',
    deadline: 'Nov 30, 2026',
    requiredSkills: 'Python, SQL, Machine Learning',
    description: ''
  });

  const handlePostJobSubmit = (e) => {
    e.preventDefault();
    if (!newJobForm.title || !newJobForm.description) return;

    postNewJob({
      ...newJobForm,
      branches: newJobForm.branches.split(',').map((b) => b.trim())
    });

    setNewJobForm({
      title: '',
      location: 'Bangalore, India',
      salary: '₹12,00,000 / year',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      batch: '2026–2027',
      degree: 'B.Tech / B.E',
      branches: 'CSE, IT, AI & DS',
      experience: 'Fresher',
      cgpaCutoff: '7.0',
      deadline: 'Nov 30, 2026',
      requiredSkills: 'Python, SQL, Machine Learning',
      description: ''
    });

    setIsPostJobOpen(false);
  };

  const filteredCandidates = recruiterCandidates.filter((cand) => {
    const matchesFilter =
      candidateFilter === 'All' || cand.status.includes(candidateFilter);
    const matchesSearch =
      cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.appliedJob.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0C1435] via-[#161D47] to-[#0C1435] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={companyProfile.companyLogo}
            alt={companyProfile.companyName}
            className="w-16 h-16 rounded-2xl p-2.5 bg-white object-contain shadow-md"
          />
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-blue-300 font-bold mb-1">
              🏢 Recruiter Workspace • {companyProfile.industry}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">{companyProfile.companyName} Talent Portal</h1>
            <p className="text-xs text-slate-300 mt-0.5">Recruiter: {companyProfile.name} ({companyProfile.email})</p>
          </div>
        </div>

        <button
          onClick={() => setIsPostJobOpen(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 hover:opacity-95 transition-all flex items-center gap-2 self-stretch md:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Post New Job Opening</span>
        </button>
      </div>

      {/* KPI Metrics Overview (Matching User Specification 8) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm">
          <div className="flex items-center justify-between text-[#64708A] text-xs font-bold mb-2">
            <span>Active Jobs</span>
            <Briefcase className="w-4 h-4 text-[#2563FF]" />
          </div>
          <div className="text-3xl font-black text-[#101936]">{recruiterStats.activeJobs}</div>
          <div className="text-[10px] text-[#10B981] font-semibold mt-1">● Live Accepting</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm">
          <div className="flex items-center justify-between text-[#64708A] text-xs font-bold mb-2">
            <span>Applications</span>
            <Users className="w-4 h-4 text-[#7B3FF2]" />
          </div>
          <div className="text-3xl font-black text-[#101936]">{recruiterStats.applications}</div>
          <div className="text-[10px] text-[#2563FF] font-semibold mt-1">+18 new today</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm">
          <div className="flex items-center justify-between text-[#64708A] text-xs font-bold mb-2">
            <span>Shortlisted</span>
            <CheckCircle2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-[#101936]">{recruiterStats.shortlisted}</div>
          <div className="text-[10px] text-amber-600 font-semibold mt-1">Ready for screening</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm">
          <div className="flex items-center justify-between text-[#64708A] text-xs font-bold mb-2">
            <span>Interviews</span>
            <Calendar className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl font-black text-[#101936]">{recruiterStats.interviews}</div>
          <div className="text-[10px] text-purple-600 font-semibold mt-1">4 rounds today</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-[#64708A] text-xs font-bold mb-2">
            <span>Selected 🎉</span>
            <Award className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-3xl font-black text-[#10B981]">{recruiterStats.selected}</div>
          <div className="text-[10px] text-[#10B981] font-semibold mt-1">Offers rolled out</div>
        </div>
      </div>

      {/* Candidates Management Pipeline Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6E9F0]">
          <div>
            <h3 className="text-xl font-black text-[#101936] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#2563FF]" /> Recent Candidate Applications
            </h3>
            <p className="text-xs text-[#64708A] mt-0.5">
              Review candidate skill match percentages, college profiles, and trigger pipeline stages
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search candidate, skill..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-[#E6E9F0] text-xs outline-none focus:border-[#2563FF]"
              />
            </div>

            {['All', 'Applied', 'Shortlisted', 'Interview', 'Selected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setCandidateFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  candidateFilter === tab
                    ? 'bg-[#0C1435] text-white'
                    : 'bg-[#F7F8FC] text-[#64708A] hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table / Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[#64708A] font-bold uppercase tracking-wider">
                <th className="pb-3 pl-2">Candidate</th>
                <th className="pb-3">Applied Job</th>
                <th className="pb-3">Key Skills</th>
                <th className="pb-3">Match Score</th>
                <th className="pb-3">Stage Status</th>
                <th className="pb-3 text-right pr-2">Pipeline Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-[#F7F8FC] transition-colors">
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                      />
                      <div>
                        <div className="font-extrabold text-[#101936]">{cand.name}</div>
                        <div className="text-[11px] text-[#64708A]">
                          {cand.degree} • {cand.college} (CGPA {cand.cgpa})
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 font-bold text-[#101936]">{cand.appliedJob}</td>

                  <td className="py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {cand.skills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-blue-50 text-[#2563FF] text-[10px] font-semibold"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4">
                    <span className="font-black text-sm px-2.5 py-1 rounded-full bg-blue-100 text-[#2563FF]">
                      {cand.matchScore}%
                    </span>
                  </td>

                  <td className="py-4">
                    <span
                      className={`font-bold px-2.5 py-1 rounded-full text-[11px] ${
                        cand.status.includes('Selected')
                          ? 'bg-emerald-100 text-emerald-800'
                          : cand.status === 'Interview'
                          ? 'bg-purple-100 text-[#7B3FF2]'
                          : cand.status === 'Shortlisted'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-50 text-[#2563FF]'
                      }`}
                    >
                      {cand.status}
                    </span>
                  </td>

                  <td className="py-4 text-right pr-2">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="p-1.5 rounded-xl border border-[#E6E9F0] hover:bg-slate-100 text-[#101936]"
                        title="View Resume & Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {cand.status === 'Applied' && (
                        <button
                          onClick={() => updateCandidateStatus(cand.id, 'Shortlisted')}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 text-white font-bold text-[11px] hover:bg-amber-600 shadow-2xs"
                        >
                          Shortlist
                        </button>
                      )}

                      {cand.status === 'Shortlisted' && (
                        <button
                          onClick={() => updateCandidateStatus(cand.id, 'Interview')}
                          className="px-3 py-1.5 rounded-xl bg-[#7B3FF2] text-white font-bold text-[11px] hover:bg-purple-700 shadow-2xs"
                        >
                          Schedule Interview
                        </button>
                      )}

                      {cand.status === 'Interview' && (
                        <button
                          onClick={() => updateCandidateStatus(cand.id, 'Selected 🎉')}
                          className="px-3 py-1.5 rounded-xl bg-[#10B981] text-white font-bold text-[11px] hover:bg-emerald-600 shadow-2xs"
                        >
                          Select & Offer 🎉
                        </button>
                      )}

                      {cand.status.includes('Selected') && (
                        <span className="text-[11px] text-emerald-600 font-bold px-2">Offered</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: POST NEW JOB MODAL (Matching User Specification 2 & 8) */}
      {isPostJobOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C1435]/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E6E9F0] overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-[#E6E9F0] flex items-start justify-between">
              <div>
                <h3 className="text-xl font-black text-[#101936] flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#2563FF]" /> Create New Campus Job Posting
                </h3>
                <p className="text-xs text-[#64708A]">
                  Publish openings directly to eligible student streams
                </p>
              </div>
              <button
                onClick={() => setIsPostJobOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostJobSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={newJobForm.title}
                    onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                    placeholder="e.g. AI Engineer Intern"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Job Location *</label>
                  <input
                    type="text"
                    required
                    value={newJobForm.location}
                    onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                    placeholder="e.g. Bangalore, India"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Package / Salary *</label>
                  <input
                    type="text"
                    required
                    value={newJobForm.salary}
                    onChange={(e) => setNewJobForm({ ...newJobForm, salary: e.target.value })}
                    placeholder="e.g. ₹14,00,000 / year"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Job Type</label>
                  <select
                    value={newJobForm.jobType}
                    onChange={(e) => setNewJobForm({ ...newJobForm, jobType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none bg-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Work Mode</label>
                  <select
                    value={newJobForm.workMode}
                    onChange={(e) => setNewJobForm({ ...newJobForm, workMode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none bg-white"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Target Batch</label>
                  <input
                    type="text"
                    value={newJobForm.batch}
                    onChange={(e) => setNewJobForm({ ...newJobForm, batch: e.target.value })}
                    placeholder="2026–2027"
                    className="w-full px-3.5 py-2 rounded-xl border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Min. CGPA Cutoff</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newJobForm.cgpaCutoff}
                    onChange={(e) => setNewJobForm({ ...newJobForm, cgpaCutoff: e.target.value })}
                    placeholder="7.0"
                    className="w-full px-3.5 py-2 rounded-xl border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Deadline</label>
                  <input
                    type="text"
                    value={newJobForm.deadline}
                    onChange={(e) => setNewJobForm({ ...newJobForm, deadline: e.target.value })}
                    placeholder="Nov 30, 2026"
                    className="w-full px-3.5 py-2 rounded-xl border text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">
                  Required Skills (comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={newJobForm.requiredSkills}
                  onChange={(e) => setNewJobForm({ ...newJobForm, requiredSkills: e.target.value })}
                  placeholder="Python, Java, SQL, DSA..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">
                  Eligible Branches (comma separated)
                </label>
                <input
                  type="text"
                  value={newJobForm.branches}
                  onChange={(e) => setNewJobForm({ ...newJobForm, branches: e.target.value })}
                  placeholder="CSE, IT, AI & DS, ECE"
                  className="w-full px-3.5 py-2 rounded-xl border text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">
                  Job Description & Responsibilities *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newJobForm.description}
                  onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                  placeholder="Describe role responsibilities, team impact, and interview expectations..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs text-[#101936] focus:border-[#2563FF] outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6E9F0]">
                <button
                  type="button"
                  onClick={() => setIsPostJobOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-bold text-[#64708A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold shadow-md hover:opacity-95"
                >
                  Publish Job Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CANDIDATE DEEP DIVE REVIEW MODAL */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C1435]/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E6E9F0] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-[#F7F8FC] border-b border-[#E6E9F0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCandidate.avatar}
                  alt={selectedCandidate.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base font-black text-[#101936]">{selectedCandidate.name}</h3>
                  <p className="text-xs text-[#64708A]">{selectedCandidate.degree} • {selectedCandidate.college}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-[#101936]">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0]">
                <div><strong>CGPA:</strong> {selectedCandidate.cgpa} / 10.0</div>
                <div><strong>Match Score:</strong> {selectedCandidate.matchScore}%</div>
                <div><strong>Assessment Score:</strong> {selectedCandidate.assessmentScore}/100</div>
                <div><strong>Status:</strong> {selectedCandidate.status}</div>
              </div>

              <div>
                <strong className="block text-[#64708A] uppercase tracking-wider mb-1">Resume Highlights:</strong>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 leading-relaxed text-slate-700">
                  {selectedCandidate.resumeSnippet}
                </p>
              </div>

              <div>
                <strong className="block text-[#64708A] uppercase tracking-wider mb-1">Verified Skills:</strong>
                <div className="flex flex-wrap gap-1">
                  {selectedCandidate.skills.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-blue-50 text-[#2563FF] font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    updateCandidateStatus(selectedCandidate.id, 'Interview');
                    setSelectedCandidate(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#7B3FF2] text-white text-xs font-bold"
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
