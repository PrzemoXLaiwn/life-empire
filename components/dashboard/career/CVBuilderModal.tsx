'use client';

/**
 * CV Builder Modal - Create and Edit Resume
 * 
 * Features:
 * - Edit skills and experience (can lie!)
 * - Suspicion meter (0-100%)
 * - Real vs Claimed stats comparison
 * - Submit application
 */

import { useState, useEffect } from 'react';
import { 
  X, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Briefcase,
  GraduationCap,
  Award,
  Users
} from 'lucide-react';
import type { Job } from '@prisma/client';

interface CVBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
  character: any;
  onSubmit: (cvData: CVData, suspicionLevel: number) => void;
}

export interface CVData {
  // Personal (auto-filled)
  name: string;
  age: number;
  city: string;
  
  // Education (auto-filled, can add fake)
  education: string;
  major?: string;
  gpa?: number;
  
  // Experience (can lie!)
  claimedYearsExperience: number;
  realYearsExperience: number;
  
  // Skills (can exaggerate!)
  claimedSkills: Record<string, number>;
  realSkills: Record<string, number>;
  
  // References
  hasReferences: boolean;
  referenceCount: number;
}

const EDUCATION_LABELS: Record<string, string> = {
  NONE: 'None',
  ELEMENTARY: 'Elementary School',
  HIGH_SCHOOL: 'High School Diploma',
  UNIVERSITY: 'University Degree',
  GRADUATE: 'Graduate Degree',
  TRADE_SCHOOL: 'Trade School Certificate',
};

export default function CVBuilderModal({
  isOpen,
  onClose,
  job,
  character,
  onSubmit,
}: CVBuilderModalProps) {
  const [claimedExperience, setClaimedExperience] = useState(0);
  const [claimedSkills, setClaimedSkills] = useState<Record<string, number>>({});
  const [suspicionLevel, setSuspicionLevel] = useState(0);

  const requiredSkills = job.requiredSkills as Record<string, number> || {};
  const realExperience = character.yearsInJob || 0;

  useEffect(() => {
    if (isOpen) {
      // Initialize with real values
      setClaimedExperience(realExperience);
      
      const initialSkills: Record<string, number> = {};
      Object.keys(requiredSkills).forEach(skill => {
        initialSkills[skill] = (character as any)[skill] || 0;
      });
      setClaimedSkills(initialSkills);
      
      calculateSuspicion(realExperience, initialSkills);
    }
  }, [isOpen, character, job]);

  const calculateSuspicion = (experience: number, skills: Record<string, number>) => {
    let suspicion = 0;

    // Experience lying
    const experienceLie = experience - realExperience;
    if (experienceLie > 0) {
      suspicion += experienceLie * 10; // +10% per year lied
    }

    // Skills lying
    Object.keys(skills).forEach(skill => {
      const realSkill = (character as any)[skill] || 0;
      const claimedSkill = skills[skill];
      const skillLie = claimedSkill - realSkill;
      
      if (skillLie > 0) {
        suspicion += Math.floor(skillLie / 10) * 5; // +5% per 10 points lied
      }
    });

    setSuspicionLevel(Math.min(100, Math.max(0, suspicion)));
  };

  const handleExperienceChange = (years: number) => {
    setClaimedExperience(years);
    calculateSuspicion(years, claimedSkills);
  };

  const handleSkillChange = (skill: string, value: number) => {
    const newSkills = { ...claimedSkills, [skill]: value };
    setClaimedSkills(newSkills);
    calculateSuspicion(claimedExperience, newSkills);
  };

  const handleSubmit = () => {
    const cvData: CVData = {
      name: character.username,
      age: 25, // TODO: Add age to character
      city: character.city?.name || 'Unknown',
      education: EDUCATION_LABELS[character.educationLevel] || 'None',
      major: character.major,
      gpa: character.universityGPA,
      claimedYearsExperience: claimedExperience,
      realYearsExperience: realExperience,
      claimedSkills,
      realSkills: Object.keys(requiredSkills).reduce((acc, skill) => {
        acc[skill] = (character as any)[skill] || 0;
        return acc;
      }, {} as Record<string, number>),
      hasReferences: character.yearsInJob > 0,
      referenceCount: Math.floor(character.yearsInJob),
    };

    onSubmit(cvData, suspicionLevel);
  };

  const getSuspicionColor = () => {
    if (suspicionLevel <= 20) return 'text-[#5cb85c]';
    if (suspicionLevel <= 40) return 'text-[#f0ad4e]';
    if (suspicionLevel <= 60) return 'text-[#ff9800]';
    if (suspicionLevel <= 80) return 'text-[#ff5722]';
    return 'text-[#d9534f]';
  };

  const getSuspicionLabel = () => {
    if (suspicionLevel <= 20) return 'Low Risk';
    if (suspicionLevel <= 40) return 'Medium Risk';
    if (suspicionLevel <= 60) return 'High Risk';
    if (suspicionLevel <= 80) return 'Very High Risk';
    return 'Extreme Risk';
  };

  const getReviewChance = () => {
    // Paradox: Higher suspicion = better looking CV = higher review chance
    return Math.min(95, 50 + suspicionLevel * 0.5);
  };

  const getInterviewDifficulty = () => {
    if (suspicionLevel <= 20) return 'Easy';
    if (suspicionLevel <= 40) return 'Medium';
    if (suspicionLevel <= 60) return 'Hard';
    if (suspicionLevel <= 80) return 'Very Hard';
    return 'Extreme';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0a0a] border-2 border-[#333] max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border-b border-[#333] p-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#fff] flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-[#5cb85c]" />
              📄 YOUR RESUME / CV
            </h2>
            <p className="text-sm text-[#888] mt-1">
              Applying for: <span className="text-[#fff] font-bold">{job.title}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#333] transition-colors"
          >
            <X className="w-5 h-5 text-[#888]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Personal Info */}
          <div className="bg-[#0f0f0f] border border-[#333] p-4">
            <h3 className="text-sm font-bold text-[#fff] mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#5cb85c]" />
              👤 PERSONAL INFO (Auto-filled)
            </h3>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-[#888] text-xs mb-1">Name:</div>
                <div className="text-[#fff] font-bold">{character.username}</div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-1">Age:</div>
                <div className="text-[#fff] font-bold">25 years old</div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-1">City:</div>
                <div className="text-[#fff] font-bold">{character.city?.name || 'Los Angeles'}</div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-[#0f0f0f] border border-[#333] p-4">
            <h3 className="text-sm font-bold text-[#fff] mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#5cb85c]" />
              🎓 EDUCATION
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#888]">Highest Level:</span>
                <span className="text-[#fff] font-bold">
                  {EDUCATION_LABELS[character.educationLevel] || 'None'}
                </span>
              </div>
              {character.major && (
                <div className="flex items-center justify-between">
                  <span className="text-[#888]">Major:</span>
                  <span className="text-[#fff] font-bold">{character.major}</span>
                </div>
              )}
              {character.universityGPA > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-[#888]">GPA:</span>
                  <span className="text-[#fff] font-bold">{character.universityGPA.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-[#0f0f0f] border border-[#333] p-4">
            <h3 className="text-sm font-bold text-[#fff] mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#5cb85c]" />
              💼 WORK EXPERIENCE
            </h3>
            
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-[#888]">Real Experience:</span>
                <span className="text-[#5cb85c] font-bold">{realExperience.toFixed(1)} years</span>
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs text-[#888]">
                  Claim Experience: 
                  {claimedExperience > realExperience && (
                    <span className="text-[#d9534f] ml-2">
                      ⚠️ Lying adds +{((claimedExperience - realExperience) * 10).toFixed(0)}% suspicion
                    </span>
                  )}
                </label>
                <select
                  value={claimedExperience}
                  onChange={(e) => handleExperienceChange(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#fff] text-sm focus:border-[#5cb85c] focus:outline-none"
                >
                  <option value={realExperience}>{realExperience.toFixed(1)} years (Honest)</option>
                  <option value={1}>1 year</option>
                  <option value={2}>2 years</option>
                  <option value={3}>3 years</option>
                  <option value={5}>5 years</option>
                  <option value={10}>10 years</option>
                  <option value={15}>15 years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-[#0f0f0f] border border-[#333] p-4">
            <h3 className="text-sm font-bold text-[#fff] mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#5cb85c]" />
              🎯 SKILLS (Can exaggerate!)
            </h3>
            
            <div className="space-y-3">
              {Object.entries(requiredSkills).map(([skill, required]) => {
                const realSkill = (character as any)[skill] || 0;
                const claimedSkill = claimedSkills[skill] || realSkill;
                const isLying = claimedSkill > realSkill;

                return (
                  <div key={skill} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#888] capitalize">{skill}:</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[#5cb85c] text-xs">Real: {realSkill}</span>
                        <span className="text-[#888]">→</span>
                        <span className={`text-xs ${isLying ? 'text-[#d9534f]' : 'text-[#fff]'}`}>
                          Claim: {claimedSkill}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <select
                        value={claimedSkill}
                        onChange={(e) => handleSkillChange(skill, parseInt(e.target.value))}
                        className="flex-1 px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#fff] text-sm focus:border-[#5cb85c] focus:outline-none"
                      >
                        <option value={realSkill}>{realSkill} (Honest)</option>
                        {[...Array(10)].map((_, i) => {
                          const value = Math.min(100, realSkill + (i + 1) * 10);
                          if (value <= realSkill) return null;
                          return (
                            <option key={value} value={value}>
                              {value} {value > realSkill && `(+${value - realSkill})`}
                            </option>
                          );
                        })}
                      </select>
                      
                      {isLying && (
                        <span className="text-xs text-[#d9534f] whitespace-nowrap">
                          +{Math.floor((claimedSkill - realSkill) / 10) * 5}% suspicion
                        </span>
                      )}
                    </div>

                    {/* Progress bar showing real vs claimed */}
                    <div className="relative h-2 bg-[#1a1a1a]">
                      <div 
                        className="absolute h-full bg-[#5cb85c]" 
                        style={{ width: `${realSkill}%` }}
                      />
                      {isLying && (
                        <div 
                          className="absolute h-full bg-[#d9534f] opacity-50" 
                          style={{ width: `${claimedSkill}%` }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Suspicion Meter */}
          <div className="bg-[#1a1a1a] border-2 border-[#f0ad4e] p-4">
            <h3 className="text-sm font-bold text-[#fff] mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#f0ad4e]" />
              📊 SUSPICION METER
            </h3>
            
            <div className="space-y-3">
              {/* Suspicion Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#888]">Suspicion Level:</span>
                  <span className={`text-lg font-bold ${getSuspicionColor()}`}>
                    {suspicionLevel}% - {getSuspicionLabel()}
                  </span>
                </div>
                <div className="w-full bg-[#0a0a0a] h-4 border border-[#333]">
                  <div 
                    className={`h-full transition-all ${
                      suspicionLevel <= 20 ? 'bg-[#5cb85c]' :
                      suspicionLevel <= 40 ? 'bg-[#f0ad4e]' :
                      suspicionLevel <= 60 ? 'bg-[#ff9800]' :
                      suspicionLevel <= 80 ? 'bg-[#ff5722]' :
                      'bg-[#d9534f]'
                    }`}
                    style={{ width: `${suspicionLevel}%` }}
                  />
                </div>
              </div>

              {/* Effects */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#0a0a0a] border border-[#333]">
                  <div className="text-[#888] mb-1">Interview Difficulty:</div>
                  <div className={`font-bold ${getSuspicionColor()}`}>
                    {getInterviewDifficulty()}
                  </div>
                </div>
                <div className="p-3 bg-[#0a0a0a] border border-[#333]">
                  <div className="text-[#888] mb-1">CV Review Chance:</div>
                  <div className="font-bold text-[#5cb85c]">
                    {getReviewChance().toFixed(0)}%
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="p-3 bg-[#d9534f]/10 border border-[#d9534f] text-xs">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#d9534f] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#d9534f] font-bold mb-1">⚠️ Higher suspicion = Harder interview</div>
                    <div className="text-[#888]">
                      But also = Higher chance your CV gets reviewed!
                    </div>
                  </div>
                </div>
              </div>

              {/* Probation Warning */}
              {suspicionLevel > 20 && (
                <div className="p-3 bg-[#f0ad4e]/10 border border-[#f0ad4e] text-xs">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#f0ad4e] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[#f0ad4e] font-bold mb-1">
                        ⚠️ If hired, you'll be on PROBATION
                      </div>
                      <div className="text-[#888]">
                        {suspicionLevel <= 40 && '15 days, 70%+ performance required'}
                        {suspicionLevel > 40 && suspicionLevel <= 60 && '30 days, 75%+ performance required'}
                        {suspicionLevel > 60 && '45 days, 80%+ performance required'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-[#333] hover:bg-[#444] text-[#fff] font-bold transition-colors"
            >
              ❌ Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-[#5cb85c] hover:bg-[#4a9d4a] text-[#000] font-bold transition-colors"
            >
              📤 Submit Application
            </button>
          </div>

          {/* Tips */}
          <div className="text-xs text-[#666] space-y-1">
            <div>💡 Tip: Higher suspicion makes interview harder, but CV looks better!</div>
            <div>💡 Tip: If you lie and get caught, you'll be on probation period</div>
            <div>💡 Tip: Being honest is safer but may not get you the job</div>
          </div>
        </div>
      </div>
    </div>
  );
}
