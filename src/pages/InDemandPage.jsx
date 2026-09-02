import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_RESUMES } from '../data/mockData';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ArrowRight,
  RefreshCw,
  BookOpen,
  Briefcase,
  Layers,
  Zap,
  Check,
  TrendingUp,
  FileUp,
  Cpu
} from 'lucide-react';

export default function InDemandPage() {
  const {
    resumeAnalysis,
    analyzeResume,
    loadSampleResume,
    setActiveTab,
    triggerCelebration,
    showToast
  } = useApp();

  const [resumeTextInput, setResumeTextInput] = useState(resumeAnalysis.rawText);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedSample, setSelectedSample] = useState('aids');
  const [uploadFileName, setUploadFileName] = useState('Pavs_Resume_2026.pdf');

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      analyzeResume(resumeTextInput);
      setIsScanning(false);
      triggerCelebration();
    }, 800);
  };

  const handleSampleSwitch = (key) => {
    setSelectedSample(key);
    loadSampleResume(key);
    if (SAMPLE_RESUMES[key]) {
      setResumeTextInput(SAMPLE_RESUMES[key].rawText);
      setUploadFileName(`${SAMPLE_RESUMES[key].name.split(' ')[0]}_Resume.pdf`);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFileName(file.name);
      // Read file content if text or simulate parse
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string' && text.trim().length > 20) {
          setResumeTextInput(text);
          analyzeResume(text);
        } else {
          // Simulation for binary/pdf
          const simText = `${file.name.replace(/\.[^/.]+$/, '')}
B.Tech Candidate
Technical Skills: Python, SQL, Power BI, Machine Learning, React, JavaScript, Git
Projects: Autonomous AI diagnostic and Web applications`;
          setResumeTextInput(simText);
          analyzeResume(simText);
        }
      };
      reader.readAsText(file);
      showToast('Resume Uploaded', `Parsed ${file.name} successfully.`, 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0C1435] via-[#151B42] to-[#7B3FF2] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
            🔥 Flagship AI Career Analyzer
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            In-Demand Skill Analyzer & Company Matcher
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Upload your resume to extract validated skills, uncover high-impact missing skill gaps, and match with the top hiring companies.
          </p>
        </div>

        {/* 1-Click Sample Resumes Switcher */}
        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2 self-stretch md:self-auto shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">
            Load Preset Candidate Resumes:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleSampleSwitch('aids')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSample === 'aids'
                  ? 'bg-white text-[#0C1435] shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Pavs (AI & DS)
            </button>
            <button
              onClick={() => handleSampleSwitch('webdev')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSample === 'webdev'
                  ? 'bg-white text-[#0C1435] shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Rahul (Web Dev)
            </button>
            <button
              onClick={() => handleSampleSwitch('cloud')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSample === 'cloud'
                  ? 'bg-white text-[#0C1435] shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Priya (Cloud)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload / Edit Resume Box (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E9F0]">
              <h3 className="text-sm font-extrabold text-[#101936] flex items-center gap-2">
                <FileUp className="w-4 h-4 text-[#2563FF]" /> Upload & Inspect Resume
              </h3>
              <span className="text-[11px] font-mono text-[#64708A] bg-slate-100 px-2 py-0.5 rounded-md">
                {uploadFileName}
              </span>
            </div>

            {/* Drag & Drop File Upload Area */}
            <div className="relative border-2 border-dashed border-[#2563FF]/30 hover:border-[#2563FF] rounded-2xl p-6 text-center bg-blue-50/20 transition-colors group cursor-pointer">
              <input
                type="file"
                accept=".pdf,.docx,.txt,.doc"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#2563FF] mx-auto flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-[#101936]">
                Click or Drag & Drop Resume File
              </h4>
              <p className="text-[11px] text-[#64708A] mt-0.5">
                Supports PDF, DOCX, TXT (Max 5MB)
              </p>
            </div>

            {/* Editable Raw Resume Text */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#101936]">
                  Extracted Resume Text
                </label>
                <span className="text-[10px] text-[#64708A]">Live Editable</span>
              </div>
              <textarea
                rows={11}
                value={resumeTextInput}
                onChange={(e) => setResumeTextInput(e.target.value)}
                placeholder="Paste resume text or project summaries here..."
                className="w-full p-3.5 rounded-2xl border border-[#E6E9F0] font-mono text-xs text-[#101936] focus:border-[#2563FF] outline-none bg-[#F7F8FC] leading-relaxed resize-none"
              />
            </div>

            {/* Scan Button */}
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning NLP Tokens & Skills...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>Analyze Resume & Match Companies</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Analysis Results & Matched Companies (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Resume Analysis Results */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E6E9F0]">
              <div>
                <span className="text-xs font-bold text-[#7B3FF2] uppercase tracking-wider">
                  Profile Classification
                </span>
                <h3 className="text-xl font-black text-[#101936] mt-0.5">
                  Your Profile → <span className="bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] bg-clip-text text-transparent">{resumeAnalysis.targetProfile}</span>
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-200 self-start sm:self-auto">
                ✓ Analysis Validated
              </span>
            </div>

            {/* Skills Found (Green Checkmarks) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#101936] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Skills Found ({resumeAnalysis.detectedSkills.length})
                </span>
                <span className="text-[11px] text-[#10B981] font-semibold">Verified on Profile</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeAnalysis.detectedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs"
                  >
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills (Amber Warning Chips with 1-Click Enroll) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#101936] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Missing High-Demand Skills ({resumeAnalysis.missingSkills.length})
                </span>
                <span className="text-[11px] text-amber-600 font-semibold">1-Click Bridge Gap</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeAnalysis.missingSkills.map((skill, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab('learning')}
                    className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 shadow-2xs transition-all text-left"
                  >
                    <span className="text-amber-600">⚠</span>
                    <span>{skill}</span>
                    <span className="text-[10px] text-amber-700 font-normal group-hover:underline flex items-center gap-0.5 ml-1">
                      Learn in StepUp <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Matching Algorithm Formula Box */}
            <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] text-xs text-[#64708A] space-y-1">
              <strong className="text-[#101936] block">StepUp Multi-Factor Matching Algorithm:</strong>
              <p className="leading-relaxed">
                Match Score = Resume Skills (45%) + Education/Degree (20%) + CGPA Cutoff (15%) + Course Certifications (10%) + Location Preference (10%).
              </p>
            </div>
          </div>

          {/* Recommended Companies List */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E9F0]">
              <div>
                <h3 className="text-lg font-black text-[#101936] flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#2563FF]" /> Recommended Companies For You
                </h3>
                <p className="text-xs text-[#64708A]">
                  Top hiring partners looking for your specific skill combination
                </p>
              </div>
              <button
                onClick={() => setActiveTab('jobs')}
                className="text-xs font-bold text-[#2563FF] hover:underline"
              >
                View All Matching Jobs
              </button>
            </div>

            <div className="space-y-3">
              {resumeAnalysis.matchedCompanies.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F7F8FC] hover:bg-white border border-[#E6E9F0] hover:border-[#2563FF] shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-sm text-[#0C1435] shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-[#101936]">{comp.name}</h4>
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-[#2563FF]">
                          Match: {comp.match}%
                        </span>
                      </div>
                      <p className="text-xs text-[#64708A] mt-1 leading-relaxed">
                        {comp.reason}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold hover:opacity-95 transition-all shadow-xs flex items-center justify-center gap-1.5 self-end sm:self-auto"
                  >
                    <span>View Jobs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
