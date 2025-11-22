'use client';

/**
 * BitLife-Style Jobs Page
 *
 * Features:
 * - Browse available jobs by category
 * - View salary, requirements, education needs
 * - Simple "Work" button (no shifts)
 * - Performance tracking
 * - Promotion system
 * - Work ethic selection
 */

import { useEffect, useState } from 'react';
import { useCharacterStore } from '@/lib/character-store';
import {
  getAvailableJobs,
  applyForJob,
  doWork,
  quitJob,
  changeWorkEthic,
  requestPromotion,
} from '@/actions/jobs';
import { Briefcase, DollarSign, TrendingUp, X, Star } from 'lucide-react';
import type { Job } from '@prisma/client';

const WORK_ETHICS = [
  { value: 'LAZY', label: 'Lazy', icon: '😴', desc: 'Minimal effort' },
  { value: 'STANDARD', label: 'Standard', icon: '😐', desc: 'Normal work' },
  { value: 'HARD_WORKER', label: 'Hard Worker', icon: '💪', desc: 'High effort' },
  { value: 'WORKAHOLIC', label: 'Workaholic', icon: '🔥', desc: 'Maximum effort' },
];

const EDUCATION_LABELS: Record<string, string> = {
  NONE: 'None',
  ELEMENTARY: 'Elementary',
  HIGH_SCHOOL: 'High School',
  UNIVERSITY: 'University Degree',
  GRADUATE: 'Graduate Degree',
  TRADE_SCHOOL: 'Trade School',
};

export default function JobsPage() {
  const { character, refreshCharacter } = useCharacterStore();
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    if (character) {
      loadJobs();
    }
  }, [character]);

  const loadJobs = async () => {
    if (!character) return;

    setIsLoading(true);
    const result = await getAvailableJobs(character.id);

    if (result.success) {
      setAvailableJobs(result.data.available);
      setCurrentJob(result.data.currentJob);
    } else {
      setError(result.error || 'Failed to load jobs');
    }

    setIsLoading(false);
  };

  const handleApply = async (jobId: string) => {
    if (!character) return;

    setError(null);
    setSuccess(null);

    const result = await applyForJob(character.id, jobId);

    if (result.success) {
      setSuccess(result.message || 'Job application successful!');
      await refreshCharacter();
      loadJobs();
    } else {
      setError(result.error || 'Failed to apply for job');
    }
  };

  const handleWork = async () => {
    if (!character) return;

    setError(null);
    setSuccess(null);
    setIsWorking(true);

    const result = await doWork(character.id);

    if (result.success) {
      setSuccess(result.message || 'Work completed!');
      await refreshCharacter();
    } else {
      setError(result.error || 'Failed to complete work');
    }

    setIsWorking(false);
  };

  const handleQuitJob = async () => {
    if (!character || !confirm('Are you sure you want to quit your job?')) return;

    setError(null);
    setSuccess(null);

    const result = await quitJob(character.id);

    if (result.success) {
      setSuccess(result.message || 'You quit your job');
      await refreshCharacter();
      loadJobs();
    } else {
      setError(result.error || 'Failed to quit job');
    }
  };

  const handleChangeWorkEthic = async (ethic: any) => {
    if (!character) return;

    setError(null);
    const result = await changeWorkEthic(character.id, ethic);

    if (result.success) {
      setSuccess(result.message || 'Work ethic updated');
      await refreshCharacter();
    } else {
      setError(result.error || 'Failed to change work ethic');
    }
  };

  const handleRequestPromotion = async () => {
    if (!character) return;

    setError(null);
    setSuccess(null);

    const result = await requestPromotion(character.id);

    if (result.success) {
      setSuccess(result.message || 'Promotion granted!');
      await refreshCharacter();
      loadJobs();
    } else {
      setError(result.error || 'Failed to request promotion');
    }
  };

  if (!character) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#888]">Loading...</div>
      </div>
    );
  }

  // Group jobs by category
  const jobsByCategory = availableJobs.reduce((acc, job) => {
    const category = job.category || 'OTHER';
    if (!acc[category]) acc[category] = [];
    acc[category].push(job);
    return acc;
  }, {} as Record<string, Job[]>);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="ls-section">
        <div className="ls-section-header">
          <Briefcase className="w-5 h-5 inline mr-2" />
          Employment Center
        </div>
        <div className="ls-section-content">
          <p className="text-sm text-[#888]">
            Find a legitimate job, earn salary, and climb the career ladder
          </p>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-[#d9534f]/10 border border-[#d9534f] text-[#d9534f] px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-[#5cb85c]/10 border border-[#5cb85c] text-[#5cb85c] px-4 py-3 text-sm">
          {success}
        </div>
      )}

      {/* Current Job */}
      {currentJob && (
        <div className="ls-section">
          <div className="ls-section-header">Current Job</div>
          <div className="ls-section-content space-y-4">
            {/* Job Info */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#fff] mb-1">{currentJob.title}</h3>
                <p className="text-sm text-[#888] mb-3">{currentJob.description}</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-sm">
                    <span className="text-[#888]">Annual Salary:</span>{' '}
                    <span className="text-[#5cb85c] font-bold">
                      ${currentJob.annualSalary.toLocaleString()}/year
                    </span>
                  </span>
                  <span className="text-sm">
                    <span className="text-[#888]">Years:</span>{' '}
                    <span className="text-[#f0ad4e]">{character.yearsInJob.toFixed(1)}</span>
                  </span>
                  <span className="text-sm">
                    <span className="text-[#888]">Performance:</span>{' '}
                    <span
                      className={
                        character.performanceRating >= 80
                          ? 'text-[#5cb85c]'
                          : character.performanceRating >= 60
                          ? 'text-[#f0ad4e]'
                          : 'text-[#d9534f]'
                      }
                    >
                      {character.performanceRating}%
                    </span>
                  </span>
                </div>
              </div>
              <button onClick={handleQuitJob} className="ls-btn ls-btn-danger text-xs">
                <X className="w-4 h-4 inline mr-1" />
                Quit
              </button>
            </div>

            {/* Work Ethic Selector */}
            <div>
              <div className="ls-info-label mb-2">Work Ethic</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {WORK_ETHICS.map((ethic) => (
                  <button
                    key={ethic.value}
                    onClick={() => handleChangeWorkEthic(ethic.value)}
                    className={`p-3 border-2 transition-all ${
                      character.workEthic === ethic.value
                        ? 'border-[#5cb85c] bg-[#5cb85c]/10'
                        : 'border-[#333] hover:border-[#555]'
                    }`}
                  >
                    <div className="text-2xl mb-1">{ethic.icon}</div>
                    <div className="text-xs font-bold text-[#fff]">{ethic.label}</div>
                    <div className="text-xs text-[#888]">{ethic.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Work Button */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleWork}
                disabled={isWorking || character.energy < currentJob.energyPerWork}
                className="ls-btn ls-btn-success p-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isWorking ? (
                  <span>Working...</span>
                ) : (
                  <span>
                    💼 Work (${Math.floor(currentJob.annualSalary / 365).toLocaleString()}/day)
                  </span>
                )}
              </button>

              {/* Promotion Button */}
              {currentJob.nextJobId && (
                <button
                  onClick={handleRequestPromotion}
                  disabled={
                    character.yearsInJob < currentJob.yearsForPromotion ||
                    character.performanceRating < currentJob.minPerformance
                  }
                  className="ls-btn ls-btn-primary p-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Star className="w-5 h-5 inline mr-2" />
                  Request Promotion
                </button>
              )}
            </div>

            {/* Promotion Requirements */}
            {currentJob.nextJobId && (
              <div className="p-4 bg-[#1a1a1a] border border-[#333]">
                <div className="text-xs text-[#888] space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Years Required:</span>
                    <span
                      className={
                        character.yearsInJob >= currentJob.yearsForPromotion
                          ? 'text-[#5cb85c]'
                          : 'text-[#f0ad4e]'
                      }
                    >
                      {character.yearsInJob.toFixed(1)} / {currentJob.yearsForPromotion}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Performance Required:</span>
                    <span
                      className={
                        character.performanceRating >= currentJob.minPerformance
                          ? 'text-[#5cb85c]'
                          : 'text-[#d9534f]'
                      }
                    >
                      {character.performanceRating}% / {currentJob.minPerformance}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Work Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-[#1a1a1a] border border-[#333]">
                <div className="text-xs text-[#888] mb-1">Energy Cost</div>
                <div className="text-sm font-bold text-[#f0ad4e]">
                  {currentJob.energyPerWork} ⚡
                </div>
              </div>
              <div className="p-3 bg-[#1a1a1a] border border-[#333]">
                <div className="text-xs text-[#888] mb-1">XP per Work</div>
                <div className="text-sm font-bold text-[#5cb85c]">
                  {currentJob.experiencePerWork} XP
                </div>
              </div>
              <div className="p-3 bg-[#1a1a1a] border border-[#333]">
                <div className="text-xs text-[#888] mb-1">Daily Pay</div>
                <div className="text-sm font-bold text-[#5cb85c]">
                  ${Math.floor(currentJob.annualSalary / 365).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Available Jobs */}
      <div className="ls-section">
        <div className="ls-section-header">
          {currentJob ? 'Other Available Jobs' : 'Available Jobs'}
        </div>
        <div className="ls-section-content">
          {isLoading ? (
            <div className="text-center py-8 text-[#888]">Loading jobs...</div>
          ) : availableJobs.length === 0 ? (
            <div className="text-center py-8 text-[#888]">
              <p className="mb-2">No jobs available!</p>
              <p className="text-xs">
                Level up or complete education requirements to unlock more jobs.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(jobsByCategory).map(([category, jobs]) => (
                <div key={category}>
                  <h3 className="text-sm font-bold text-[#888] uppercase tracking-wider mb-3">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobs.map((job) => {
                      const isCurrentJob = currentJob?.id === job.id;

                      return (
                        <div
                          key={job.id}
                          className={`p-4 border-2 transition-all ${
                            isCurrentJob
                              ? 'border-[#5cb85c] bg-[#5cb85c]/5'
                              : 'border-[#333] bg-[#1a1a1a]'
                          }`}
                        >
                          {/* Job Title */}
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-bold text-[#fff] mb-1">{job.title}</h4>
                              <p className="text-xs text-[#888] line-clamp-2">
                                {job.description}
                              </p>
                            </div>
                            {isCurrentJob && (
                              <span className="ml-2 px-2 py-1 bg-[#5cb85c] text-[#000] text-xs font-bold">
                                CURRENT
                              </span>
                            )}
                          </div>

                          {/* Salary & XP */}
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[#888]">
                                <DollarSign className="w-4 h-4 inline" /> Salary:
                              </span>
                              <span className="text-[#5cb85c] font-bold">
                                ${job.annualSalary.toLocaleString()}/yr
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[#888]">
                                <TrendingUp className="w-4 h-4 inline" /> XP:
                              </span>
                              <span className="text-[#f0ad4e]">{job.experiencePerWork}/work</span>
                            </div>
                          </div>

                          {/* Requirements */}
                          <div className="space-y-1 mb-3 text-xs">
                            {job.requiredLevel > 1 && (
                              <div className="flex items-center justify-between">
                                <span className="text-[#888]">Level:</span>
                                <span
                                  className={
                                    character.level >= job.requiredLevel
                                      ? 'text-[#5cb85c]'
                                      : 'text-[#d9534f]'
                                  }
                                >
                                  {character.level} / {job.requiredLevel}
                                </span>
                              </div>
                            )}
                            {job.requiredEducation && job.requiredEducation !== 'NONE' && (
                              <div className="flex items-center justify-between">
                                <span className="text-[#888]">Education:</span>
                                <span className="text-[#888]">
                                  {EDUCATION_LABELS[job.requiredEducation]}
                                </span>
                              </div>
                            )}
                            {job.requiredMajor && (
                              <div className="flex items-center justify-between">
                                <span className="text-[#888]">Major:</span>
                                <span className="text-[#888]">
                                  {job.requiredMajor}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Apply Button */}
                          {isCurrentJob ? (
                            <div className="text-center text-xs text-[#5cb85c] py-2 border border-[#5cb85c]">
                              ✓ YOUR CURRENT JOB
                            </div>
                          ) : (
                            <button
                              onClick={() => handleApply(job.id)}
                              className="ls-btn ls-btn-primary w-full text-xs"
                            >
                              APPLY
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
