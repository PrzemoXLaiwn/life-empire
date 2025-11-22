'use client';

/**
 * Job Market Browser - Browse and Apply for Jobs
 * 
 * Features:
 * - Industry filters
 * - Salary range slider
 * - Experience level filter
 * - Location filter
 * - Detailed job cards with requirements
 * - Success rate calculation
 * - Competitor count
 */

import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  DollarSign, 
  MapPin, 
  Briefcase,
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import CVBuilderModal from './CVBuilderModal';
import type { Job } from '@prisma/client';

interface JobMarketBrowserProps {
  jobs: Job[];
  character: any;
  onApply: (jobId: string, cvData: any, suspicionLevel: number) => void;
  isApplying: boolean;
}

const INDUSTRIES = [
  'All Industries',
  'Technology & IT',
  'Healthcare & Medical',
  'Finance & Banking',
  'Retail & Sales',
  'Education',
  'Law & Legal',
  'Government',
  'Entertainment & Media',
  'Food Service',
  'Manufacturing',
  'Construction',
  'Transportation',
];

const EXPERIENCE_LEVELS = [
  'All Levels',
  'Entry Level (0-2 years)',
  'Mid Level (3-5 years)',
  'Senior Level (6-10 years)',
  'Executive (10+ years)',
];

const EDUCATION_LABELS: Record<string, string> = {
  NONE: 'None',
  ELEMENTARY: 'Elementary',
  HIGH_SCHOOL: 'High School',
  UNIVERSITY: 'University Degree',
  GRADUATE: 'Graduate Degree',
  TRADE_SCHOOL: 'Trade School',
};

export default function JobMarketBrowser({ 
  jobs, 
  character, 
  onApply, 
  isApplying 
}: JobMarketBrowserProps) {
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [salaryRange, setSalaryRange] = useState([0, 1000000]);
  const [selectedExperience, setSelectedExperience] = useState('All Levels');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [selectedJobForCV, setSelectedJobForCV] = useState<Job | null>(null);

  // Calculate success rate for a job application
  const calculateSuccessRate = (job: Job): number => {
    let baseRate = 50;

    // Level requirement
    if (character.level >= job.requiredLevel + 5) baseRate += 20;
    else if (character.level >= job.requiredLevel) baseRate += 10;
    else if (character.level < job.requiredLevel) baseRate -= 30;

    // Education requirement
    const educationLevels = ['NONE', 'ELEMENTARY', 'HIGH_SCHOOL', 'TRADE_SCHOOL', 'UNIVERSITY', 'GRADUATE'];
    const charEduIndex = educationLevels.indexOf(character.educationLevel || 'NONE');
    const reqEduIndex = educationLevels.indexOf(job.requiredEducation);
    
    if (charEduIndex > reqEduIndex) baseRate += 15;
    else if (charEduIndex === reqEduIndex) baseRate += 5;
    else baseRate -= 40;

    // Major requirement
    if (job.requiredMajor && character.major !== job.requiredMajor) {
      baseRate -= 25;
    } else if (job.requiredMajor && character.major === job.requiredMajor) {
      baseRate += 15;
    }

    // Skill requirements
    const requiredSkills = job.requiredSkills as Record<string, number> || {};
    let skillsMet = 0;
    let totalSkills = Object.keys(requiredSkills).length;
    
    for (const [skill, required] of Object.entries(requiredSkills)) {
      const characterSkill = (character as any)[skill] || 0;
      if (characterSkill >= required) skillsMet++;
      else if (characterSkill >= required * 0.8) baseRate -= 5;
      else baseRate -= 15;
    }

    if (totalSkills > 0 && skillsMet === totalSkills) baseRate += 10;

    return Math.max(5, Math.min(95, baseRate));
  };

  // Check if character meets all requirements
  const meetsRequirements = (job: Job): boolean => {
    // Level
    if (character.level < job.requiredLevel) return false;

    // Education
    if (job.requiredEducation && job.requiredEducation !== 'NONE') {
      const educationLevels = ['NONE', 'ELEMENTARY', 'HIGH_SCHOOL', 'TRADE_SCHOOL', 'UNIVERSITY', 'GRADUATE'];
      const charEduIndex = educationLevels.indexOf(character.educationLevel || 'NONE');
      const reqEduIndex = educationLevels.indexOf(job.requiredEducation);
      if (charEduIndex < reqEduIndex) return false;
    }

    // Major
    if (job.requiredMajor && character.major !== job.requiredMajor) return false;

    // Skills
    const requiredSkills = job.requiredSkills as Record<string, number> || {};
    for (const [skill, required] of Object.entries(requiredSkills)) {
      const characterSkill = (character as any)[skill] || 0;
      if (characterSkill < required) return false;
    }

    return true;
  };

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search query
      if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Industry filter (would need industry field in Job model)
      // For now, we'll use category as a proxy
      if (selectedIndustry !== 'All Industries') {
        // This is a placeholder - you'd need to add industry field to Job model
      }

      // Salary range
      if (job.annualSalary < salaryRange[0] || job.annualSalary > salaryRange[1]) {
        return false;
      }

      // Experience level (based on required level)
      if (selectedExperience !== 'All Levels') {
        const levelRanges = {
          'Entry Level (0-2 years)': [1, 5],
          'Mid Level (3-5 years)': [6, 12],
          'Senior Level (6-10 years)': [13, 20],
          'Executive (10+ years)': [21, 100],
        };
        const range = levelRanges[selectedExperience as keyof typeof levelRanges];
        if (range && (job.requiredLevel < range[0] || job.requiredLevel > range[1])) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, searchQuery, selectedIndustry, salaryRange, selectedExperience]);

  // Generate random competitor count
  const getCompetitorCount = (job: Job): number => {
    const baseCompetitors = Math.floor(job.annualSalary / 5000);
    return Math.max(5, Math.min(100, baseCompetitors + Math.floor(Math.random() * 20)));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#fff] flex items-center gap-2">
            <Search className="w-6 h-6 text-[#5cb85c]" />
            JOB MARKET - FULL-TIME POSITIONS
          </h2>
          <p className="text-sm text-[#888] mt-1">
            Showing {filteredJobs.length} of {jobs.length} available positions
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#333] hover:border-[#555] transition-colors"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? 'Hide' : 'Show'} Filters
          {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="p-4 bg-[#0a0a0a] border border-[#333] space-y-4">
          {/* Search */}
          <div>
            <label className="block text-xs text-[#888] mb-2">Search Jobs</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, company, keywords..."
                className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#333] text-[#fff] text-sm focus:border-[#5cb85c] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Industry Filter */}
            <div>
              <label className="block text-xs text-[#888] mb-2">📁 Industry</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#fff] text-sm focus:border-[#5cb85c] focus:outline-none"
              >
                {INDUSTRIES.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs text-[#888] mb-2">📊 Experience Required</label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#fff] text-sm focus:border-[#5cb85c] focus:outline-none"
              >
                {EXPERIENCE_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Location (Placeholder) */}
            <div>
              <label className="block text-xs text-[#888] mb-2">📍 Location</label>
              <select
                className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#fff] text-sm focus:border-[#5cb85c] focus:outline-none"
              >
                <option>Your City</option>
                <option>Remote</option>
                <option>Nearby Cities</option>
              </select>
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-xs text-[#888] mb-2">
              💵 Salary Range: ${salaryRange[0].toLocaleString()} - ${salaryRange[1].toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={salaryRange[1]}
              onChange={(e) => setSalaryRange([0, parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="p-8 text-center bg-[#0a0a0a] border border-[#333]">
            <AlertCircle className="w-12 h-12 text-[#888] mx-auto mb-3" />
            <p className="text-[#888]">No jobs match your filters</p>
            <p className="text-xs text-[#666] mt-1">Try adjusting your search criteria</p>
          </div>
        ) : (
          filteredJobs.map(job => {
            const successRate = calculateSuccessRate(job);
            const meetsReqs = meetsRequirements(job);
            const competitors = getCompetitorCount(job);
            const isExpanded = expandedJobId === job.id;
            const requiredSkills = job.requiredSkills as Record<string, number> || {};

            return (
              <div
                key={job.id}
                className="bg-[#0a0a0a] border-2 border-[#333] hover:border-[#555] transition-all"
              >
                {/* Job Header */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#fff] mb-1">
                        {job.title}
                      </h3>
                      <p className="text-sm text-[#888] mb-2">{job.description}</p>
                      <div className="flex items-center gap-4 flex-wrap text-xs">
                        <span className="flex items-center gap-1 text-[#5cb85c]">
                          <DollarSign className="w-3 h-3" />
                          ${job.annualSalary.toLocaleString()}/year
                        </span>
                        <span className="flex items-center gap-1 text-[#888]">
                          <Briefcase className="w-3 h-3" />
                          {job.category}
                        </span>
                        <span className="flex items-center gap-1 text-[#888]">
                          <MapPin className="w-3 h-3" />
                          Downtown Office
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        successRate >= 70 ? 'text-[#5cb85c]' :
                        successRate >= 40 ? 'text-[#f0ad4e]' :
                        'text-[#d9534f]'
                      }`}>
                        {successRate}%
                      </div>
                      <div className="text-xs text-[#888]">Success Rate</div>
                    </div>
                  </div>

                  {/* Quick Requirements */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs">
                      {character.level >= job.requiredLevel ? (
                        <CheckCircle className="w-4 h-4 text-[#5cb85c]" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#d9534f]" />
                      )}
                      <span className={character.level >= job.requiredLevel ? 'text-[#5cb85c]' : 'text-[#d9534f]'}>
                        Level {job.requiredLevel}+
                      </span>
                    </div>
                    {job.requiredEducation && job.requiredEducation !== 'NONE' && (
                      <div className="flex items-center gap-2 text-xs">
                        {character.educationLevel && 
                         ['NONE', 'ELEMENTARY', 'HIGH_SCHOOL', 'TRADE_SCHOOL', 'UNIVERSITY', 'GRADUATE'].indexOf(character.educationLevel) >=
                         ['NONE', 'ELEMENTARY', 'HIGH_SCHOOL', 'TRADE_SCHOOL', 'UNIVERSITY', 'GRADUATE'].indexOf(job.requiredEducation) ? (
                          <CheckCircle className="w-4 h-4 text-[#5cb85c]" />
                        ) : (
                          <XCircle className="w-4 h-4 text-[#d9534f]" />
                        )}
                        <span className="text-[#888]">
                          {EDUCATION_LABELS[job.requiredEducation]}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="w-4 h-4 text-[#888]" />
                      <span className="text-[#888]">{competitors} applicants</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <TrendingUp className="w-4 h-4 text-[#f0ad4e]" />
                      <span className="text-[#888]">+{job.experiencePerWork} XP/day</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                      className="flex-1 px-4 py-2 bg-[#1a1a1a] border border-[#333] hover:border-[#555] text-[#fff] text-sm transition-colors"
                    >
                      {isExpanded ? 'Hide' : 'View'} Full Details
                    </button>
                    <button
                      onClick={() => setSelectedJobForCV(job)}
                      disabled={isApplying}
                      className="flex-1 px-4 py-2 text-sm font-bold transition-colors bg-[#5cb85c] hover:bg-[#4a9d4a] text-[#000]"
                    >
                      📝 Apply Now
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-[#333] p-4 bg-[#0f0f0f] space-y-4">
                    {/* Detailed Requirements */}
                    <div>
                      <h4 className="text-sm font-bold text-[#fff] mb-2">📊 REQUIREMENTS:</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#888]">Level:</span>
                          <span className={character.level >= job.requiredLevel ? 'text-[#5cb85c]' : 'text-[#d9534f]'}>
                            {character.level} / {job.requiredLevel}
                          </span>
                        </div>
                        {job.requiredEducation && job.requiredEducation !== 'NONE' && (
                          <div className="flex items-center justify-between">
                            <span className="text-[#888]">Education:</span>
                            <span className="text-[#888]">{EDUCATION_LABELS[job.requiredEducation]}</span>
                          </div>
                        )}
                        {job.requiredMajor && (
                          <div className="flex items-center justify-between">
                            <span className="text-[#888]">Major:</span>
                            <span className={character.major === job.requiredMajor ? 'text-[#5cb85c]' : 'text-[#d9534f]'}>
                              {job.requiredMajor}
                            </span>
                          </div>
                        )}
                        {Object.entries(requiredSkills).map(([skill, required]) => {
                          const charSkill = (character as any)[skill] || 0;
                          return (
                            <div key={skill} className="flex items-center justify-between">
                              <span className="text-[#888] capitalize">{skill}:</span>
                              <span className={charSkill >= required ? 'text-[#5cb85c]' : 'text-[#d9534f]'}>
                                {charSkill} / {required}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="text-sm font-bold text-[#fff] mb-2">💼 BENEFITS:</h4>
                      <ul className="space-y-1 text-xs text-[#888]">
                        <li>• Health Insurance</li>
                        <li>• {Math.floor(job.annualSalary / 1000)} days paid vacation</li>
                        <li>• Career growth opportunities</li>
                        {job.bonusPercentage > 0 && <li>• {job.bonusPercentage}% annual bonus</li>}
                        <li>• Training & certifications paid</li>
                      </ul>
                    </div>

                    {/* Work Details */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-2 bg-[#1a1a1a] border border-[#333]">
                        <div className="text-xs text-[#888] mb-1">Daily Pay</div>
                        <div className="text-sm font-bold text-[#5cb85c]">
                          ${Math.floor(job.annualSalary / 365).toLocaleString()}
                        </div>
                      </div>
                      <div className="p-2 bg-[#1a1a1a] border border-[#333]">
                        <div className="text-xs text-[#888] mb-1">Energy Cost</div>
                        <div className="text-sm font-bold text-[#f0ad4e]">
                          {job.energyPerWork} ⚡
                        </div>
                      </div>
                      <div className="p-2 bg-[#1a1a1a] border border-[#333]">
                        <div className="text-xs text-[#888] mb-1">Hours/Week</div>
                        <div className="text-sm font-bold text-[#fff]">
                          40h
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* CV Builder Modal */}
      {selectedJobForCV && (
        <CVBuilderModal
          isOpen={!!selectedJobForCV}
          onClose={() => setSelectedJobForCV(null)}
          job={selectedJobForCV}
          character={character}
          onSubmit={(cvData, suspicionLevel) => {
            onApply(selectedJobForCV.id, cvData, suspicionLevel);
            setSelectedJobForCV(null);
          }}
        />
      )}
    </div>
  );
}
