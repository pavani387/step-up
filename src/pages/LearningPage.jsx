import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LEARNING_CATEGORIES } from '../data/mockData';
import {
  BookOpen,
  Code2,
  Globe,
  Database,
  Brain,
  Cloud,
  CheckCircle2,
  Circle,
  PlayCircle,
  Award,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  Clock,
  ChevronRight,
  X,
  FileCode2,
  Check
} from 'lucide-react';

export default function LearningPage() {
  const { courses, toggleCourseModule, triggerCelebration, showToast, setActiveTab } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCourseForLearn, setSelectedCourseForLearn] = useState(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const categoryIcons = {
    prog: Code2,
    web: Globe,
    data: Database,
    aiml: Brain,
    cloud: Cloud
  };

  const filteredCourses =
    activeCategory === 'all'
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  const handleLessonOpen = (course) => {
    setSelectedCourseForLearn(course);
    setActiveLessonIndex(0);
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0C1435] via-[#1A1245] to-[#7B3FF2] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-bold">
            📚 In-Demand Tech Skill Roadmaps
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Learn What Tech Companies Are Hiring For
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed">
            Bridge your resume skill gaps with interactive courses across AI & ML, Cloud & DevOps, Data Analytics, Full Stack Web, and Core Programming.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('indemand')}
          className="px-6 py-3 rounded-2xl bg-white text-[#7B3FF2] text-xs font-extrabold shadow-lg hover:bg-purple-50 transition-all flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Scan Resume For Skill Gaps</span>
        </button>
      </div>

      {/* 5 Categories Navigation Bar */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#64708A] block">
          Filter By Technology Track
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-[#0C1435] text-white shadow-md'
                : 'bg-white text-[#64708A] hover:bg-slate-100 border border-[#E6E9F0]'
            }`}
          >
            All Tracks ({courses.length})
          </button>

          {LEARNING_CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.id] || BookOpen;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#7B3FF2] text-white shadow-md shadow-purple-500/25'
                    : 'bg-white text-[#64708A] hover:bg-slate-100 border border-[#E6E9F0]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories Detailed Cards */}
      {activeCategory === 'all' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {LEARNING_CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.id] || BookOpen;
            return (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="p-4 rounded-2xl bg-white border border-[#E6E9F0] hover:border-[#7B3FF2] shadow-2xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7B3FF2] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#101936] group-hover:text-[#7B3FF2] transition-colors">
                  {cat.name}
                </h4>
                <div className="flex flex-wrap gap-1 mt-2">
                  {cat.skills.slice(0, 3).map((sk, idx) => (
                    <span key={idx} className="text-[10px] text-[#64708A] bg-slate-100 px-1.5 py-0.5 rounded">
                      {sk}
                    </span>
                  ))}
                  {cat.skills.length > 3 && (
                    <span className="text-[10px] text-[#7B3FF2] font-semibold">+{cat.skills.length - 3}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          return (
            <div
              key={course.id}
              className="p-6 rounded-3xl bg-white border border-[#E6E9F0] shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0C1435]/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold">
                    {course.level}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-amber-600 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" /> {course.rating}
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-[#101936] mb-1.5 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-[#64708A] line-clamp-2 leading-relaxed mb-4">
                  {course.description}
                </p>

                {/* Progress Visual matching user specification */}
                <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E6E9F0] mb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-extrabold text-[#101936]">
                    <span>Progress:</span>
                    <span className="text-[#2563FF]">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>

                  {/* Modules Checklist Preview */}
                  <div className="pt-2 space-y-1.5">
                    {course.modules.slice(0, 4).map((mod) => (
                      <div
                        key={mod.id}
                        onClick={() => toggleCourseModule(course.id, mod.id)}
                        className="flex items-center justify-between text-xs text-[#101936] cursor-pointer hover:text-[#2563FF] transition-colors"
                      >
                        <div className="flex items-center gap-2 truncate">
                          {mod.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                          )}
                          <span className={`truncate ${mod.completed ? 'line-through text-slate-400' : ''}`}>
                            {mod.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#64708A] shrink-0">{mod.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills gained */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.skillsGained.map((sk, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-[#7B3FF2]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6E9F0] flex items-center justify-between">
                <span className="text-xs text-[#64708A]">{course.duration} total</span>
                <button
                  onClick={() => handleLessonOpen(course)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold hover:opacity-95 shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>{course.progress > 0 ? 'Continue Learning' : 'Start Course'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE COURSE PLAYER MODAL */}
      {selectedCourseForLearn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C1435]/75 backdrop-blur-md animate-in fade-in">
          <div
            className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E6E9F0] overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#0C1435] to-[#1F295C] text-white flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-blue-300 font-bold mb-1">
                  <span>{selectedCourseForLearn.level}</span> • <span>{selectedCourseForLearn.duration}</span>
                </div>
                <h3 className="text-xl font-black">{selectedCourseForLearn.title}</h3>
                <p className="text-xs text-slate-300 mt-0.5">Instructor: {selectedCourseForLearn.instructor}</p>
              </div>
              <button
                onClick={() => setSelectedCourseForLearn(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - 2 Columns */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden">
              {/* Left Column: Modules list */}
              <div className="md:col-span-1 border-r border-[#E6E9F0] bg-[#F7F8FC] p-4 overflow-y-auto space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#101936]">
                  <span>Syllabus Modules</span>
                  <span className="text-[#2563FF]">{selectedCourseForLearn.progress}% Done</span>
                </div>

                <div className="space-y-2">
                  {selectedCourseForLearn.modules.map((m, idx) => {
                    const isSelected = activeLessonIndex === idx;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setActiveLessonIndex(idx)}
                        className={`p-3 rounded-2xl border text-xs font-medium cursor-pointer transition-all flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'bg-white border-[#2563FF] shadow-xs text-[#2563FF]'
                            : 'bg-white/60 border-[#E6E9F0] text-[#101936] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCourseModule(selectedCourseForLearn.id, m.id);
                            }}
                            className="mt-0.5"
                          >
                            {m.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300" />
                            )}
                          </button>
                          <div>
                            <div className="font-bold">Module {idx + 1}</div>
                            <div className={`text-[11px] ${m.completed ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                              {m.title}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400">{m.duration}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Interactive Lesson Player */}
              <div className="md:col-span-2 p-6 overflow-y-auto space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7B3FF2]">
                    Current Lesson • Module {activeLessonIndex + 1}
                  </span>
                  <h4 className="text-lg font-black text-[#101936] mt-0.5">
                    {selectedCourseForLearn.modules[activeLessonIndex]?.title}
                  </h4>
                </div>

                {/* Lesson Interactive Content */}
                <div className="p-4 rounded-2xl bg-[#0C1435] text-slate-200 font-mono text-xs space-y-3 shadow-inner">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400">
                    <span className="flex items-center gap-1.5"><FileCode2 className="w-4 h-4 text-[#2563FF]" /> practice_module.py</span>
                    <span className="text-[10px]">Python 3.12 Environment</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] leading-relaxed text-blue-300">
{`# Interactive StepUp Sandbox
import pandas as pd
import numpy as np

# Load telemetry dataset
data = pd.DataFrame({
    'user_id': range(101, 106),
    'skill_level': ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Pro'],
    'assessment_score': [78, 85, 91, 95, 99]
})

print("Dataset Loaded Successfully:")
print(data.describe())`}
                  </pre>
                </div>

                {/* Quick Checkpoint Quiz */}
                <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-3">
                  <h5 className="text-xs font-bold text-[#7B3FF2] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Module Knowledge Checkpoint
                  </h5>
                  <p className="text-xs font-semibold text-[#101936]">
                    Which Pandas function is standard for summarizing central tendency and dispersion of numerical features?
                  </p>
                  <div className="space-y-1.5">
                    {['df.info()', 'df.describe()', 'df.head()', 'df.value_counts()'].map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setQuizAnswer(opt);
                          setQuizSubmitted(true);
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                          quizAnswer === opt
                            ? opt === 'df.describe()'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : 'bg-rose-50 border-rose-300 text-rose-800'
                            : 'bg-white border-purple-100 hover:bg-purple-100/50 text-[#101936]'
                        }`}
                      >
                        {opt} {quizAnswer === opt && opt === 'df.describe()' && '✓ (Correct!)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mark as completed button */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E6E9F0]">
                  <button
                    onClick={() => {
                      toggleCourseModule(
                        selectedCourseForLearn.id,
                        selectedCourseForLearn.modules[activeLessonIndex].id
                      );
                      if (activeLessonIndex < selectedCourseForLearn.modules.length - 1) {
                        setActiveLessonIndex((prev) => prev + 1);
                      }
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#7B3FF2] text-white text-xs font-bold shadow-md hover:opacity-95 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Mark Module Complete & Continue
                  </button>

                  <button
                    onClick={() => setSelectedCourseForLearn(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#64708A] hover:bg-slate-100"
                  >
                    Exit Player
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
