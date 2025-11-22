'use client';

/**
 * Probation Tracker - Track Probation Period Progress
 * 
 * Features:
 * - Days left counter
 * - Performance requirement
 * - Progress visualization
 * - Warning if performance drops
 */

import { Shield, AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react';

interface ProbationTrackerProps {
  daysLeft: number;
  performanceRequired: number;
  currentPerformance: number;
  totalDays: number;
}

export default function ProbationTracker({
  daysLeft,
  performanceRequired,
  currentPerformance,
  totalDays,
}: ProbationTrackerProps) {
  const daysCompleted = totalDays - daysLeft;
  const progress = (daysCompleted / totalDays) * 100;
  const isPerformanceGood = currentPerformance >= performanceRequired;
  const performanceMargin = currentPerformance - performanceRequired;

  return (
    <div className="bg-[#d9534f]/10 border-2 border-[#d9534f] p-4">
      <div className="flex items-start gap-3 mb-4">
        <Shield className="w-6 h-6 text-[#d9534f] flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#d9534f] mb-1">
            ⚠️ PROBATION PERIOD
          </h3>
          <p className="text-sm text-[#888]">
            You must prove yourself to keep this job!
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-4">
        {/* Days Progress */}
        <div>
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-[#888]">Days Completed:</span>
            <span className="text-[#fff] font-bold">
              {daysCompleted} / {totalDays} days
            </span>
          </div>
          <div className="w-full bg-[#1a1a1a] h-3 border border-[#333]">
            <div 
              className="bg-[#f0ad4e] h-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right text-xs text-[#888] mt-1">
            {daysLeft} days remaining
          </div>
        </div>

        {/* Performance Requirement */}
        <div>
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-[#888]">Performance Required:</span>
            <span className={`font-bold ${isPerformanceGood ? 'text-[#5cb85c]' : 'text-[#d9534f]'}`}>
              {currentPerformance}% / {performanceRequired}%
            </span>
          </div>
          <div className="w-full bg-[#1a1a1a] h-3 border border-[#333] relative">
            {/* Required line */}
            <div 
              className="absolute h-full w-0.5 bg-[#fff] z-10"
              style={{ left: `${performanceRequired}%` }}
            />
            {/* Current performance */}
            <div 
              className={`h-full transition-all ${
                isPerformanceGood ? 'bg-[#5cb85c]' : 'bg-[#d9534f]'
              }`}
              style={{ width: `${currentPerformance}%` }}
            />
          </div>
        </div>

        {/* Status Message */}
        {isPerformanceGood ? (
          <div className="flex items-center gap-2 p-3 bg-[#5cb85c]/10 border border-[#5cb85c]">
            <CheckCircle className="w-4 h-4 text-[#5cb85c]" />
            <div className="text-sm">
              <span className="text-[#5cb85c] font-bold">On Track!</span>
              <span className="text-[#888] ml-2">
                {performanceMargin >= 10 
                  ? `Great performance! (+${performanceMargin.toFixed(0)}% above requirement)`
                  : `Keep it up! (+${performanceMargin.toFixed(0)}% above requirement)`
                }
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-3 bg-[#d9534f]/10 border border-[#d9534f]">
            <AlertTriangle className="w-4 h-4 text-[#d9534f]" />
            <div className="text-sm">
              <span className="text-[#d9534f] font-bold">Warning!</span>
              <span className="text-[#888] ml-2">
                Performance too low! Need {Math.abs(performanceMargin).toFixed(0)}% more or you'll be FIRED!
              </span>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="text-xs text-[#666] space-y-1 pt-2 border-t border-[#333]">
          <div>💡 Work with "Hard Worker" or "Workaholic" ethic to boost performance</div>
          <div>💡 Avoid missing work days during probation</div>
          <div>💡 Build good relationships with coworkers for support</div>
        </div>
      </div>
    </div>
  );
}
