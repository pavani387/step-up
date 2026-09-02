import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_ASSIGNMENTS } from '../data/mockData';
import {
  Layers,
  Code2,
  CheckCircle2,
  Clock,
  Sparkles,
  Play,
  Award,
  Star,
  ChevronRight,
  Terminal,
  FileCode2,
  Check,
  X,
  Send,
  RefreshCw,
  FolderCode
} from 'lucide-react';

export default function AssignmentsPage() {
  const { addAchievement, triggerCelebration, showToast, setActiveTab } = useApp();

  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [activeWorkspaceAssignment, setActiveWorkspaceAssignment] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const domains = ['All', 'AI & Data Science', 'Computer Science', 'Web Development', 'Cloud & DevOps'];

  const filteredAssignments =
    selectedDomain === 'All'
      ? assignments
      : assignments.filter((a) => a.domain === selectedDomain);

  const handleStartAssignment = (asg) => {
    setActiveWorkspaceAssignment(asg);
    setUserCode(asg.starterCode);
    setTerminalOutput('StepUp Sandbox ready. Press "Run Tests" to test code locally against automated test assertions.');
    setEvaluationResult(null);
  };

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTerminalOutput('Running automated test suites against test harness...\n> Compiling runtime environment...\n> Running Unit Test 1: Feature Matrix Dimensions... PASSED\n> Running Unit Test 2: Convergence and Loss Decay... PASSED\n> Running Unit Test 3: Output Serialization... PASSED\n\nAll 3 local test assertions passed! Ready for final submission.');
    setTimeout(() => {
      setIsRunningTests(false);
    }, 900);
  };

  const handleSubmitEvaluation = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const res = activeWorkspaceAssignment.sampleResults;
      setEvaluationResult(res);
      triggerCelebration();
      showToast(
        'Assessment Evaluated! 🏆',
        `Scored ${res.score}/100 with ${res.stars}-Star Skill Rating.`,
        'success'
      );
    }, 1200);
  };

  const handleAddToProfile = () => {
    if (activeWorkspaceAssignment && evaluationResult) {
      addAchievement({
        title: `${activeWorkspaceAssignment.title} (${evaluationResult.score}/100)`,
        type: 'Assessment & Project',
        description: `Achieved ${evaluationResult.score}/100 in ${activeWorkspaceAssignment.domain} with ${evaluationResult.stars}-star rating (${evaluationResult.badge}).`,
        issuer: 'StepUp Automated Skill Assessment Engine',
        date: 'September 2026'
      });
      setActiveWorkspaceAssignment(null);
      setEvaluationResult(null);
      setActiveTab('profile');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0C1435] via-[#1C184A] to-[#7B3FF2] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-bold">
            📝 Domain-Tailored Skill Assessments
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Prove Your Practical Skills With Real Projects
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed">
            StepUp automatically suggests real-world coding assignments matched with your degree and course stream. Submissions receive multi-dimensional scoring and verified profile badges.
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch md:self-auto shrink-0">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
            <div className="text-xl font-black text-amber-300">⭐⭐⭐⭐☆</div>
            <div className="text-[10px] text-slate-300 font-semibold mt-0.5">Average Student Score: 88/100</div>
          </div>
        </div>
      </div>

      {/* Domain Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#64708A] mr-2">
          Target Student Track:
        </span>
        {domains.map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedDomain === dom
                ? 'bg-[#0C1435] text-white shadow-md'
                : 'bg-white text-[#64708A] hover:bg-slate-100 border border-[#E6E9F0]'
            }`}
          >
            {dom}
          </button>
        ))}
      </div>

      {/* Assignments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssignments.map((asg) => (
          <div
            key={asg.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:shadow-xl hover:border-[#7B3FF2] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-[#7B3FF2] border border-purple-100">
                  {asg.targetStudent}
                </span>
                <span className="text-xs font-semibold text-[#64708A] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Deadline: {asg.deadline}
                </span>
              </div>

              <h3 className="text-lg font-black text-[#101936] mb-2">{asg.title}</h3>
              <p className="text-xs text-[#64708A] leading-relaxed mb-4">
                {asg.problemStatement}
              </p>

              {/* Skills Tags */}
              <div className="space-y-1.5 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64708A] block">
                  Tested Competencies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {asg.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-[#F7F8FC] text-[#101936] border border-[#E6E9F0]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E9F0] flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Difficulty: {asg.difficulty}
              </span>
              <button
                onClick={() => handleStartAssignment(asg)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold hover:opacity-95 shadow-md shadow-blue-500/20 flex items-center gap-2"
              >
                <Code2 className="w-4 h-4" />
                <span>Start Assignment</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* INTERACTIVE WORKSPACE & CODE SUBMISSION MODAL */}
      {activeWorkspaceAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C1435]/80 backdrop-blur-md animate-in fade-in">
          <div
            className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#E6E9F0] overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#0C1435] to-[#1F295C] text-white flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-blue-300 font-bold mb-1">
                  <span>{activeWorkspaceAssignment.domain}</span> • <span>Deadline: {activeWorkspaceAssignment.deadline}</span>
                </div>
                <h3 className="text-xl font-black">{activeWorkspaceAssignment.title}</h3>
              </div>
              <button
                onClick={() => setActiveWorkspaceAssignment(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {!evaluationResult ? (
                <>
                  {/* Problem Details */}
                  <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] text-xs text-[#101936] leading-relaxed">
                    <strong className="block text-sm font-bold text-[#101936] mb-1">Problem Specs & Submission Guidelines:</strong>
                    {activeWorkspaceAssignment.problemStatement}
                  </div>

                  {/* Interactive Code Editor */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#101936] font-bold">
                      <span className="flex items-center gap-1.5">
                        <FileCode2 className="w-4 h-4 text-[#2563FF]" /> Solution Implementation Editor
                      </span>
                      <button
                        onClick={() => setUserCode(activeWorkspaceAssignment.starterCode)}
                        className="text-[11px] text-[#64708A] hover:text-[#2563FF] underline"
                      >
                        Reset to Starter Code
                      </button>
                    </div>
                    <textarea
                      rows={12}
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full p-4 rounded-2xl bg-[#0C1435] text-blue-300 font-mono text-xs focus:ring-2 focus:ring-[#2563FF] outline-none leading-relaxed resize-none shadow-inner"
                    />
                  </div>

                  {/* Terminal Output */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-slate-300 font-mono text-xs space-y-2 border border-slate-800">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5" /> Execution Console & Test Output</span>
                      <span>Output Status: Ready</span>
                    </div>
                    <pre className="whitespace-pre-wrap text-[11px] text-emerald-400">{terminalOutput}</pre>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#E6E9F0]">
                    <button
                      onClick={handleRunTests}
                      disabled={isRunningTests}
                      className="px-5 py-2.5 rounded-xl border border-[#2563FF] text-[#2563FF] text-xs font-bold hover:bg-blue-50 transition-colors flex items-center gap-1.5"
                    >
                      {isRunningTests ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                      <span>{isRunningTests ? 'Running...' : 'Run Test Cases'}</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveWorkspaceAssignment(null)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#64708A] hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmitEvaluation}
                        disabled={isSubmitting}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold shadow-md shadow-blue-500/25 hover:opacity-95 flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Grading Assignment Rubric...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Solution for Grading</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* EVALUATION SCORECARD MODAL CONTENT */
                <div className="space-y-6 py-4 animate-in zoom-in-95">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#10B981] mx-auto flex items-center justify-center text-3xl shadow-md shadow-emerald-500/20">
                      🏆
                    </div>
                    <h3 className="text-2xl font-black text-[#101936]">
                      Assignment Score: {evaluationResult.score}/100
                    </h3>
                    <p className="text-xs text-[#64708A]">
                      Verified by StepUp Automated Evaluation & Rubric Framework
                    </p>
                  </div>

                  {/* Multi-Criteria Score Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                    {evaluationResult.breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] flex items-center justify-between"
                      >
                        <span className="text-xs font-bold text-[#101936]">{item.subject}</span>
                        <span className="text-xs font-black px-2.5 py-1 rounded-full bg-blue-100 text-[#2563FF]">
                          {item.score}%
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Overall Skill Level & Star Rating */}
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 max-w-xl mx-auto text-center space-y-2">
                    <span className="text-xs font-bold text-[#7B3FF2] uppercase tracking-wider block">
                      Overall Skill Level & Rating
                    </span>
                    <div className="text-2xl text-amber-500 tracking-widest font-black">
                      {'★'.repeat(evaluationResult.stars)}
                      {'☆'.repeat(5 - evaluationResult.stars)}
                    </div>
                    <div className="text-xs font-extrabold text-[#101936]">
                      {evaluationResult.badge}
                    </div>
                  </div>

                  {/* Add to Achievements button */}
                  <div className="flex items-center justify-center gap-3 pt-4">
                    <button
                      onClick={handleAddToProfile}
                      className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-extrabold shadow-xl shadow-blue-500/25 hover:opacity-95 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4" />
                      <span>+ Add Score & Badge to Candidate Profile</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
