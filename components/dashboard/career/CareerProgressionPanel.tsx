'use client';

/**
 * Career Progression Panel - Career Ladder Visualization
 * 
 * Features:
 * - Current position in career ladder
 * - Next promotion requirements with progress tracking
 * - Full career path visualization (10 levels)
 * - Skills development tracking
 * - Training options
 */

import { 
  TrendingUp, 
  Award, 
  Target, 
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Star,
  Lock,
  Unlock,
  ArrowRight,
  BarChart3,
  GraduationCap
} from 'lucide-react';
import type { Job } from '@prisma/client';

interface CareerProgressionPanelProps {
  currentJob: Job;
  nextJob: Job | null;
  character: any;
  careerLadder: Job[]; // All jobs in this career path
}

export default function CareerProgressionPanel({
  currentJob,
  nextJob,
  character,
  careerLadder,
}: CareerProgressionPanelProps) {
  // Find current position in ladder
  const currentIndex = careerLadder.findIndex(j => j.id === currentJob.id);
  const tierNumber = currentIndex + 1;
  const totalTiers = careerLadder.length;

  // Calculate overall promotion progress
  const timeProgress = Math.min(100, (character.yearsInJob / currentJob.yearsForPromotion) * 100);
  const performanceProgress = Math.min(100, (character.performanceRating / currentJob.minPerformance) * 100);
  
  // Projects completed (placeholder - would need to track this)
  const projectsCompleted = 8;
  const projectsRequired = 15;
  const projectsProgress = Math.min(100, (projectsCompleted / projectsRequired) * 100);

  // Boss approval (based on work relationships - placeholder)
  const bossApproval = 70;
  const bossApprovalRequired = 70;
  const bossProgress = Math.min(100, (bossApproval / bossApprovalRequired) * 100);

  // Overall progress (average of all requirements)
  const overallProgress = Math.floor((timeProgress + performanceProgress + projectsProgress + bossProgress) / 4);

  // Estimate days until promotion
  const daysUntilPromotion = nextJob 
    ? Math.ceil((currentJob.yearsForPromotion - character.yearsInJob) * 365)
    : 0;

  // Calculate salary increase
  const salaryIncrease = nextJob 
    ? Math.floor(((nextJob.annualSalary - currentJob.annualSalary) / currentJob.annualSalary) * 100)
    : 0;

  // Get required skills for next job
  const nextJobSkills = nextJob ? (nextJob.requiredSkills as Record<string, number> || {}) : {};

  return (
    <div className="space-y-4">
      {/* Current Position */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-[#333] p-4">
        <h2 className="text-2xl font-bold text-[#fff] mb-3 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#5cb85c]" />
          CAREER PROGRESSION
        </h2>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#888]">🎯 CURRENT POSITION</span>
            <span className="text-xs text-[#666]">Tier {tierNumber}/{totalTiers}</span>
          </div>
          <h3 className="text-xl font-bold text-[#fff] mb-2">{currentJob.title}</h3>
          <div className="w-full bg-[#0a0a0a] h-3 border border-[#333] rounded-sm overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#5cb85c] to-[#4a9d4a] h-full transition-all duration-500"
              style={{ width: `${(tierNumber / totalTiers) * 100}%` }}
            />
          </div>
          {nextJob && (
            <div className="mt-2 text-xs text-[#888]">
              Progress to <span className="text-[#5cb85c] font-bold">{nextJob.title}</span>: {overallProgress}%
            </div>
          )}
        </div>
      </div>

      {/* Next Promotion Requirements */}
      {nextJob ? (
        <div className="bg-[#0a0a0a] border-2 border-[#f0ad4e] p-4">
          <h3 className="text-lg font-bold text-[#f0ad4e] mb-3 flex items-center gap-2">
            <Award className="w-5 h-5" />
            🔼 NEXT PROMOTION: {nextJob.title.toUpperCase()}
          </h3>

          {/* Requirements Grid */}
          <div className="space-y-3 mb-4">
            {/* Time Requirement */}
            <div className="p-3 bg-[#1a1a1a] border border-[#333] rounded">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {character.yearsInJob >= currentJob.yearsForPromotion ? (
                    <CheckCircle className="w-4 h-4 text-[#5cb85c]" />
                  ) : (
                    <Clock className="w-4 h-4 text-[#f0ad4e]" />
                  )}
                  <span className="text-sm text-[#fff]">Time in Position:</span>
                </div>
                <span className={`text-sm font-bold ${
                  character.yearsInJob >= currentJob.yearsForPromotion ? 'text-[#5cb85c]' : 'text-[#f0ad4e]'
                }`}>
                  {character.yearsInJob.toFixed(1)} / {currentJob.yearsForPromotion} years
                </span>
              </div>
              <div className="w-full bg-[#0a0a0a] h-2 rounded-sm overflow-hidden">
                <div 
                  className="bg-[#f0ad4e] h-full transition-all"
                  style={{ width: `${Math.min(100, timeProgress)}%` }}
                />
              </div>
              <div className="text-xs text-[#666] mt-1">
                {character.yearsInJob >= currentJob.yearsForPromotion 
                  ? '✅ Requirement met!' 
                  : `${daysUntilPromotion} days remaining`
                }
              </div>
            </div>

            {/* Performance Requirement */}
            <div className="p-3 bg-[#1a1a1a] border border-[#333] rounded">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {character.performanceRating >= currentJob.minPerformance ? (
                    <CheckCircle className="w-4 h-4 text-[#5cb85c]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#d9534f]" />
                  )}
                  <span className="text-sm text-[#fff]">Performance Rating:</span>
                </div>
                <span className={`text-sm font-bold ${
                  character.performanceRating >= currentJob.minPerformance ? 'text-[#5cb85c]' : 'text-[#d9534f]'
                }`}>
                  {character.performanceRating} / {currentJob.minPerformance}
                </span>
              </div>
              <div className="w-full bg-[#0a0a0a] h-2 rounded-sm overflow-hidden">
                <div 
                  className={`h-full transition-all ${
                    character.performanceRating >= currentJob.minPerformance ? 'bg-[#5cb85c]' : 'bg-[#d9534f]'
                  }`}
                  style={{ width: `${Math.min(100, performanceProgress)}%` }}
                />
              </div>
            </div>

            {/* Projects Completed */}
            <div className="p-3 bg-[#1a1a1a] border border-[#333] rounded">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {projectsCompleted >= projectsRequired ? (
                    <CheckCircle className="w-4 h-4 text-[#5cb85c]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#d9534f]" />
                  )}
                  <span className="text-sm text-[#fff]">Projects Completed:</span>
                </div>
                <span className={`text-sm font-bold ${
                  projectsCompleted >= projectsRequired ? 'text-[#5cb85c]' : 'text-[#d9534f]'
                }`}>
                  {projectsCompleted} / {projectsRequired}
                </span>
              </div>
              <div className="w-full bg-[#0a0a0a] h-2 rounded-sm overflow-hidden">
                <div 
                  className={`h-full transition-all ${
                    projectsCompleted >= projectsRequired ? 'bg-[#5cb85c]' : 'bg-[#d9534f]'
                  }`}
                  style={{ width: `${Math.min(100, projectsProgress)}%` }}
                />
              </div>
            </div>

            {/* No Warnings */}
            <div className="p-3 bg-[#1a1a1a] border border-[#333] rounded">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#5cb85c]" />
                  <span className="text-sm text-[#fff]">No warnings in last 60 days</span>
                </div>
                <span className="text-sm font-bold text-[#5cb85c]">✅</span>
              </div>
            </div>

            {/* Boss Approval */}
            <div className="p-3 bg-[#1a1a1a] border border-[#333] rounded">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {bossApproval >= bossApprovalRequired ? (
                    <CheckCircle className="w-4 h-4 text-[#5cb85c]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#f0ad4e]" />
                  )}
                  <span className="text-sm text-[#fff]">Boss Approval:</span>
                </div>
                <span className={`text-sm font-bold ${
                  bossApproval >= bossApprovalRequired ? 'text-[#5cb85c]' : 'text-[#f0ad4e]'
                }`}>
                  {bossApproval}% / {bossApprovalRequired}%
                </span>
              </div>
              <div className="w-full bg-[#0a0a0a] h-2 rounded-sm overflow-hidden">
                <div 
                  className="bg-[#f0ad4e] h-full transition-all"
                  style={{ width: `${Math.min(100, bossProgress)}%` }}
                />
              </div>
              {bossApproval < bossApprovalRequired && (
                <div className="text-xs text-[#f0ad4e] mt-1">
                  ⚠️ Need better relationship with manager
                </div>
              )}
            </div>
          </div>

          {/* Promotion Benefits */}
          <div className="p-3 bg-[#0f0f0f] border border-[#333] rounded mb-4">
            <h4 className="text-xs font-bold text-[#888] mb-2">PROMOTION BENEFITS:</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#888]">💰 Salary Increase:</span>
                <span className="text-[#5cb85c] font-bold">
                  ${Math.floor(currentJob.annualSalary / 12).toLocaleString()} → ${Math.floor(nextJob.annualSalary / 12).toLocaleString()} (+{salaryIncrease}%)
                </span>
              </div>
              <div className="text-xs text-[#888] mt-2">
                🎁 New Benefits: Company car, bonus eligibility, stock options
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#888]">📊 Overall Progress:</span>
              <span className="text-lg font-bold text-[#f0ad4e]">{overallProgress}%</span>
            </div>
            <div className="w-full bg-[#0a0a0a] h-4 border border-[#333] rounded-sm overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#f0ad4e] to-[#ec971f] h-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-[#666]">🕒 Estimated Time:</span>
              <span className="text-[#f0ad4e]">~{Math.max(0, daysUntilPromotion)} days</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-[#fff] text-xs transition-colors">
              💪 Focus on Missing Requirements
            </button>
            <button className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-[#fff] text-xs transition-colors">
              👔 Request Early Review
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#0a0a0a] border border-[#333] p-6 text-center">
          <Star className="w-12 h-12 text-[#f0ad4e] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#fff] mb-2">Top of Career Ladder!</h3>
          <p className="text-sm text-[#888]">
            You've reached the highest position in this career path.
          </p>
        </div>
      )}

      {/* Career Path Preview */}
      <div className="bg-[#0a0a0a] border border-[#333] p-4">
        <h3 className="text-lg font-bold text-[#fff] mb-3 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#5cb85c]" />
          🗺️ CAREER PATH PREVIEW
        </h3>
        <p className="text-xs text-[#888] mb-4">Your potential career ladder:</p>

        <div className="space-y-2">
          {careerLadder.slice().reverse().map((job, index) => {
            const reversedIndex = totalTiers - index;
            const isCurrent = job.id === currentJob.id;
            const isNext = nextJob && job.id === nextJob.id;
            const isPassed = reversedIndex < tierNumber;
            const isLocked = reversedIndex > tierNumber + 1;
            const monthlyPay = Math.floor(job.annualSalary / 12);

            return (
              <div
                key={job.id}
                className={`p-3 border-2 rounded transition-all ${
                  isCurrent 
                    ? 'border-[#5cb85c] bg-[#5cb85c]/10' 
                    : isNext
                    ? 'border-[#f0ad4e] bg-[#f0ad4e]/5'
                    : isPassed
                    ? 'border-[#333] bg-[#1a1a1a] opacity-60'
                    : 'border-[#333] bg-[#0f0f0f]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Tier Number */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    isCurrent 
                      ? 'bg-[#5cb85c] text-[#000]'
                      : isNext
                      ? 'bg-[#f0ad4e] text-[#000]'
                      : isPassed
                      ? 'bg-[#333] text-[#666]'
                      : 'bg-[#1a1a1a] text-[#888] border border-[#333]'
                  }`}>
                    {reversedIndex}
                  </div>

                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {isCurrent && <span className="text-xs font-bold text-[#5cb85c]">➡️ YOU ARE HERE</span>}
                      {isNext && <span className="text-xs font-bold text-[#f0ad4e]">⚡ NEXT!</span>}
                      {isPassed && <span className="text-xs text-[#666]">✓ Completed</span>}
                      {isLocked && <Lock className="w-3 h-3 text-[#666]" />}
                    </div>
                    <h4 className={`font-bold text-sm ${
                      isCurrent ? 'text-[#5cb85c]' :
                      isNext ? 'text-[#f0ad4e]' :
                      isPassed ? 'text-[#666]' :
                      'text-[#fff]'
                    }`}>
                      {job.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-xs">
                      <span className={`flex items-center gap-1 ${
                        isCurrent || isNext ? 'text-[#5cb85c]' : 'text-[#888]'
                      }`}>
                        <DollarSign className="w-3 h-3" />
                        ${monthlyPay.toLocaleString()}/mo
                      </span>
                      {!isPassed && !isCurrent && (
                        <span className="text-[#666]">
                          Requires: Level {job.requiredLevel}+
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status Icon */}
                  <div>
                    {isCurrent && <Star className="w-5 h-5 text-[#5cb85c]" />}
                    {isNext && <ArrowRight className="w-5 h-5 text-[#f0ad4e]" />}
                    {isPassed && <CheckCircle className="w-5 h-5 text-[#666]" />}
                    {isLocked && <Lock className="w-5 h-5 text-[#666]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="w-full mt-4 p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-[#888] hover:text-[#fff] text-xs transition-colors">
          📋 View Detailed Career Path
        </button>
      </div>

      {/* Skills Development */}
      {nextJob && Object.keys(nextJobSkills).length > 0 && (
        <div className="bg-[#0a0a0a] border border-[#333] p-4">
          <h3 className="text-lg font-bold text-[#fff] mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#5cb85c]" />
            📊 SKILLS DEVELOPMENT
          </h3>
          <p className="text-xs text-[#888] mb-4">Critical skills for promotion:</p>

          <div className="space-y-3">
            {Object.entries(nextJobSkills).map(([skill, required]) => {
              const currentSkillValue = (character as any)[skill] || 0;
              const skillProgress = Math.min(100, (currentSkillValue / (required as number)) * 100);
              const skillNeeded = Math.max(0, (required as number) - currentSkillValue);
              const hasMet = currentSkillValue >= (required as number);

              return (
                <div key={skill}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#fff] capitalize">{skill}:</span>
                    <span className={`text-sm font-bold ${hasMet ? 'text-[#5cb85c]' : 'text-[#d9534f]'}`}>
                      {currentSkillValue}/{required} {!hasMet && `(+${skillNeeded} needed)`}
                    </span>
                  </div>
                  <div className="w-full bg-[#0a0a0a] h-2 border border-[#333] rounded-sm overflow-hidden">
                    <div 
                      className={`h-full transition-all ${hasMet ? 'bg-[#5cb85c]' : 'bg-[#d9534f]'}`}
                      style={{ width: `${skillProgress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Training Options */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-[#fff] text-xs transition-colors flex items-center justify-center gap-1">
              <BookOpen className="w-3 h-3" />
              📚 View Training
            </button>
            <button className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-[#fff] text-xs transition-colors flex items-center justify-center gap-1">
              <GraduationCap className="w-3 h-3" />
              🎓 Enroll in Courses
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
