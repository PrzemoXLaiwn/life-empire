'use client';

/**
 * Career Sidebar - Main Navigation for Career System
 * 
 * 8 Main Options:
 * 1. Full-Time Job
 * 2. Part-Time Job
 * 3. Freelancing / Gigs
 * 4. Self-Employed Business
 * 5. Create Company
 * 6. Investments & Passive Income
 * 7. Education & Skills
 * 8. Career Overview
 */

import { 
  Briefcase, 
  Clock, 
  DollarSign, 
  Store, 
  Building2, 
  TrendingUp, 
  GraduationCap, 
  BarChart3,
  ChevronRight
} from 'lucide-react';

interface CareerSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  hasFullTimeJob?: boolean;
  hasPartTimeJob?: boolean;
}

const CAREER_MENU_ITEMS = [
  {
    id: 'full-time',
    icon: Briefcase,
    label: 'Full-Time Job',
    emoji: '💼',
    description: 'Stable employment with benefits',
    requiresJob: false,
  },
  {
    id: 'part-time',
    icon: Clock,
    label: 'Part-Time Job',
    emoji: '⏰',
    description: 'Flexible hours, lower commitment',
    requiresJob: false,
  },
  {
    id: 'freelancing',
    icon: DollarSign,
    label: 'Freelancing / Gigs',
    emoji: '💰',
    description: 'Project-based work, be your own boss',
    requiresJob: false,
  },
  {
    id: 'self-employed',
    icon: Store,
    label: 'Self-Employed Business',
    emoji: '🏪',
    description: 'Run your own small business',
    requiresJob: false,
  },
  {
    id: 'create-company',
    icon: Building2,
    label: 'Create Company',
    emoji: '🏢',
    description: 'Build a corporate empire',
    requiresJob: false,
  },
  {
    id: 'investments',
    icon: TrendingUp,
    label: 'Investments & Passive Income',
    emoji: '📈',
    description: 'Stocks, crypto, real estate',
    requiresJob: false,
  },
  {
    id: 'education',
    icon: GraduationCap,
    label: 'Education & Skills',
    emoji: '🎓',
    description: 'Improve qualifications and abilities',
    requiresJob: false,
  },
  {
    id: 'overview',
    icon: BarChart3,
    label: 'Career Overview',
    emoji: '📊',
    description: 'View your complete career stats',
    requiresJob: false,
  },
];

export default function CareerSidebar({ 
  activeSection, 
  onSectionChange,
  hasFullTimeJob = false,
  hasPartTimeJob = false,
}: CareerSidebarProps) {
  return (
    <div className="w-full lg:w-80 bg-[#0a0a0a] border border-[#333] h-fit sticky top-4">
      {/* Header */}
      <div className="p-4 border-b border-[#333] bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f]">
        <h2 className="text-xl font-bold text-[#fff] flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-[#5cb85c]" />
          CAREER MENU
        </h2>
        <p className="text-xs text-[#888] mt-1">
          Choose your path to success
        </p>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        {CAREER_MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const hasActiveJob = 
            (item.id === 'full-time' && hasFullTimeJob) ||
            (item.id === 'part-time' && hasPartTimeJob);

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full p-3 mb-2 text-left transition-all
                border-2 rounded-sm
                ${isActive 
                  ? 'border-[#5cb85c] bg-[#5cb85c]/10' 
                  : 'border-[#333] hover:border-[#555] bg-[#0f0f0f]'
                }
                group relative
              `}
            >
              {/* Active Indicator */}
              {hasActiveJob && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-[#5cb85c] rounded-full animate-pulse" />
                </div>
              )}

              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`
                  text-2xl flex-shrink-0
                  ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                  transition-transform
                `}>
                  {item.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`
                      font-bold text-sm
                      ${isActive ? 'text-[#5cb85c]' : 'text-[#fff]'}
                    `}>
                      {item.label}
                    </h3>
                    {hasActiveJob && (
                      <span className="px-1.5 py-0.5 bg-[#5cb85c] text-[#000] text-[10px] font-bold rounded">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#888] mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight className={`
                  w-4 h-4 flex-shrink-0 transition-all
                  ${isActive 
                    ? 'text-[#5cb85c] translate-x-1' 
                    : 'text-[#555] group-hover:translate-x-1'
                  }
                `} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t border-[#333] bg-[#0a0a0a]">
        <div className="text-xs text-[#888] space-y-2">
          <div className="flex items-center justify-between">
            <span>Employment Status:</span>
            <span className={hasFullTimeJob || hasPartTimeJob ? 'text-[#5cb85c]' : 'text-[#f0ad4e]'}>
              {hasFullTimeJob && hasPartTimeJob ? 'Full + Part Time' :
               hasFullTimeJob ? 'Full-Time' :
               hasPartTimeJob ? 'Part-Time' :
               'Unemployed'}
            </span>
          </div>
          {(hasFullTimeJob || hasPartTimeJob) && (
            <div className="flex items-center justify-between">
              <span>Active Jobs:</span>
              <span className="text-[#fff] font-bold">
                {(hasFullTimeJob ? 1 : 0) + (hasPartTimeJob ? 1 : 0)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
