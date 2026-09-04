import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Building,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Code,
  ShieldCheck,
  Check,
  Camera,
  Upload
} from 'lucide-react';

export default function CandidateDetailsSetupModal() {
  const {
    isDetailsSetupOpen,
    setIsDetailsSetupOpen,
    userProfile,
    setUserProfile,
    uploadUserPhoto,
    googleAccount,
    triggerCelebration,
    showToast,
    setActiveTab
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1); // 1: Personal, 2: Academics, 3: Skills & Career, 4: Links
  const setupPhotoInputRef = React.useRef(null);

  // Form State - always prioritize user's actual photo
  const [formData, setFormData] = useState({
    name: userProfile.name || googleAccount?.name || 'Pavani Kondreddy',
    avatar: userProfile.avatar || googleAccount?.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    email: userProfile.email || googleAccount?.email || 'kondreddypavani081@gmail.com',
    phone: userProfile.phone || '+91 98765 43210',
    location: userProfile.location || 'Bengaluru / Coimbatore',
    college: userProfile.college || 'PSG College of Technology',
    degree: userProfile.degree || 'B.Tech',
    department: userProfile.department || 'Artificial Intelligence & Data Science',
    graduationYear: userProfile.graduationYear || 2026,
    cgpa: userProfile.cgpa || 8.8,
    targetRole: 'Data Analyst / ML Engineer',
    skills: userProfile.skills || ['Python', 'SQL', 'Power BI', 'Machine Learning', 'Data Visualization', 'React'],
    github: userProfile.github || 'https://github.com/pavs-tech',
    linkedin: userProfile.linkedin || 'https://linkedin.com/in/pavs-aids',
    hackerrank: userProfile.hackerrank || 'https://hackerrank.com/pavs_ai'
  });

  // Sync avatar if updated in userProfile
  React.useEffect(() => {
    if (userProfile?.avatar) {
      setFormData((prev) => ({ ...prev, avatar: userProfile.avatar }));
    }
  }, [userProfile?.avatar]);

  const handleSetupPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const photoData = event.target.result;
          setFormData((prev) => ({ ...prev, avatar: photoData }));
          if (uploadUserPhoto) {
            uploadUserPhoto(photoData);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const popularSkills = [
    'Python', 'SQL', 'Power BI', 'Machine Learning', 'Data Analytics',
    'React', 'Node.js', 'JavaScript', 'HTML', 'CSS', 'Java', 'Spring Boot',
    'AWS', 'Docker', 'Kubernetes', 'Deep Learning', 'Generative AI', 'DSA', 'C++'
  ];

  const targetRolesList = [
    'Data Analyst',
    'ML Engineer',
    'Data Scientist',
    'AI Engineer',
    'Full Stack Web Developer',
    'Frontend Engineer',
    'Cloud & DevOps Engineer',
    'Software Engineer'
  ];

  if (!isDetailsSetupOpen) return null;

  const toggleSkill = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: formData.skills.filter((s) => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      });
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setUserProfile((prev) => ({
      ...prev,
      name: formData.name,
      avatar: formData.avatar || prev.avatar,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      college: formData.college,
      degree: formData.degree,
      department: formData.department,
      graduationYear: Number(formData.graduationYear),
      cgpa: parseFloat(formData.cgpa),
      skills: formData.skills.length > 0 ? formData.skills : prev.skills,
      github: formData.github,
      linkedin: formData.linkedin,
      hackerrank: formData.hackerrank,
      profileCompletion: 100
    }));

    setIsDetailsSetupOpen(false);
    triggerCelebration();
    showToast(
      'Profile Configured! 🎓',
      'Your verified student profile is 100% complete and visible to hiring recruiters.',
      'success'
    );
    setActiveTab('profile');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C1435]/80 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E6E9F0] overflow-hidden max-h-[90vh] flex flex-col transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Unstop / Glassdoor style) */}
        <div className="p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-white border-b border-[#E6E9F0] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#10B981] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Google OAuth Verified
              </span>
              <span className="text-xs text-[#64708A] font-semibold">
                Step {currentStep} of 4
              </span>
            </div>
            <h3 className="text-xl font-black text-[#101936]">
              Complete Your Candidate Profile
            </h3>
            <p className="text-xs text-[#64708A] mt-0.5">
              Enter your academic and technical details to unlock personalized job matches and assessments
            </p>
          </div>
          <button
            onClick={() => setIsDetailsSetupOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Dots */}
        <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-slate-100 bg-[#F7F8FC]/50 text-xs font-bold">
          <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'text-[#2563FF]' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">1</span>
            <span>Personal</span>
          </div>
          <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-[#2563FF]' : 'bg-slate-200'}`}></div>
          <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'text-[#2563FF]' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">2</span>
            <span>Academics</span>
          </div>
          <div className={`w-8 h-0.5 ${currentStep >= 3 ? 'bg-[#7B3FF2]' : 'bg-slate-200'}`}></div>
          <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? 'text-[#7B3FF2]' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[10px]">3</span>
            <span>Skills & Role</span>
          </div>
          <div className={`w-8 h-0.5 ${currentStep >= 4 ? 'bg-[#10B981]' : 'bg-slate-200'}`}></div>
          <div className={`flex items-center gap-1.5 ${currentStep >= 4 ? 'text-[#10B981]' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">4</span>
            <span>Portfolio Links</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* STEP 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              {/* Photo Upload Area */}
              <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] flex flex-col sm:flex-row items-center gap-4">
                <div className="relative group cursor-pointer" onClick={() => setupPhotoInputRef.current?.click()}>
                  <img
                    src={formData.avatar}
                    alt={formData.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#2563FF] shadow-xs"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="text-xs font-bold text-[#101936]">Candidate Profile Photo</div>
                  <div className="text-[11px] text-[#64708A] mt-0.5">
                    Upload your professional headshot or campus photo (JPG, PNG, WEBP)
                  </div>
                  <input
                    type="file"
                    ref={setupPhotoInputRef}
                    accept="image/*"
                    onChange={handleSetupPhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setupPhotoInputRef.current?.click()}
                    className="mt-2 px-3 py-1 rounded-xl border border-[#2563FF] bg-white hover:bg-blue-50 text-xs font-bold text-[#2563FF] transition-all inline-flex items-center gap-1.5 shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Custom Photo</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-bold text-[#101936] focus:border-[#2563FF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">
                    Verified Google Email *
                  </label>
                  <input
                    type="email"
                    disabled
                    value={formData.email}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-semibold text-[#101936] focus:border-[#2563FF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">
                    Current Location / City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Bengaluru / Coimbatore"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-semibold text-[#101936] focus:border-[#2563FF] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Academics */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">
                  College / Institute Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. PSG College of Technology"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-bold text-[#101936] focus:border-[#2563FF] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">Degree *</label>
                  <select
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-semibold text-[#101936] focus:border-[#2563FF] outline-none bg-white"
                  >
                    <option value="B.Tech">B.Tech</option>
                    <option value="B.E">B.E</option>
                    <option value="MCA">MCA</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="BCA">BCA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">
                    Graduation Batch / Year *
                  </label>
                  <select
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-semibold text-[#101936] focus:border-[#2563FF] outline-none bg-white"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">
                    Department / Branch *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Artificial Intelligence & Data Science"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-semibold text-[#101936] focus:border-[#2563FF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101936] mb-1">
                    Current CGPA (out of 10.0) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    required
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    placeholder="8.8"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-bold text-[#101936] focus:border-[#2563FF] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Skills & Target Career Role */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1.5">
                  Select Your Primary Target Role *
                </label>
                <select
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-bold text-[#7B3FF2] focus:border-[#7B3FF2] outline-none bg-white"
                >
                  {targetRolesList.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1.5">
                  Select Your Technical Skills (Click to toggle) *
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1">
                  {popularSkills.map((sk) => {
                    const isSelected = formData.skills.includes(sk);
                    return (
                      <button
                        type="button"
                        key={sk}
                        onClick={() => toggleSkill(sk)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#2563FF] text-white shadow-xs'
                            : 'bg-[#F7F8FC] text-[#64708A] hover:bg-slate-200 border border-[#E6E9F0]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                        <span>{sk}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="text-[11px] text-[#64708A] mt-1">
                  Selected: <strong>{formData.skills.length}</strong> skills
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Portfolio & Links */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/username"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-medium text-[#101936] focus:border-[#2563FF] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-medium text-[#101936] focus:border-[#2563FF] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101936] mb-1">
                  HackerRank / LeetCode / Coding Profile
                </label>
                <input
                  type="url"
                  value={formData.hackerrank}
                  onChange={(e) => setFormData({ ...formData, hackerrank: e.target.value })}
                  placeholder="https://hackerrank.com/username"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-medium text-[#101936] focus:border-[#2563FF] outline-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <strong>Profile Ready For Direct Recruiter Discovery:</strong> Your verified academic CGPA and skills will be automatically matched to Google, Microsoft, Deloitte, and TCS job openings.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 bg-[#F7F8FC] border-t border-[#E6E9F0] flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-4 py-2.5 rounded-xl border border-[#E6E9F0] text-xs font-bold text-[#64708A] hover:bg-slate-100 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold shadow-md hover:opacity-95 flex items-center gap-1.5"
            >
              <span>Next Step</span> <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#2563FF] text-white text-xs font-black shadow-lg shadow-emerald-500/20 hover:opacity-95 flex items-center gap-1.5"
            >
              <span>Save & Complete Profile</span> <Sparkles className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
