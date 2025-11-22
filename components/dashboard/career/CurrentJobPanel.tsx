'use client';

/**
 * Current Job Panel - Manage Active Employment
 * 
 * Features:
 * - Company & position details
 * - Financial breakdown (salary + bonuses + overtime)
 * - Performance metrics with progress bars
 * - Work statistics
 * - Action buttons (Work, Day Off, Raise, Promotion, Resign)
 */

import { 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Award,
  Users,
  Settings,
  LogOut,
  Play,
  Clock,
  BarChart3
} from 'lucide-react';
import ProbationTracker from './ProbationTracker';
import type { Job } from '@prisma/client';

interface CurrentJobPanelProps {
  job: Job;
  character: any;
  onWork: () => void;
  onRequestDayOff: () => void;
  onRequestRaise: () => void;
  onRequestPromotion: () => void;
  onResign: () => void;
  isWorking: boolean;
}

export default function CurrentJobPanel({
  job,
  character,
  onWork,
  onRequestDayOff,
  onRequestRaise,
  onRequestPromotion,
  isWorking,
  onResign,
}: CurrentJobPanelProps) {
  const daysEmployed = Math.floor(character.yearsInJob * 365);
  const monthlyPay = Math.floor(job.annualSalary / 12);
  const dailyPay = Math.floor(job.annualSalary / 365);
  const bonusThisMonth = Math.floor(monthlyPay * (job.bonusPercentage / 100));
  
  // Calculate next paycheck date (assuming monthly)
  const nextPaycheckDays = 30 - (daysEmployed % 30);
  
  // Performance rating color
  const getPerformanceColor = (rating: number) => {
    if (rating >= 90) return 'text-[#5cb85c]';
    if (rating >= 80) return 'text-[#5cb85c]';
    if (rating >= 70) return 'text-[#f0ad4e]';
    if (rating >= 60) return 'text-[#f0ad4e]';
    return 'text-[#d9534f]';
  };

  const getPerformanceLabel = (rating: number) => {
    if (rating >= 90) return 'Outstanding';
    if (rating >= 80) return 'Excellent';
    if (rating >= 70) return 'Good';
    if (rating >= 60) return 'Satisfactory';
    if (rating >= 50) return 'Needs Improvement';
    return 'Poor';
  };

  // Calculate promotion eligibility
  const canRequestPromotion = 
    job.nextJobId &&
    character.yearsInJob >= job.yearsForPromotion &&
    character.performanceRating >= job.minPerformance;

  const promotionProgress = job.nextJobId
    ? Math.min(100, (character.yearsInJob / job.yearsForPromotion) * 100)
    : 0;

  return (
    <div className="space-y-4">
      {/* Probation Tracker (if on probation) */}
      {character.onProbation && character.probationDaysLeft > 0 && (
        <ProbationTracker
          daysLeft={character.probationDaysLeft}
          performanceRequired={character.probationPerformanceRequired}
          currentPerformance={character.performanceRating}
          totalDays={character.liedOnResume ? 
            (character.probationPerformanceRequired >= 80 ? 45 : 
             character.probationPerformanceRequired >= 75 ? 30 : 15) : 15
          }
        />
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-[#333] p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-[#5cb85c]" />
              <h2 className="text-2xl font-bold text-[#fff]">MY CURRENT JOB</h2>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[#888]">🏢 Company:</span>
                <span className="text-[#fff] font-bold">TechCorp Industries</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#888]">👔 Position:</span>
                <span className="text-[#fff] font-bold">{job.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#888]">🏷️ Department:</span>
                <span className="text-[#888]">{job.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#888]">📅 Employed Since:</span>
                <span className="text-[#f0ad4e]">{daysEmployed} days ({character.yearsInJob.toFixed(1)} years)</span>
              </div>
            </div>
          </div>
          <button
            onClick={onResign}
            className="px-3 py-1.5 bg-[#d9534f] hover:bg-[#c9302c] text-[#fff] text-xs font-bold transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3 h-3" />
            Resign
          </button>
        </div>
      </div>

      {/* Financial Details */}
      <div className="bg-[#0a0a0a] border border-[#333] p-4">
        <h3 className="text-sm font-bold text-[#fff] mb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#5cb85c]" />
          FINANCIAL DETAILS
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#888]">Base Salary:</span>
            <span className="text-[#fff] font-bold">${monthlyPay.toLocaleString()}/month</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#888]">Bonuses This Month:</span>
            <span className="text-[#5cb85c]">+${bonusThisMonth.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#888]">Overtime Pay:</span>
            <span className="text-[#5cb85c]">+$0</span>
          </div>
          <div className="border-t border-[#333] pt-2 mt-2 flex items-center justify-between">
            <span className="text-[#888] font-bold">Total Income:</span>
            <span className="text-[#5cb85c] font-bold text-lg">
              ${(monthlyPay + bonusThisMonth).toLocaleString()}
            </span>
          </div>
          <div className="pt-2 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#888]">Next Paycheck:</span>
              <span className="text-[#f0ad4e]">{nextPaycheckDays} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#888]">Payment Method:</span>
              <span className="text-[#888]">💳 Bank Transfer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance & Stats */}
      <div className="bg-[#0a0a0a] border border-[#333] p-4">
        <h3 className="text-sm font-bold text-[#fff] mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#f0ad4e]" />
          PERFORMANCE & STATS
        </h3>
        
        {/* Overall Rating */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#888]">Overall Rating:</span>
            <span className={`text-lg font-bold ${getPerformanceColor(character.performanceRating)}`}>
              {getPerformanceLabel(character.performanceRating)} ({character.performanceRating}/100)
            </span>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 ${
                  i < Math.floor(character.performanceRating / 20)
                    ? 'bg-[#5cb85c]'
                    : 'bg-[#333]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-3">
          {/* Productivity */}
          <div>
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="text-[#888]">Productivity:</span>
              <span className="text-[#fff]">92/100</span>
            </div>
            <div className="w-full bg-[#1a1a1a] h-2">
              <div className="bg-[#5cb85c] h-2" style={{ width: '92%' }} />
            </div>
          </div>

          {/* Quality */}
          <div>
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="text-[#888]">Quality:</span>
              <span className="text-[#fff]">85/100</span>
            </div>
            <div className="w-full bg-[#1a1a1a] h-2">
              <div className="bg-[#5cb85c] h-2" style={{ width: '85%' }} />
            </div>
          </div>

          {/* Teamwork */}
          <div>
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="text-[#888]">Teamwork:</span>
              <span className="text-[#fff]">78/100</span>
            </div>
            <div className="w-full bg-[#1a1a1a] h-2">
              <div className="bg-[#f0ad4e] h-2" style={{ width: '78%' }} />
            </div>
          </div>

          {/* Punctuality */}
          <div>
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="text-[#888]">Punctuality:</span>
              <span className="text-[#fff]">95/100</span>
            </div>
            <div className="w-full bg-[#1a1a1a] h-2">
              <div className="bg-[#5cb85c] h-2" style={{ width: '95%' }} />
            </div>
          </div>
        </div>

        {/* Work Statistics */}
        <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
          <div className="p-2 bg-[#1a1a1a] border border-[#333]">
            <div className="text-[#888] mb-1">Days Worked</div>
            <div className="text-[#fff] font-bold">{daysEmployed}</div>
          </div>
          <div className="p-2 bg-[#1a1a1a] border border-[#333]">
            <div className="text-[#888] mb-1">Overtime Hours</div>
            <div className="text-[#fff] font-bold">0</div>
          </div>
          <div className="p-2 bg-[#1a1a1a] border border-[#333]">
            <div className="text-[#888] mb-1">Projects Done</div>
            <div className="text-[#fff] font-bold">0</div>
          </div>
          <div className="p-2 bg-[#1a1a1a] border border-[#333]">
            <div className="text-[#888] mb-1">Warnings</div>
            <div className="text-[#5cb85c] font-bold">0 ✅</div>
          </div>
        </div>

        {/* Next Review */}
        <div className="mt-4 p-3 bg-[#1a1a1a] border border-[#333] text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#888]">Next Performance Review:</span>
            <span className="text-[#f0ad4e]">45 days</span>
          </div>
          {job.nextJobId && (
            <div className="flex items-center justify-between mt-1">
              <span className="text-[#888]">Promotion Eligibility:</span>
              <span className={canRequestPromotion ? 'text-[#5cb85c]' : 'text-[#f0ad4e]'}>
                {canRequestPromotion ? 'Ready!' : `${Math.ceil((job.yearsForPromotion - character.yearsInJob) * 365)} days`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-[#0a0a0a] border border-[#333] p-4">
        <h3 className="text-sm font-bold text-[#fff] mb-3 flex items-center gap-2">
          <Settings className="w-4 h-4 text-[#888]" />
          ACTIONS
        </h3>
        
        <div className="space-y-2">
          {/* Work Button */}
          <button
            onClick={onWork}
            disabled={isWorking || character.energy < job.energyPerWork}
            className="w-full p-4 bg-[#5cb85c] hover:bg-[#4a9d4a] disabled:bg-[#333] disabled:cursor-not-allowed text-[#000] disabled:text-[#666] font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            {isWorking ? (
              <>
                <Clock className="w-5 h-5 animate-spin" />
                Working...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                🏢 Go To Work Today (${dailyPay.toLocaleString()})
              </>
            )}
          </button>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onRequestDayOff}
              className="p-3 bg-[#1a1a1a] border border-[#333] hover:border-[#555] text-[#fff] text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Request Day Off
            </button>
            <button
              onClick={onRequestRaise}
              className="p-3 bg-[#1a1a1a] border border-[#333] hover:border-[#555] text-[#fff] text-sm transition-colors flex items-center justify-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              Request Raise
            </button>
          </div>

          {/* Promotion Button */}
          {job.nextJobId && (
            <button
              onClick={onRequestPromotion}
              disabled={!canRequestPromotion}
              className={`w-full p-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
                canRequestPromotion
                  ? 'bg-[#f0ad4e] hover:bg-[#ec971f] text-[#000]'
                  : 'bg-[#333] text-[#666] cursor-not-allowed'
              }`}
            >
              <Award className="w-4 h-4" />
              📈 Apply for Promotion
              {!canRequestPromotion && ` (${Math.ceil(promotionProgress)}%)`}
            </button>
          )}

          {/* Additional Actions */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#555] text-[#888] transition-colors">
              📋 Performance History
            </button>
            <button className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#555] text-[#888] transition-colors">
              <Users className="w-3 h-3 inline mr-1" />
              View Coworkers
            </button>
          </div>
        </div>
      </div>

      {/* Promotion Requirements (if applicable) */}
      {job.nextJobId && !canRequestPromotion && (
        <div className="bg-[#1a1a1a] border-2 border-[#f0ad4e] p-4">
          <h3 className="text-sm font-bold text-[#f0ad4e] mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            PROMOTION REQUIREMENTS
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#888]">Time in Position:</span>
              <span className={character.yearsInJob >= job.yearsForPromotion ? 'text-[#5cb85c]' : 'text-[#f0ad4e]'}>
                {character.yearsInJob.toFixed(1)} / {job.yearsForPromotion} years
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#888]">Performance Rating:</span>
              <span className={character.performanceRating >= job.minPerformance ? 'text-[#5cb85c]' : 'text-[#d9534f]'}>
                {character.performanceRating} / {job.minPerformance}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#333]">
              <div className="text-[#888] mb-1">Overall Progress:</div>
              <div className="w-full bg-[#0a0a0a] h-3 border border-[#333]">
                <div 
                  className="bg-[#f0ad4e] h-full transition-all"
                  style={{ width: `${Math.min(100, promotionProgress)}%` }}
                />
              </div>
              <div className="text-right text-[#f0ad4e] mt-1 font-bold">
                {Math.ceil(promotionProgress)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
