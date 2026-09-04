// STEPUP Platform Comprehensive Mock Dataset
export const INITIAL_USERS = {
  student: {
    id: 'usr_001',
    name: 'Pavani',
    email: 'kondreddypavani081@gmail.com',
    phone: '+91 98765 43210',
    role: 'student',
    college: 'PSG College of Technology',
    degree: 'B.Tech',
    department: 'Artificial Intelligence & Data Science',
    graduationYear: 2026,
    cgpa: 8.8,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    location: 'Bengaluru / Coimbatore',
    github: 'https://github.com/pavs-tech',
    linkedin: 'https://linkedin.com/in/pavs-aids',
    hackerrank: 'https://hackerrank.com/pavs_ai',
    skills: ['Python', 'SQL', 'Power BI', 'Machine Learning', 'Data Visualization', 'Pandas', 'NumPy', 'Scikit-Learn', 'HTML', 'CSS', 'JavaScript'],
    profileCompletion: 80,
    careerMatches: [
      { role: 'Data Analyst', match: 91, demand: 'High', avgSalary: '₹9.5 LPA' },
      { role: 'ML Engineer', match: 84, demand: 'Very High', avgSalary: '₹14.0 LPA' },
      { role: 'Data Scientist', match: 79, demand: 'High', avgSalary: '₹16.0 LPA' },
      { role: 'AI Engineer', match: 76, demand: 'Explosive', avgSalary: '₹18.0 LPA' },
      { role: 'Web Developer', match: 68, demand: 'Steady', avgSalary: '₹8.0 LPA' }
    ],
    missingSkills: ['AWS', 'Docker', 'React', 'Kubernetes', 'CI/CD']
  },
  company: {
    id: 'usr_002',
    name: 'Campus Hiring Lead',
    email: 'recruiter@google.com',
    phone: '+91 98112 34567',
    role: 'company',
    companyName: 'Google',
    companyLogo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    industry: 'Cloud, Search & AI',
    website: 'https://careers.google.com',
    location: 'Bangalore / Hyderabad',
    description: 'Google is a global technology leader focused on building products that improve the lives of people around the world.'
  },
  admin: {
    id: 'usr_003',
    name: 'StepUp Administrator',
    email: 'admin@stepup.edu',
    phone: '+91 80000 11223',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
  }
};

export const INITIAL_ACHIEVEMENTS = [
  {
    id: 'ach_01',
    candidateId: 'usr_001',
    title: 'AI Hackathon 2026 — 2nd Place',
    type: 'Hackathon',
    description: 'Secured 2nd position among 450+ collegiate teams for developing a generative AI agricultural crop disease detector with real-time edge inference.',
    issuer: 'National AI Innovation Conclave & Microsoft',
    date: 'September 2026',
    verified: true,
    certificateUrl: 'https://stepup.edu/verify/cert_ai_hack_2026'
  },
  {
    id: 'ach_02',
    candidateId: 'usr_001',
    title: 'Python for Data Science Professional Certification',
    type: 'Certification',
    description: 'Mastered advanced data structures, automated EDA pipelines, statistical modeling, and vector computation with NumPy & Pandas.',
    issuer: 'DeepLearning.AI & StepUp Academy',
    date: 'July 2026',
    verified: true,
    certificateUrl: 'https://stepup.edu/verify/cert_py_ds_2026'
  },
  {
    id: 'ach_03',
    candidateId: 'usr_001',
    title: '5-Star Gold Badge in Problem Solving',
    type: 'Coding Competition',
    description: 'Solved 150+ complex algorithmic challenges in Data Structures & Dynamic Programming with 99.4 percentile.',
    issuer: 'HackerRank Global',
    date: 'May 2026',
    verified: true,
    certificateUrl: 'https://stepup.edu/verify/cert_hr_gold'
  },
  {
    id: 'ach_04',
    candidateId: 'usr_001',
    title: 'Published ML Research Paper',
    type: 'Research & Project',
    description: 'Published research paper titled Lightweight Convolutional Architectures for Edge Inference in IEEE Student Symposium.',
    issuer: 'IEEE Computer Society',
    date: 'March 2026',
    verified: true,
    certificateUrl: 'https://stepup.edu/verify/cert_ieee_ml'
  }
];

export const INITIAL_JOBS = [
  {
    id: 'job_001',
    companyName: 'Google',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    title: 'Software Engineer Intern',
    location: 'Bangalore, India',
    degree: 'B.Tech / B.E',
    branches: ['CSE', 'IT', 'AI & DS', 'ECE'],
    batch: '2027–2028',
    experience: 'Fresher / Intern',
    salary: '₹1,20,000 / month',
    deadline: 'Oct 30, 2026',
    jobType: 'Internship',
    workMode: 'Hybrid',
    cgpaCutoff: 7.0,
    requiredSkills: ['Python', 'Java', 'DSA', 'SQL'],
    description: 'Google software engineers develop next-generation technologies that change how billions of users connect, explore, and interact with information.',
    eligibility: 'Currently enrolled in an undergraduate degree in CS, AI, or related field. CGPA > 7.0.',
    applyLink: '#',
    matchScore: 92,
    postedDate: '2 days ago',
    applicantsCount: 342,
    featured: true
  },
  {
    id: 'job_002',
    companyName: 'Microsoft',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg',
    title: 'Data Analyst — University Graduate',
    location: 'Hyderabad, India',
    degree: 'B.Tech / B.E / B.Sc',
    branches: ['AI & DS', 'CSE', 'IT', 'ECE'],
    batch: '2026–2027',
    experience: '0–1 Years',
    salary: '₹14,50,000 / year',
    deadline: 'Nov 15, 2026',
    jobType: 'Full-time',
    workMode: 'On-site',
    cgpaCutoff: 7.5,
    requiredSkills: ['Python', 'SQL', 'Power BI', 'Excel', 'Machine Learning'],
    description: 'Extract actionable insights from telemetry data, construct executive Power BI dashboards, and build predictive churn models.',
    eligibility: 'B.Tech / B.E graduating in 2026 or 2027 with minimum 7.5 CGPA.',
    applyLink: '#',
    matchScore: 95,
    postedDate: 'Just now',
    applicantsCount: 218,
    featured: true
  },
  {
    id: 'job_003',
    companyName: 'Deloitte',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg',
    title: 'Associate Analyst — AI & Data Advisory',
    location: 'Bengaluru / Gurgaon',
    degree: 'B.Tech / B.E / MCA',
    branches: ['AI & DS', 'CSE', 'IT', 'ECE', 'EEE'],
    batch: '2026–2027',
    experience: 'Fresher',
    salary: '₹9,50,000 / year',
    deadline: 'Oct 25, 2026',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    cgpaCutoff: 6.8,
    requiredSkills: ['Python', 'SQL', 'Power BI', 'Data Analytics', 'Data Visualization'],
    description: 'Work with Fortune 500 clients to architect modern data pipelines, perform advanced statistical modeling, and implement enterprise BI solutions.',
    eligibility: 'Graduating batch 2026/2027 with strong command over SQL, Python and Power BI.',
    applyLink: '#',
    matchScore: 89,
    postedDate: '3 days ago',
    applicantsCount: 185,
    featured: true
  },
  {
    id: 'job_004',
    companyName: 'Accenture',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg',
    title: 'Advanced App Engineering Analyst',
    location: 'Pune / Remote',
    degree: 'B.Tech / B.E / MCA',
    branches: ['All Branches'],
    batch: '2026–2027',
    experience: 'Fresher',
    salary: '₹8,50,000 / year',
    deadline: 'Nov 05, 2026',
    jobType: 'Full-time',
    workMode: 'Remote',
    cgpaCutoff: 6.5,
    requiredSkills: ['React', 'Node.js', 'JavaScript', 'HTML', 'CSS', 'SQL'],
    description: 'Design and build resilient full-stack web applications using modern JavaScript/TypeScript ecosystem and microservices architectures.',
    eligibility: 'All Engineering branches with minimum 6.5 CGPA.',
    applyLink: '#',
    matchScore: 87,
    postedDate: '1 day ago',
    applicantsCount: 420,
    featured: false
  },
  {
    id: 'job_005',
    companyName: 'TCS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
    title: 'TCS Digital — AI & Cloud Specialist',
    location: 'Chennai / Hyderabad',
    degree: 'B.Tech / M.Tech / MCA',
    branches: ['CSE', 'IT', 'AI & DS', 'ECE'],
    batch: '2026–2027',
    experience: 'Fresher',
    salary: '₹7,50,000 / year',
    deadline: 'Oct 28, 2026',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    cgpaCutoff: 7.0,
    requiredSkills: ['Java', 'Python', 'SQL', 'Machine Learning', 'DSA'],
    description: 'Work on flagship enterprise R&D projects in AI, Cloud infrastructure modernization, and high-frequency transaction systems.',
    eligibility: 'B.Tech with 7.0 CGPA without standing backlogs.',
    applyLink: '#',
    matchScore: 84,
    postedDate: '4 days ago',
    applicantsCount: 650,
    featured: false
  },
  {
    id: 'job_006',
    companyName: 'Infosys',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
    title: 'Specialist Programmer (Power Programmer)',
    location: 'Bangalore / Mysuru',
    degree: 'B.Tech / B.E',
    branches: ['CSE', 'IT', 'AI & DS', 'ECE', 'EEE'],
    batch: '2026–2027',
    experience: 'Fresher',
    salary: '₹9,00,000 / year',
    deadline: 'Nov 12, 2026',
    jobType: 'Full-time',
    workMode: 'On-site',
    cgpaCutoff: 7.0,
    requiredSkills: ['Python', 'Machine Learning', 'Deep Learning', 'Docker', 'AWS'],
    description: 'Specialist Programmers are elite polyglot developers involved in high-complexity software product architectures and AI modeling.',
    eligibility: 'B.Tech graduating in 2026 with high problem-solving proficiency.',
    applyLink: '#',
    matchScore: 81,
    postedDate: '5 days ago',
    applicantsCount: 290,
    featured: false
  },
  {
    id: 'job_007',
    companyName: 'Amazon',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    title: 'Applied Scientist Intern',
    location: 'Hyderabad, India',
    degree: 'B.Tech / M.Tech / MS',
    branches: ['AI & DS', 'CSE', 'ECE'],
    batch: '2027–2028',
    experience: 'Fresher / Intern',
    salary: '₹1,50,000 / month',
    deadline: 'Nov 30, 2026',
    jobType: 'Internship',
    workMode: 'Hybrid',
    cgpaCutoff: 8.0,
    requiredSkills: ['Python', 'Machine Learning', 'Deep Learning', 'NLP', 'PyTorch'],
    description: 'Build novel transformer models and reinforcement learning systems to optimize Alexa, Prime Video recommendations, and Amazon logistics.',
    eligibility: 'Students pursuing degree in Computer Science, Data Science or Machine Learning with minimum 8.0 CGPA.',
    applyLink: '#',
    matchScore: 88,
    postedDate: '1 week ago',
    applicantsCount: 512,
    featured: true
  },
  {
    id: 'job_008',
    companyName: 'Uber',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png',
    title: 'Frontend Engineer — Core Web',
    location: 'Hyderabad / Bangalore',
    degree: 'B.Tech / B.E',
    branches: ['CSE', 'IT', 'AI & DS', 'ECE'],
    batch: '2026–2027',
    experience: '0–1 Years',
    salary: '₹22,00,000 / year',
    deadline: 'Nov 20, 2026',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    cgpaCutoff: 7.5,
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js'],
    description: 'Create lightning-fast, accessible web portals used by millions of drivers, couriers, and riders across the globe.',
    eligibility: 'B.Tech in CS/IT/AI with strong frontend design and web vitals proficiency.',
    applyLink: '#',
    matchScore: 78,
    postedDate: '3 days ago',
    applicantsCount: 310,
    featured: true
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app_001',
    jobId: 'job_002',
    companyName: 'Microsoft',
    title: 'Data Analyst — University Graduate',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg',
    appliedDate: 'Sep 01, 2026',
    status: 'Interview',
    statusStep: 4,
    notes: 'Technical Interview round scheduled with Principal Analytics Manager on Sep 08, 2026.',
    matchScore: 95,
    location: 'Hyderabad, India',
    salary: '₹14.5 LPA'
  },
  {
    id: 'app_002',
    jobId: 'job_001',
    companyName: 'Google',
    title: 'Software Engineer Intern',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    appliedDate: 'Aug 28, 2026',
    status: 'Assessment',
    statusStep: 3,
    notes: 'Coding & Algorithmic screening assessment link sent. Deadline: 48 hours.',
    matchScore: 92,
    location: 'Bangalore, India',
    salary: '₹1.2L/month'
  },
  {
    id: 'app_003',
    jobId: 'job_003',
    companyName: 'Deloitte',
    title: 'Associate Analyst — AI & Data Advisory',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg',
    appliedDate: 'Aug 24, 2026',
    status: 'Resume Shortlisted',
    statusStep: 2,
    notes: 'Profile shortlisted by Campus Recruitment Team. Awaiting interview slot confirmation.',
    matchScore: 89,
    location: 'Bengaluru / Gurgaon',
    salary: '₹9.5 LPA'
  },
  {
    id: 'app_004',
    jobId: 'job_005',
    companyName: 'TCS',
    title: 'TCS Digital — AI & Cloud Specialist',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
    appliedDate: 'Aug 15, 2026',
    status: 'Selected 🎉',
    statusStep: 5,
    notes: 'Congratulations! Offer letter generated for TCS Digital stream.',
    matchScore: 84,
    location: 'Chennai / Hyderabad',
    salary: '₹7.5 LPA'
  }
];

export const LEARNING_CATEGORIES = [
  {
    id: 'prog',
    name: 'Programming',
    icon: 'Code2',
    description: 'Core logic, data structures, and foundational software engineering.',
    skills: ['C', 'C++', 'Java', 'Python', 'JavaScript']
  },
  {
    id: 'web',
    name: 'Web Development',
    icon: 'Globe',
    description: 'Modern full-stack web applications, reactive UIs, and robust REST APIs.',
    skills: ['HTML', 'CSS', 'React', 'Node.js', 'Express.js']
  },
  {
    id: 'data',
    name: 'Data',
    icon: 'Database',
    description: 'Database query design, business intelligence, and analytical storytelling.',
    skills: ['SQL', 'Power BI', 'Excel', 'Data Analytics', 'Data Visualization']
  },
  {
    id: 'aiml',
    name: 'AI & ML',
    icon: 'Brain',
    description: 'Machine learning algorithms, neural nets, NLP, and Generative AI systems.',
    skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Generative AI']
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    icon: 'Cloud',
    description: 'Scalable cloud infrastructure, automated CI/CD pipelines, and microservices.',
    skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD']
  }
];

export const INITIAL_COURSES = [
  {
    id: 'crs_01',
    category: 'aiml',
    title: 'Python for Data Science & Machine Learning',
    instructor: 'Dr. Andrew Chen (Ex-Google AI)',
    level: 'Intermediate',
    duration: '14 Hours',
    rating: 4.9,
    enrolledCount: 14200,
    progress: 70,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    skillsGained: ['Python', 'NumPy', 'Pandas', 'Data Visualization', 'Machine Learning'],
    description: 'Comprehensive bootcamp covering Python fundamentals, statistical exploration with Pandas, and building predictive Scikit-Learn models.',
    modules: [
      { id: 'm1', title: 'Python Basics & Control Flow', completed: true, duration: '2h 15m' },
      { id: 'm2', title: 'NumPy Vectorized Computing & Arrays', completed: true, duration: '2h 45m' },
      { id: 'm3', title: 'Pandas DataFrames & Real-world Data Wrangling', completed: true, duration: '3h 30m' },
      { id: 'm4', title: 'Data Visualization with Matplotlib & Seaborn', completed: true, duration: '2h 30m' },
      { id: 'm5', title: 'Supervised Machine Learning & Model Evaluation', completed: false, duration: '3h 00m' }
    ]
  },
  {
    id: 'crs_02',
    category: 'data',
    title: 'SQL & Power BI Masterclass for Business Intelligence',
    instructor: 'Sarah Jenkins (Principal BI Architect)',
    level: 'Beginner to Intermediate',
    duration: '10 Hours',
    rating: 4.8,
    enrolledCount: 9800,
    progress: 45,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    skillsGained: ['SQL', 'Power BI', 'DAX', 'Data Analytics', 'Excel'],
    description: 'Learn enterprise SQL queries, window functions, CTEs, and construct dynamic interactive Power BI dashboards for executive decision makers.',
    modules: [
      { id: 'm1', title: 'Relational Database Schema Design & Normalization', completed: true, duration: '1h 45m' },
      { id: 'm2', title: 'Advanced SQL Joins, Aggregations & Subqueries', completed: true, duration: '2h 30m' },
      { id: 'm3', title: 'Window Functions, Partitioning & Ranking', completed: false, duration: '2h 15m' },
      { id: 'm4', title: 'Connecting Data in Power BI & DAX Formulas', completed: false, duration: '2h 00m' },
      { id: 'm5', title: 'Building Interactive Corporate Dashboards', completed: false, duration: '1h 30m' }
    ]
  },
  {
    id: 'crs_03',
    category: 'cloud',
    title: 'AWS Cloud Practitioner & Docker Containerization',
    instructor: 'Marcus Reynolds (AWS Community Hero)',
    level: 'Intermediate',
    duration: '12 Hours',
    rating: 4.9,
    enrolledCount: 11200,
    progress: 15,
    thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=600',
    skillsGained: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    description: 'Bridge your missing cloud skill gap! Learn how to package applications in Docker, deploy microservices on AWS ECS/EKS, and automate with GitHub Actions CI/CD.',
    modules: [
      { id: 'm1', title: 'Cloud Computing Fundamentals & AWS Core Services', completed: true, duration: '2h 00m' },
      { id: 'm2', title: 'Docker Containers, Images, & Multi-stage Builds', completed: false, duration: '2h 45m' },
      { id: 'm3', title: 'Container Orchestration with Kubernetes Pods & Services', completed: false, duration: '3h 15m' },
      { id: 'm4', title: 'Automated CI/CD Pipelines with GitHub Actions', completed: false, duration: '2h 00m' },
      { id: 'm5', title: 'Production Cloud Deployment & Monitoring', completed: false, duration: '2h 00m' }
    ]
  },
  {
    id: 'crs_04',
    category: 'web',
    title: 'Full-Stack Modern Web with React & Node.js',
    instructor: 'Elena Rostova (Tech Lead)',
    level: 'Intermediate',
    duration: '16 Hours',
    rating: 4.85,
    enrolledCount: 18400,
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600',
    skillsGained: ['React', 'Node.js', 'Express.js', 'HTML', 'CSS', 'JavaScript'],
    description: 'Build robust web products with React Hooks, Tailwind CSS, Express REST APIs, JWT Authentication, and MongoDB/PostgreSQL backends.',
    modules: [
      { id: 'm1', title: 'Modern JavaScript (ES6+), Async/Await & DOM', completed: false, duration: '3h 00m' },
      { id: 'm2', title: 'React 19 Components, State & Custom Hooks', completed: false, duration: '4h 00m' },
      { id: 'm3', title: 'RESTful API Architecture with Express & Node', completed: false, duration: '3h 30m' },
      { id: 'm4', title: 'Database Integration, ORM & JWT Auth', completed: false, duration: '3h 00m' },
      { id: 'm5', title: 'Full Stack Deployment & Testing', completed: false, duration: '2h 30m' }
    ]
  },
  {
    id: 'crs_05',
    category: 'prog',
    title: 'Java Enterprise, Spring Boot & Microservices',
    instructor: 'Karthik Raman (Senior Architect)',
    level: 'Advanced',
    duration: '15 Hours',
    rating: 4.75,
    enrolledCount: 7600,
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
    skillsGained: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'DSA'],
    description: 'Learn OOP paradigms, multithreading, Spring Boot 3 dependency injection, Hibernate JPA, and building resilient backend services.',
    modules: [
      { id: 'm1', title: 'Core Java, Generics & Collections Framework', completed: false, duration: '3h 00m' },
      { id: 'm2', title: 'Spring Boot Architecture & Dependency Injection', completed: false, duration: '3h 30m' },
      { id: 'm3', title: 'Spring Data JPA, Hibernate & MySQL Transactions', completed: false, duration: '3h 00m' },
      { id: 'm4', title: 'Building Secure RESTful Endpoints with Spring Security', completed: false, duration: '3h 00m' },
      { id: 'm5', title: 'Microservices Communication & Kafka Streaming', completed: false, duration: '2h 30m' }
    ]
  },
  {
    id: 'crs_06',
    category: 'aiml',
    title: 'Generative AI & LLM Application Engineering',
    instructor: 'Dr. Sophia Vance (AI Research Scientist)',
    level: 'Advanced',
    duration: '11 Hours',
    rating: 4.95,
    enrolledCount: 16100,
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
    skillsGained: ['Generative AI', 'NLP', 'Deep Learning', 'Python', 'Vector DBs'],
    description: 'Build production RAG pipelines, fine-tune open-source LLMs, work with LangChain, LlamaIndex, and implement autonomous multi-agent workflows.',
    modules: [
      { id: 'm1', title: 'Transformer Architectures & Attention Mechanisms', completed: false, duration: '2h 15m' },
      { id: 'm2', title: 'Prompt Engineering & Structured Outputs', completed: false, duration: '2h 00m' },
      { id: 'm3', title: 'Retrieval Augmented Generation (RAG) & Vector Stores', completed: false, duration: '2h 45m' },
      { id: 'm4', title: 'Agentic AI Workflows & Tool Calling', completed: false, duration: '2h 30m' },
      { id: 'm5', title: 'LLM Evaluation, Guardrails & Production Deployment', completed: false, duration: '1h 30m' }
    ]
  }
];

export const INITIAL_ASSIGNMENTS = [
  {
    id: 'asg_01',
    domain: 'AI & Data Science',
    targetStudent: 'AI & Data Science Student',
    title: 'Customer Churn Prediction with Scikit-Learn & Pandas',
    difficulty: 'Intermediate',
    deadline: '7 Days',
    skills: ['Python', 'Pandas', 'Scikit-learn', 'Machine Learning', 'Data Visualization'],
    problemStatement: 'Analyze a dataset of 10,000 telecom subscribers. Perform exploratory data analysis, engineer engagement features, handle class imbalances, train Random Forest and XGBoost classifiers, and achieve an ROC-AUC score > 0.85.',
    starterCode: `# StepUp AI & Data Science Assessment
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

def train_churn_model():
    print("Step 1: Loading customer dataset (10,000 records)...")
    X_train, X_test, y_train, y_test = train_test_split(
        np.random.randn(1000, 10), 
        np.random.randint(0, 2, 1000), 
        test_size=0.2, 
        random_state=42
    )
    print("Step 2: Training Random Forest Classifier...")
    model = RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42)
    model.fit(X_train, y_train)
    print("Step 3: Calculating ROC-AUC & Confusion Matrix...")
    probs = model.predict_proba(X_test)[:, 1]
    auc = roc_auc_score(y_test, probs)
    print(f"Model Training Complete! Validated ROC-AUC: {auc:.4f}")
    return model, auc

if __name__ == '__main__':
    train_churn_model()
`,
    sampleResults: {
      score: 87,
      breakdown: [
        { subject: 'Python Code Quality', score: 90 },
        { subject: 'Problem Solving & ML Rigor', score: 85 },
        { subject: 'Data Preprocessing & SQL', score: 88 },
        { subject: 'Model Validation & Metrics', score: 85 }
      ],
      stars: 4,
      badge: 'Certified ML Practitioner Level 4'
    }
  },
  {
    id: 'asg_02',
    domain: 'Computer Science',
    targetStudent: 'Computer Science Student',
    title: 'High-Throughput REST API with Rate Limiting & Auth',
    difficulty: 'Intermediate',
    deadline: '5 Days',
    skills: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'JWT'],
    problemStatement: 'Develop a scalable Spring Boot RESTful API service supporting user registration, JWT token generation, role-based endpoints, database pagination, and a Token Bucket rate-limiter allowing max 100 requests/minute.',
    starterCode: `// StepUp Computer Science Assessment: Java Spring Boot REST API
package com.stepup.assessment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@SpringBootApplication
@RestController
@RequestMapping("/api/v1/users")
public class UserApiController {

    @GetMapping
    public ResponseEntity<List<String>> getAllUsers() {
        return ResponseEntity.ok(Arrays.asList("Alice", "Bob", "Charlie", "Pavs"));
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody Map<String, String> payload) {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "User registered successfully with encrypted credentials");
        return ResponseEntity.ok(response);
    }

    public static void main(String[] args) {
        SpringApplication.run(UserApiController.class, args);
    }
}
`,
    sampleResults: {
      score: 92,
      breakdown: [
        { subject: 'Java & Spring Architecture', score: 94 },
        { subject: 'REST Endpoint Standards', score: 90 },
        { subject: 'Database Performance', score: 92 },
        { subject: 'Security & Auth', score: 92 }
      ],
      stars: 5,
      badge: 'Certified Backend Engineer Level 5'
    }
  },
  {
    id: 'asg_03',
    domain: 'Web Development',
    targetStudent: 'Web Development Student',
    title: 'E-Commerce Storefront with Realtime Cart & Checkout',
    difficulty: 'Intermediate',
    deadline: '6 Days',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    problemStatement: 'Build a responsive multi-page e-commerce storefront with category filtering, optimistic cart state management, checkout validation, and simulated payment gateway integration.',
    starterCode: `// StepUp Web Development Assessment
import React, { useState } from 'react';

export default function Storefront() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Noise Canceling Headphones', price: 199, rating: 4.8 },
    { id: 2, name: 'Mechanical RGB Keyboard', price: 129, rating: 4.9 },
    { id: 3, name: 'Ultra-wide 4K Monitor', price: 449, rating: 4.7 }
  ]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <div className="store-container p-6 bg-white rounded-xl">
      <h1 className="text-2xl font-bold mb-4">StepUp Storefront</h1>
      <p className="text-sm text-gray-500 mb-4">Cart items count: {cart.length}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="p-4 border rounded-xl shadow-sm">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-blue-600 font-bold">${'${p.price}'}</p>
            <button 
              onClick={() => addToCart(p)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    sampleResults: {
      score: 89,
      breakdown: [
        { subject: 'React Component Design', score: 92 },
        { subject: 'UI/UX & CSS Styling', score: 88 },
        { subject: 'State & Async Logic', score: 86 },
        { subject: 'Code Cleanliness', score: 90 }
      ],
      stars: 4,
      badge: 'Certified Frontend Developer Level 4'
    }
  },
  {
    id: 'asg_04',
    domain: 'Cloud & DevOps',
    targetStudent: 'Cloud & DevOps Student',
    title: 'Dockerize & Deploy Microservice to AWS with CI/CD',
    difficulty: 'Advanced',
    deadline: '5 Days',
    skills: ['Docker', 'AWS', 'Kubernetes', 'CI/CD', 'Linux'],
    problemStatement: 'Write a multi-stage Dockerfile for a Node.js microservice, write Kubernetes deployment and service YAML manifests with readiness/liveness probes, and create a GitHub Actions workflow that automatically builds and deploys images to AWS ECR.',
    starterCode: `# StepUp DevOps Assessment: Dockerfile & Pipeline
# Stage 1: Build & Dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Minimal Distroless / Alpine Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 8080
USER node
CMD ["node", "server.js"]
`,
    sampleResults: {
      score: 94,
      breakdown: [
        { subject: 'Container Security & Size', score: 96 },
        { subject: 'Kubernetes Manifest Rigor', score: 92 },
        { subject: 'CI/CD Automation', score: 95 },
        { subject: 'Cloud Best Practices', score: 93 }
      ],
      stars: 5,
      badge: 'Certified Cloud DevOps Pro Level 5'
    }
  }
];

export const SAMPLE_RESUMES = {
  aids: {
    name: 'Pavs — AI & Data Science Candidate',
    targetRole: 'Data Analyst & ML Engineer',
    rawText: `PAVS
B.Tech — Artificial Intelligence & Data Science | PSG College of Technology
Email: pavs.aids@psgtech.edu | Phone: +91 98765 43210 | CGPA: 8.8
GitHub: github.com/pavs-tech | LinkedIn: linkedin.com/in/pavs-aids

SUMMARY:
Motivated AI & Data Science undergraduate with hands-on experience in building automated statistical pipelines, predictive machine learning models, and executive Power BI dashboards. Adept at SQL database queries, Python analytics, and deep learning architectures.

TECHNICAL SKILLS:
- Languages: Python, SQL, Java, C++, JavaScript
- Data Analytics & BI: Power BI, Excel, Pandas, NumPy, Data Visualization, EDA
- AI & Machine Learning: Scikit-learn, Machine Learning, Deep Learning, NLP, Data Analytics
- Web & Tools: HTML, CSS, Git, GitHub, Jupyter Notebooks

PROJECTS:
1. Customer Churn Prediction Engine: Analyzed 10k+ customer transactions using Pandas & Scikit-learn; built XGBoost model with 89% accuracy and deployed Power BI tracking dashboard.
2. Generative AI Agricultural Crop Diagnostic: Developed image-based CNN and LLM chatbot to identify plant anomalies in real-time during 2026 Hackathon (2nd place winner).
3. E-Commerce Sales Performance Dashboard: Created end-to-end SQL analytical data warehouse and interactive Power BI report with dynamic DAX metrics.

EDUCATION & ACHIEVEMENTS:
- B.Tech in Artificial Intelligence & Data Science (2022–2026), CGPA: 8.8 / 10.0
- 2nd Place in Microsoft National AI Hackathon 2026
- HackerRank 5-Star Problem Solving Gold Badge`,
    detectedSkills: ['Python', 'SQL', 'Power BI', 'Machine Learning', 'Data Visualization', 'Pandas', 'NumPy', 'Scikit-learn', 'Deep Learning', 'NLP', 'Data Analytics', 'HTML', 'CSS', 'JavaScript'],
    missingSkills: ['AWS', 'Docker', 'React', 'Kubernetes', 'CI/CD'],
    targetProfile: 'Data Analyst / ML Engineer',
    matchedCompanies: [
      { name: 'Microsoft', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg', match: 92, reason: 'Strong alignment with Python, SQL, Power BI, and predictive modeling requirements.' },
      { name: 'Deloitte', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg', match: 89, reason: 'Matches Data Analytics, SQL, and Power BI enterprise advisory profile.' },
      { name: 'Accenture', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg', match: 87, reason: 'Exceeds analytical baseline; missing cloud deployment capabilities.' },
      { name: 'TCS', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg', match: 84, reason: 'High CGPA & core programming skills match Digital stream.' },
      { name: 'Infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg', match: 81, reason: 'Strong ML baseline; needs AWS/Docker cloud containers.' }
    ]
  },
  webdev: {
    name: 'Rahul Sharma — Full Stack Developer',
    targetRole: 'Full Stack / Frontend Engineer',
    rawText: `RAHUL SHARMA
B.Tech — Computer Science & Engineering | VIT Vellore
Email: rahul.s@vit.ac.in | Phone: +91 91234 56789 | CGPA: 8.4
GitHub: github.com/rahul-dev | LinkedIn: linkedin.com/in/rahul-s

TECHNICAL SKILLS:
- Frontend: HTML, CSS, JavaScript, React, Tailwind CSS, Redux
- Backend: Node.js, Express.js, REST API, MongoDB, MySQL
- Programming: JavaScript, Python, C++, Java
- Tools: Git, GitHub, Postman, Linux

PROJECTS:
1. Realtime Collaborative Canvas: Built with React, WebSockets, Node.js and Redis.
2. SaaS Subscription Management Portal: Full-stack React + Express + Stripe integration.`,
    detectedSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MySQL', 'Python', 'Java', 'C++'],
    missingSkills: ['Kubernetes', 'AWS', 'Docker', 'GraphQL', 'CI/CD'],
    targetProfile: 'Full Stack Web Developer',
    matchedCompanies: [
      { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png', match: 94, reason: 'Excellent match for React, JavaScript DOM vitals, and scalable REST services.' },
      { name: 'Accenture', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg', match: 91, reason: 'Matches modern application engineering analyst tech stack.' },
      { name: 'Google', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', match: 88, reason: 'Strong programming foundations; matches frontend/SDE intern.' },
      { name: 'TCS', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg', match: 85, reason: 'Strong JavaScript and backend capabilities.' },
      { name: 'Deloitte', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg', match: 82, reason: 'Good full-stack development foundations.' }
    ]
  },
  cloud: {
    name: 'Priya Menon — Cloud & DevOps Specialist',
    targetRole: 'Cloud Architect & DevOps Engineer',
    rawText: `PRIYA MENON
B.Tech — Information Technology | NIT Trichy
Email: priya.menon@nitt.edu | Phone: +91 97890 12345 | CGPA: 8.9

TECHNICAL SKILLS:
- Cloud & Infrastructure: AWS, Azure, Docker, Kubernetes, Linux, Terraform
- CI/CD & Scripting: GitHub Actions, Jenkins, Bash, Python, YAML
- Databases & Networking: MySQL, PostgreSQL, Redis, VPC, Route 53`,
    detectedSkills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Python', 'MySQL'],
    missingSkills: ['React', 'Power BI', 'Machine Learning', 'Deep Learning'],
    targetProfile: 'Cloud & DevOps Engineer',
    matchedCompanies: [
      { name: 'Infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg', match: 93, reason: 'Matches high-demand Power Programmer Cloud & Container stream.' },
      { name: 'Amazon', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', match: 90, reason: 'High alignment with AWS infrastructure & Linux systems.' },
      { name: 'Microsoft', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg', match: 88, reason: 'Matches Azure cloud engineering associate criteria.' },
      { name: 'TCS', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg', match: 86, reason: 'Strong DevOps & container orchestration profile.' },
      { name: 'Deloitte', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg', match: 83, reason: 'Cloud advisory and infrastructure modernization readiness.' }
    ]
  }
};

export const RECRUITER_CANDIDATES = [
  {
    id: 'cand_001',
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    email: 'rahul.s@vit.ac.in',
    phone: '+91 91234 56789',
    college: 'VIT Vellore',
    degree: 'B.Tech CSE',
    batch: 2026,
    cgpa: 8.4,
    skills: ['Python', 'SQL', 'React', 'Node.js', 'DSA'],
    matchScore: 94,
    appliedJob: 'Software Engineer Intern',
    status: 'Shortlisted',
    assessmentScore: 92,
    resumeSnippet: 'Built real-time collaborative workspace with React, Node.js, and Redis caching. 5-star HackerRank in Python.'
  },
  {
    id: 'cand_002',
    name: 'Priya Menon',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    email: 'priya.menon@nitt.edu',
    phone: '+91 97890 12345',
    college: 'NIT Trichy',
    degree: 'B.Tech IT',
    batch: 2026,
    cgpa: 8.9,
    skills: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'AWS'],
    matchScore: 91,
    appliedJob: 'Software Engineer Intern',
    status: 'Interview',
    assessmentScore: 95,
    resumeSnippet: 'Architected high-throughput microservices using Spring Boot and Docker. Deployed on AWS ECS.'
  },
  {
    id: 'cand_003',
    name: 'Arun Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    email: 'arun.k@iitm.ac.in',
    phone: '+91 98765 11223',
    college: 'IIT Madras',
    degree: 'B.Tech ECE',
    batch: 2027,
    cgpa: 8.2,
    skills: ['React', 'Node.js', 'JavaScript', 'CSS', 'HTML'],
    matchScore: 88,
    appliedJob: 'Frontend Engineer — Core Web',
    status: 'Assessment',
    assessmentScore: 88,
    resumeSnippet: 'Built responsive web storefronts and optimized Core Web Vitals achieving 98+ Lighthouse scores.'
  },
  {
    id: 'cand_004',
    name: 'Kavya Reddy',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    email: 'kavya.r@nitw.ac.in',
    phone: '+91 98765 43210',
    college: 'NIT Warangal',
    degree: 'B.Tech Data Science',
    batch: 2026,
    cgpa: 8.8,
    skills: ['Python', 'SQL', 'Power BI', 'Machine Learning', 'Pandas'],
    matchScore: 96,
    appliedJob: 'Data Analyst — University Graduate',
    status: 'Interview',
    assessmentScore: 96,
    resumeSnippet: 'Winner of National Data Analytics Hackathon. Published ML researcher on edge inference.'
  },
  {
    id: 'cand_005',
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    email: 'sneha.p@bitts.edu',
    phone: '+91 94455 66778',
    college: 'BITS Pilani',
    degree: 'B.E Computer Science',
    batch: 2026,
    cgpa: 9.1,
    skills: ['Python', 'PyTorch', 'Deep Learning', 'NLP', 'DSA'],
    matchScore: 93,
    appliedJob: 'Applied Scientist Intern',
    status: 'Selected 🎉',
    assessmentScore: 98,
    resumeSnippet: 'Published transformer research on low-resource language translation in ACL workshop.'
  }
];

export const RECRUITER_STATS = {
  activeJobs: 12,
  applications: 486,
  shortlisted: 54,
  interviews: 21,
  selected: 8
};
