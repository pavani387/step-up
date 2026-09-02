import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_USERS,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_COURSES,
  INITIAL_ASSIGNMENTS,
  INITIAL_ACHIEVEMENTS,
  SAMPLE_RESUMES,
  RECRUITER_CANDIDATES,
  RECRUITER_STATS
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation & Role
  const [activeTab, setActiveTab] = useState('home');
  const [currentRole, setCurrentRole] = useState('student'); // 'student' | 'company' | 'admin'
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Google Account Verification & Onboarding States (Unstop / Glassdoor style)
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isDetailsSetupOpen, setIsDetailsSetupOpen] = useState(false);
  const [isGoogleVerified, setIsGoogleVerified] = useState(() => {
    const saved = localStorage.getItem('stepup_google_verified');
    return saved ? JSON.parse(saved) : true;
  });
  const [googleAccount, setGoogleAccount] = useState(() => {
    const saved = localStorage.getItem('stepup_google_account');
    return saved ? JSON.parse(saved) : {
      email: 'pavs.aids@psgtech.edu',
      name: 'Pavs',
      picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      verifiedAt: 'Sep 2026',
      oauthProvider: 'Google Security Services (OAuth 2.0)'
    };
  });

  // User Profile
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('stepup_user_profile');
    return saved ? JSON.parse(saved) : INITIAL_USERS.student;
  });

  const [companyProfile, setCompanyProfile] = useState(() => {
    const saved = localStorage.getItem('stepup_company_profile');
    return saved ? JSON.parse(saved) : INITIAL_USERS.company;
  });

  // Jobs
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('stepup_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [savedJobIds, setSavedJobIds] = useState(() => {
    const saved = localStorage.getItem('stepup_saved_jobs');
    return saved ? JSON.parse(saved) : ['job_001', 'job_003'];
  });

  // Applications
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('stepup_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // Achievements
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('stepup_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  // Courses
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('stepup_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  // Resume Analysis State
  const [resumeAnalysis, setResumeAnalysis] = useState(() => {
    return SAMPLE_RESUMES.aids;
  });

  // Recruiter Dashboard State
  const [recruiterCandidates, setRecruiterCandidates] = useState(() => {
    const saved = localStorage.getItem('stepup_recruiter_candidates');
    return saved ? JSON.parse(saved) : RECRUITER_CANDIDATES;
  });

  const [recruiterStats, setRecruiterStats] = useState(() => {
    const saved = localStorage.getItem('stepup_recruiter_stats');
    return saved ? JSON.parse(saved) : RECRUITER_STATS;
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('stepup_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('stepup_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('stepup_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('stepup_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('stepup_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('stepup_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('stepup_recruiter_candidates', JSON.stringify(recruiterCandidates));
  }, [recruiterCandidates]);

  // Toast Helper
  const showToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // User Profile Photo Upload
  const uploadUserPhoto = (photoDataUrl) => {
    setUserProfile((prev) => {
      const updated = { ...prev, avatar: photoDataUrl };
      localStorage.setItem('stepup_user_profile', JSON.stringify(updated));
      return updated;
    });
    showToast('Profile Photo Updated! 📷', 'Your new photo has been updated across your profile and job applications.', 'success');
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563FF', '#7B3FF2', '#10B981', '#F59E0B']
      });
    } catch {
      // safe fallback
    }
  };

  // Role Switcher
  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'company') {
      setActiveTab('company');
      showToast('Role Switched', 'Viewing platform as Google Campus Recruiter.', 'info');
    } else if (newRole === 'admin') {
      setActiveTab('company');
      showToast('Role Switched', 'Viewing platform as StepUp Platform Administrator.', 'info');
    } else {
      setActiveTab('home');
      showToast('Role Switched', 'Viewing platform as Pavs (AI & DS Student).', 'info');
    }
  };

  // Job Actions
  const toggleSaveJob = (jobId) => {
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
      showToast('Job Removed', 'Removed from saved jobs bookmarks.', 'info');
    } else {
      setSavedJobIds((prev) => [...prev, jobId]);
      showToast('Job Saved', 'Saved to your bookmarked jobs.', 'success');
    }
  };

  const applyToJob = (job, applicantDetails = {}) => {
    // Check if already applied
    const existing = applications.find((a) => a.jobId === job.id);
    if (existing) {
      showToast('Already Applied', `You have already applied for ${job.title} at ${job.companyName}.`, 'info');
      setActiveTab('jobs');
      return false;
    }

    const newApp = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      companyName: job.companyName,
      title: job.title,
      logo: job.logo,
      appliedDate: 'Just now',
      status: 'Applied',
      statusStep: 1,
      notes: applicantDetails.note || 'Application submitted via StepUp Instant Apply with verified profile and skill score.',
      matchScore: job.matchScore || 90,
      location: job.location,
      salary: job.salary
    };

    setApplications((prev) => [newApp, ...prev]);

    // Also update recruiter's list if it's for their company
    const newCandidate = {
      id: `cand_${Date.now()}`,
      name: userProfile.name,
      avatar: userProfile.avatar,
      email: userProfile.email,
      phone: userProfile.phone,
      college: userProfile.college,
      degree: `${userProfile.degree} ${userProfile.department}`,
      batch: userProfile.graduationYear,
      cgpa: userProfile.cgpa,
      skills: userProfile.skills,
      matchScore: job.matchScore || 92,
      appliedJob: job.title,
      status: 'Applied',
      assessmentScore: 89,
      resumeSnippet: 'Applied with StepUp Verified Resume and 8.8 CGPA.'
    };

    setRecruiterCandidates((prev) => [newCandidate, ...prev]);
    setRecruiterStats((prev) => ({
      ...prev,
      applications: prev.applications + 1
    }));

    triggerCelebration();
    showToast('Application Submitted! 🎉', `Applied successfully to ${job.companyName} for ${job.title}.`, 'success');
    return true;
  };

  // Add Job by Recruiter
  const postNewJob = (newJobData) => {
    const newJob = {
      id: `job_${Date.now()}`,
      companyName: companyProfile.companyName || 'Google',
      logo: companyProfile.companyLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
      title: newJobData.title,
      location: newJobData.location,
      degree: newJobData.degree || 'B.Tech / B.E',
      branches: newJobData.branches || ['CSE', 'IT', 'AI & DS'],
      batch: newJobData.batch || '2026–2027',
      experience: newJobData.experience || 'Fresher',
      salary: newJobData.salary,
      deadline: newJobData.deadline || 'Nov 30, 2026',
      jobType: newJobData.jobType || 'Full-time',
      workMode: newJobData.workMode || 'Hybrid',
      cgpaCutoff: parseFloat(newJobData.cgpaCutoff) || 7.0,
      requiredSkills: typeof newJobData.requiredSkills === 'string' 
        ? newJobData.requiredSkills.split(',').map((s) => s.trim()) 
        : newJobData.requiredSkills,
      description: newJobData.description,
      eligibility: newJobData.eligibility || `B.Tech with minimum ${newJobData.cgpaCutoff || 7.0} CGPA.`,
      applyLink: '#',
      matchScore: 88,
      postedDate: 'Just now',
      applicantsCount: 0,
      featured: false
    };

    setJobs((prev) => [newJob, ...prev]);
    setRecruiterStats((prev) => ({ ...prev, activeJobs: prev.activeJobs + 1 }));
    showToast('Job Published! 💼', `${newJob.title} is now live and accepting applications.`, 'success');
  };

  // Candidate Status update (Recruiter Action)
  const updateCandidateStatus = (candidateId, newStatus) => {
    setRecruiterCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );

    // Update recruiter stats counters
    if (newStatus === 'Shortlisted') {
      setRecruiterStats((prev) => ({ ...prev, shortlisted: prev.shortlisted + 1 }));
    } else if (newStatus === 'Interview') {
      setRecruiterStats((prev) => ({ ...prev, interviews: prev.interviews + 1 }));
    } else if (newStatus === 'Selected 🎉') {
      setRecruiterStats((prev) => ({ ...prev, selected: prev.selected + 1 }));
      triggerCelebration();
    }

    showToast('Status Updated', `Candidate status changed to ${newStatus}.`, 'success');
  };

  // Achievement Management
  const addAchievement = (achData) => {
    const newAch = {
      id: `ach_${Date.now()}`,
      candidateId: userProfile.id,
      title: achData.title,
      type: achData.type || 'Certification',
      description: achData.description,
      issuer: achData.issuer || 'StepUp Verified Partner',
      date: achData.date || 'September 2026',
      verified: true,
      certificateUrl: `https://stepup.edu/verify/cert_${Date.now().toString(36)}`
    };

    setAchievements((prev) => [newAch, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      profileCompletion: Math.min(100, prev.profileCompletion + 5)
    }));

    triggerCelebration();
    showToast('Achievement Published! 🏆', `${newAch.title} has been added to your verified profile.`, 'success');
  };

  const deleteAchievement = (achId) => {
    setAchievements((prev) => prev.filter((a) => a.id !== achId));
    showToast('Achievement Removed', 'Removed from your profile timeline.', 'info');
  };

  // Learning Progress Management
  const toggleCourseModule = (courseId, moduleId) => {
    setCourses((prevCourses) =>
      prevCourses.map((crs) => {
        if (crs.id !== courseId) return crs;
        const updatedModules = crs.modules.map((m) =>
          m.id === moduleId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = updatedModules.filter((m) => m.completed).length;
        const newProgress = Math.round((completedCount / updatedModules.length) * 100);

        if (newProgress === 100 && crs.progress < 100) {
          triggerCelebration();
          showToast('Course Completed! 🎓', `You completed "${crs.title}". Certificate generated!`, 'success');
          // Add certificate to achievements
          addAchievement({
            title: `${crs.title} Certificate of Mastery`,
            type: 'Certification',
            description: `Successfully mastered all ${updatedModules.length} core competencies with 100% completion rate.`,
            issuer: `StepUp Academy & ${crs.instructor}`,
            date: 'September 2026'
          });
        }

        return {
          ...crs,
          modules: updatedModules,
          progress: newProgress
        };
      })
    );
  };

  // In-Demand Resume Analysis Engine
  const analyzeResume = (resumeText) => {
    const textLower = resumeText.toLowerCase();

    const allKnownSkills = [
      'Python', 'SQL', 'Power BI', 'Machine Learning', 'Data Visualization',
      'Pandas', 'NumPy', 'Scikit-learn', 'Deep Learning', 'NLP', 'Data Analytics',
      'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'Java',
      'Spring Boot', 'C++', 'C', 'AWS', 'Docker', 'Kubernetes', 'CI/CD',
      'Excel', 'Linux', 'Git', 'Computer Vision', 'Generative AI', 'DSA'
    ];

    const detected = [];
    allKnownSkills.forEach((skill) => {
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(textLower)) {
        detected.push(skill);
      }
    });

    const isDataFocus = detected.includes('Python') && (detected.includes('SQL') || detected.includes('Machine Learning'));
    const isWebFocus = detected.includes('React') || detected.includes('JavaScript') || detected.includes('HTML');
    const isCloudFocus = detected.includes('AWS') || detected.includes('Docker') || detected.includes('Kubernetes');

    let targetRole = 'Software Engineer';
    let missing = ['AWS', 'Docker', 'React', 'Kubernetes', 'CI/CD'];

    if (isDataFocus) {
      targetRole = 'Data Analyst / ML Engineer';
      missing = ['AWS', 'Docker', 'React', 'Kubernetes', 'Generative AI'].filter((s) => !detected.includes(s));
    } else if (isWebFocus) {
      targetRole = 'Full Stack Web Developer';
      missing = ['Kubernetes', 'AWS', 'Docker', 'GraphQL', 'CI/CD'].filter((s) => !detected.includes(s));
    } else if (isCloudFocus) {
      targetRole = 'Cloud & DevOps Architect';
      missing = ['React', 'Power BI', 'Machine Learning', 'Deep Learning'].filter((s) => !detected.includes(s));
    }

    // Match Companies
    const matched = [
      {
        name: 'Microsoft',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg',
        match: Math.min(97, 75 + detected.length * 2),
        reason: 'Strong alignment with your core programming, query design, and analytical baseline.'
      },
      {
        name: 'Deloitte',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg',
        match: Math.min(94, 72 + detected.length * 2),
        reason: 'Matches enterprise advisory and client analytics technology requirements.'
      },
      {
        name: 'Accenture',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg',
        match: Math.min(92, 70 + detected.length * 2),
        reason: 'High compatibility with application engineering roles.'
      },
      {
        name: 'TCS',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
        match: Math.min(90, 68 + detected.length * 2),
        reason: 'High CGPA & problem solving match Digital stream criteria.'
      },
      {
        name: 'Infosys',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
        match: Math.min(88, 65 + detected.length * 2),
        reason: 'Good baseline; learn cloud containerization to boost to 96%.'
      }
    ];

    const result = {
      name: 'Custom Analyzed Candidate Profile',
      targetRole,
      rawText: resumeText,
      detectedSkills: detected.length > 0 ? detected : ['Python', 'SQL', 'Git'],
      missingSkills: missing.slice(0, 4),
      targetProfile: targetRole,
      matchedCompanies: matched
    };

    setResumeAnalysis(result);
    showToast('Resume Analyzed! 🎯', `Extracted ${result.detectedSkills.length} skills. Matched top 5 hiring companies!`, 'success');
    return result;
  };

  const loadSampleResume = (sampleKey) => {
    if (SAMPLE_RESUMES[sampleKey]) {
      setResumeAnalysis(SAMPLE_RESUMES[sampleKey]);
      showToast('Sample Resume Loaded', `Switched to ${SAMPLE_RESUMES[sampleKey].name}`, 'info');
    }
  };

  // Google Account Verification Handler
  const verifyGoogleAccount = (accountData, promptDetailsSetup = true) => {
    setIsGoogleVerified(true);
    setGoogleAccount(accountData);
    localStorage.setItem('stepup_google_verified', JSON.stringify(true));
    localStorage.setItem('stepup_google_account', JSON.stringify(accountData));

    // Update user profile email & avatar if candidate
    if (currentRole === 'student') {
      setUserProfile((prev) => ({
        ...prev,
        name: accountData.name || prev.name,
        email: accountData.email || prev.email,
        avatar: accountData.picture || prev.avatar,
        profileCompletion: Math.min(100, prev.profileCompletion + 10)
      }));
    }

    triggerCelebration();
    showToast('Google Account Verified! 🛡️', `Connected securely as ${accountData.email}`, 'success');
    setIsGoogleModalOpen(false);

    if (promptDetailsSetup) {
      setTimeout(() => {
        setIsDetailsSetupOpen(true);
      }, 500);
    }
  };

  const disconnectGoogleAccount = () => {
    setIsGoogleVerified(false);
    localStorage.setItem('stepup_google_verified', JSON.stringify(false));
    showToast('Google Disconnected', 'Google OAuth account unlinked from StepUp.', 'info');
  };

  const value = {
    activeTab,
    setActiveTab,
    currentRole,
    switchRole,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    isSearchOpen,
    setIsSearchOpen,
    globalSearchQuery,
    setGlobalSearchQuery,
    isGoogleModalOpen,
    setIsGoogleModalOpen,
    isDetailsSetupOpen,
    setIsDetailsSetupOpen,
    isGoogleVerified,
    googleAccount,
    verifyGoogleAccount,
    disconnectGoogleAccount,
    userProfile,
    setUserProfile,
    uploadUserPhoto,
    companyProfile,
    setCompanyProfile,
    jobs,
    setJobs,
    savedJobIds,
    toggleSaveJob,
    applications,
    applyToJob,
    postNewJob,
    achievements,
    addAchievement,
    deleteAchievement,
    courses,
    toggleCourseModule,
    resumeAnalysis,
    analyzeResume,
    loadSampleResume,
    recruiterCandidates,
    updateCandidateStatus,
    recruiterStats,
    toasts,
    showToast,
    removeToast,
    triggerCelebration
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
