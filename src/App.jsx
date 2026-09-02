import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import GlobalSearchModal from './components/common/GlobalSearchModal';
import AuthModal from './components/auth/AuthModal';
import GoogleVerificationModal from './components/auth/GoogleVerificationModal';
import CandidateDetailsSetupModal from './components/auth/CandidateDetailsSetupModal';
import ToastContainer from './components/common/ToastContainer';

import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import LearningPage from './pages/LearningPage';
import InDemandPage from './pages/InDemandPage';
import AssignmentsPage from './pages/AssignmentsPage';
import ProfilePage from './pages/ProfilePage';
import CompanyDashboardPage from './pages/CompanyDashboardPage';
import CandidateDashboardPage from './pages/CandidateDashboardPage';

import { Sparkles, LayoutDashboard } from 'lucide-react';

function MainLayout() {
  const { activeTab, setActiveTab, currentRole } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#101936] font-sans antialiased selection:bg-[#7B3FF2]/20 selection:text-[#2563FF]">
      {/* 1. Permanent Left Sidebar (Home, Jobs, Learning, In-Demand, etc. on Left Side) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 2. Main Page Container with Left Padding */}
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all">
        {/* Top Navbar Header */}
        <Navbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        {/* Floating Placement Banner */}
        <div className="bg-gradient-to-r from-blue-900/90 to-purple-900/90 text-white text-xs py-2 px-4 border-b border-white/10 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-200">
                Campus Placement Season 2026 Live: 1,200+ Company Openings Active
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-[#0C1435]'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Candidate Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab('indemand')}
                className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Resume Scanner</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Dynamic View Content */}
        <main className="flex-1">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'jobs' && <JobsPage />}
          {activeTab === 'learning' && <LearningPage />}
          {activeTab === 'indemand' && <InDemandPage />}
          {activeTab === 'assignments' && <AssignmentsPage />}
          {activeTab === 'profile' && <ProfilePage />}
          {activeTab === 'company' && <CompanyDashboardPage />}
          {activeTab === 'dashboard' && <CandidateDashboardPage />}
        </main>

        {/* Global Modals & Toast Alerts */}
        <GlobalSearchModal />
        <AuthModal />
        <GoogleVerificationModal />
        <CandidateDetailsSetupModal />
        <ToastContainer />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
