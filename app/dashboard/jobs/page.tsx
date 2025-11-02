'use client';

/**
 * Jobs Page
 *
 * Players can:
 * - Browse available jobs
 * - Apply for jobs
 * - Work shifts (4h, 8h, 12h)
 * - View job history
 * - Quit current job
 */

import { useEffect, useState } from 'react';
import { useCharacterStore } from '@/lib/character-store';
import {
  getAvailableJobs,
  applyForJob,
  startWorkShift,
  completeWorkShift,
  quitJob,
  getCurrentShiftStatus,
} from '@/actions/jobs';
import { Briefcase, Clock, Zap, TrendingUp, DollarSign, X } from 'lucide-react';
import type { Job } from '@prisma/client';

export default function JobsPage() {
  const { character, refreshCharacter } = useCharacterStore();
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentShift, setCurrentShift] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (character) {
      loadJobs();
      checkShiftStatus();
    }
  }, [character]);

  // Poll for shift completion every 10 seconds
  useEffect(() => {
    if (currentShift?.isWorking) {
      const interval = setInterval(() => {
        checkShiftStatus();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [currentShift]);

  const loadJobs = async () => {
    if (!character) return;

    setIsLoading(true);
    const result = await getAvailableJobs(character.id);

    if (result.success) {
      setAvailableJobs(result.data.available);
    } else {
      setError(result.error || 'Failed to load jobs');
    }

    setIsLoading(false);
  };

  const checkShiftStatus = async () => {
    if (!character) return;

    const result = await getCurrentShiftStatus(character.id);

    if (result.success) {
      setCurrentShift(result.data);

      // Auto-complete if shift is done
      if (result.data.isWorking && result.data.isComplete) {
        handleCompleteShift(result.data.shift.id);
      }
    }
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

  const handleStartShift = async (hours: number) => {
    if (!character) return;

    setError(null);
    setSuccess(null);

    const result = await startWorkShift(character.id, hours);

    if (result.success) {
      setSuccess(result.message || 'Shift started!');
      await refreshCharacter();
      checkShiftStatus();
    } else {
      setError(result.error || 'Failed to start shift');
    }
  };

  const handleCompleteShift = async (jobHistoryId: string) => {
    if (!character) return;

    const result = await completeWorkShift(character.id, jobHistoryId);

    if (result.success) {
      setSuccess(result.message || 'Shift completed!');
      await refreshCharacter();
      setCurrentShift(null);
    } else {
      setError(result.error || 'Failed to complete shift');
    }
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

  if (!character) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#888]">Loading...</div>
      </div>
    );
  }

  const currentJob = character.currentJob;

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
            Work legitimate jobs to earn clean money and gain experience
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

      {/* Current Job & Shift Status */}
      {currentJob && (
        <div className="ls-section">
          <div className="ls-section-header">Current Employment</div>
          <div className="ls-section-content">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#fff] mb-1">{currentJob.title}</h3>
                <p className="text-sm text-[#888] mb-2">{currentJob.description}</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-sm text-[#5cb85c]">
                    <DollarSign className="w-4 h-4 inline" /> ${currentJob.hourlyRate}/hour
                  </span>
                  <span className="text-sm text-[#f0ad4e]">
                    <TrendingUp className="w-4 h-4 inline" /> {currentJob.experiencePerHour} XP/hour
                  </span>
                </div>
              </div>
              <button onClick={handleQuitJob} className="ls-btn ls-btn-danger text-xs">
                <X className="w-4 h-4 inline mr-1" />
                Quit
              </button>
            </div>

            {/* Active Shift */}
            {currentShift?.isWorking ? (
              <div className="p-4 bg-[#5cb85c]/10 border border-[#5cb85c]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[#5cb85c]">🟢 SHIFT IN PROGRESS</span>
                  <span className="text-xs text-[#888]">
                    {currentShift.shift.hoursWorked}h shift
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#1a1a1a] h-2 mb-2">
                  <div
                    className="bg-[#5cb85c] h-2 transition-all"
                    style={{
                      width: `${Math.min(100, ((Date.now() - new Date(currentShift.shift.startedAt).getTime()) / currentShift.timeRemaining) * 100)}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#888]">
                    Expected: ${currentShift.expectedPay.toLocaleString()} + {currentShift.expectedXP} XP
                  </span>
                  {currentShift.isComplete ? (
                    <button
                      onClick={() => handleCompleteShift(currentShift.shift.id)}
                      className="ls-btn ls-btn-success text-xs"
                    >
                      Complete Shift
                    </button>
                  ) : (
                    <span className="text-[#888]">
                      {Math.ceil(currentShift.timeRemaining / 60000)} min remaining
                    </span>
                  )}
                </div>
              </div>
            ) : (
              // Start New Shift
              <div>
                <div className="ls-info-label mb-2">Start New Shift</div>
                <div className="grid grid-cols-3 gap-3">
                  {(currentJob.shiftDurations as number[]).map((hours) => {
                    const energyNeeded = hours * currentJob.energyCostPerHour;
                    const canAfford = character.energy >= energyNeeded;

                    return (
                      <button
                        key={hours}
                        onClick={() => handleStartShift(hours)}
                        disabled={!canAfford}
                        className={`p-4 border-2 transition-all ${
                          canAfford
                            ? 'border-[#5cb85c] hover:bg-[#5cb85c]/10 cursor-pointer'
                            : 'border-[#333] opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="text-2xl font-bold text-[#fff] mb-1">{hours}h</div>
                        <div className="text-xs text-[#888] space-y-1">
                          <div>💰 ${(currentJob.hourlyRate * hours).toLocaleString()}</div>
                          <div>⚡ -{energyNeeded} energy</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
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
              No jobs available. Level up or improve your skills to unlock more jobs!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableJobs.map((job) => {
                const requiredSkills = job.requiredSkills as Record<string, number>;
                const hasSkills =
                  !requiredSkills ||
                  Object.keys(requiredSkills).length === 0 ||
                  Object.entries(requiredSkills).every(
                    ([skill, required]) => (character as any)[skill] >= required
                  );

                return (
                  <div key={job.id} className="p-4 bg-[#1a1a1a] border border-[#333]">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-[#fff]">{job.title}</h3>
                        <p className="text-xs text-[#888]">{job.category}</p>
                      </div>
                      <span className="px-2 py-1 bg-[#5cb85c]/20 border border-[#5cb85c] text-[#5cb85c] text-xs">
                        LVL {job.requiredLevel}+
                      </span>
                    </div>

                    <p className="text-xs text-[#d0d0d0] mb-3">{job.description}</p>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#888]">Hourly Rate:</span>
                        <span className="text-[#5cb85c] font-bold">${job.hourlyRate}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#888]">XP/Hour:</span>
                        <span className="text-[#f0ad4e]">{job.experiencePerHour}</span>
                      </div>
                      {requiredSkills && Object.keys(requiredSkills).length > 0 && (
                        <div className="text-xs">
                          <span className="text-[#888]">Required Skills:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Object.entries(requiredSkills).map(([skill, required]) => {
                              const has = (character as any)[skill] >= required;
                              return (
                                <span
                                  key={skill}
                                  className={`px-2 py-1 ${
                                    has
                                      ? 'bg-[#5cb85c]/20 text-[#5cb85c]'
                                      : 'bg-[#d9534f]/20 text-[#d9534f]'
                                  }`}
                                >
                                  {skill}: {(character as any)[skill]}/{required}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {currentJob?.id === job.id ? (
                      <div className="text-center text-xs text-[#5cb85c] py-2 border border-[#5cb85c]">
                        ✓ CURRENT JOB
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApply(job.id)}
                        disabled={!hasSkills || character.level < job.requiredLevel}
                        className="ls-btn ls-btn-primary w-full text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {!hasSkills || character.level < job.requiredLevel
                          ? 'NOT QUALIFIED'
                          : 'APPLY'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
