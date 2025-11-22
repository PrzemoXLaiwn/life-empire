'use client';

/**
 * Full-Time Job Panel - Main Hub for Full-Time Employment
 * 
 * Shows 4 options:
 * 1. Browse Job Market
 * 2. My Current Job (requires active job)
 * 3. Career Progression (requires active job)
 * 4. Workplace Relations (requires 7+ days employed)
 */

import { 
  Search, 
  Briefcase, 
  TrendingUp, 
  Users,
  Lock,
  ChevronRight
} from 'lucide-react';

interface FullTimeJobPanelProps {
  hasJob: boolean;
  daysEmployed: number;
  onSelectSubsection: (subsection: string) => void;
}

export default function FullTimeJobPanel({
  hasJob,
  daysEmployed,
  onSelectSubsection,
}: FullTimeJobPanelProps) {
  const canAccessCareerProgression = hasJob;
  const canAccessWorkplaceRelations = hasJob && daysEmployed >= 7;

  const options = [
    {
      id: 'browse-market',
      icon: Search,
      emoji: '🔍',
      title: 'Browse Job Market',
      description: 'Search and apply for full-time positions',
      locked: false,
      lockReason: null,
    },
    {
      id: 'current-job',
      icon: Briefcase,
      emoji: '📋',
      title: 'My Current Job',
      description: 'Manage your active employment',
      locked: !hasJob,
      lockReason: 'Requires: Active full-time job',
    },
    {
      id: 'career-progression',
      icon: TrendingUp,
      emoji: '📈',
      title: 'Career Progression',
      description: 'View promotions, raises, performance',
      locked: !canAccessCareerProgression,
      lockReason: 'Requires: Active full-time job',
    },
    {
      id: 'workplace-relations',
      icon: Users,
      emoji: '👥',
      title: 'Workplace Relations',
      description: 'Coworkers, boss, office politics',
      locked: !canAccessWorkplaceRelations,
      lockReason: 'Requires: 7+ days employed',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-[#333] p-4">
        <h2 className="text-2xl font-bold text-[#fff] mb-2 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-[#5cb85c]" />
          💼 FULL-TIME EMPLOYMENT
        </h2>
        <p className="text-sm text-[#888]">
          Stable employment with benefits, career progression, and professional development
        </p>
      </div>

      {/* Choose Action */}
      <div className="bg-[#0a0a0a] border border-[#333] p-4">
        <h3 className="text-sm font-bold text-[#888] mb-4 uppercase tracking-wider">
          Choose Action:
        </h3>

        <div className="space-y-3">
          {options.map((option) => {
            const Icon = option.icon;
            const isLocked = option.locked;

            return (
              <button
                key={option.id}
                onClick={() => !isLocked && onSelectSubsection(option.id)}
                disabled={isLocked}
                className={`w-full p-4 border-2 rounded transition-all text-left ${
                  isLocked
                    ? 'border-[#333] bg-[#0f0f0f] opacity-50 cursor-not-allowed'
                    : 'border-[#333] bg-[#1a1a1a] hover:border-[#5cb85c] hover:bg-[#5cb85c]/5'
                } group`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`text-3xl ${isLocked ? 'grayscale' : ''}`}>
                    {option.emoji}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className={`font-bold text-base mb-1 ${
                      isLocked ? 'text-[#666]' : 'text-[#fff] group-hover:text-[#5cb85c]'
                    }`}>
                      {option.title}
                    </h4>
                    <p className="text-xs text-[#888] mb-2">
                      {option.description}
                    </p>
                    {isLocked && option.lockReason && (
                      <div className="flex items-center gap-1 text-xs text-[#d9534f]">
                        <Lock className="w-3 h-3" />
                        {option.lockReason}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  {!isLocked && (
                    <ChevronRight className="w-5 h-5 text-[#555] group-hover:text-[#5cb85c] group-hover:translate-x-1 transition-all" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-[#1a1a1a] border border-[#5cb85c] p-4">
        <h4 className="text-xs font-bold text-[#5cb85c] mb-2 flex items-center gap-2">
          <Briefcase className="w-3 h-3" />
          💼 FULL-TIME JOB BENEFITS
        </h4>
        <ul className="space-y-1 text-xs text-[#888]">
          <li>• Stable monthly income with annual salary</li>
          <li>• Health insurance and benefits package</li>
          <li>• Paid vacation days (15-30 days/year)</li>
          <li>• Career progression and promotion opportunities</li>
          <li>• Professional development and training</li>
          <li>• Retirement benefits (401k, pension)</li>
          <li>• Networking and relationship building</li>
        </ul>
      </div>
    </div>
  );
}
