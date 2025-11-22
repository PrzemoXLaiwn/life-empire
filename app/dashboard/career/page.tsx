'use client';

/**
 * Main Career Page - Complete Career System
 * 
 * Integrates all career components:
 * - CareerSidebar (navigation)
 * - JobMarketBrowser (browse & apply for jobs)
 * - CurrentJobPanel (manage current job)
 * - CareerProgressionPanel (coming soon)
 * - WorkplaceRelationsPanel (coming soon)
 */

import { useEffect, useState } from 'react';
import { useCharacterStore } from '@/lib/character-store';
import { getAvailableJobs, applyForJob, doWork, quitJob, getCareerLadder } from '@/actions/jobs';
import { getWorkRelationships, interactWithCoworker } from '@/actions/career';
import CareerSidebar from '@/components/dashboard/career/CareerSidebar';
import JobMarketBrowser from '@/components/dashboard/career/JobMarketBrowser';
import CurrentJobPanel from '@/components/dashboard/career/CurrentJobPanel';
import FullTimeJobPanel from '@/components/dashboard/career/FullTimeJobPanel';
import CareerProgressionPanel from '@/components/dashboard/career/CareerProgressionPanel';
import WorkplaceRelationsPanel from '@/components/dashboard/career/WorkplaceRelationsPanel';
import InterviewMiniGame from '@/components/dashboard/career/InterviewMiniGame';
import { Briefcase, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Job } from '@prisma/client';
import type { CVData } from '@/components/dashboard/career/CVBuilderModal';

export default function CareerPage() {
  const { character, refreshCharacter } = useCharacterStore();
  const [activeSection, setActiveSection] = useState('full-time');
  const [fullTimeSubsection, setFullTimeSubsection] = useState<string | null>(null);
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [nextJob, setNextJob] = useState<Job | null>(null);
  const [careerLadder, setCareerLadder] = useState<Job[]>([]);
  const [workRelationships, setWorkRelationships] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  
  // Interview state
  const [showInterview, setShowInterview] = useState(false);
  const [interviewJob, setInterviewJob] = useState<Job | null>(null);
  const [interviewCVData, setInterviewCVData] = useState<CVData | null>(null);
  const [interviewSuspicion, setInterviewSuspicion] = useState(0);

  useEffect(() => {
    if (character) {
      loadJobs();
      loadWorkRelationships();
    }
  }, [character]);

  const loadJobs = async () => {
    if (!character) return;

    setIsLoading(true);
    try {
      const result = await getAvailableJobs(character.id);

      if (result.success) {
        setAvailableJobs(result.data.available);
        setCurrentJob(result.data.currentJob);

        // Load career ladder if has job
        if (result.data.currentJob) {
          const ladderResult = await getCareerLadder(result.data.currentJob.id);
          if (ladderResult.success) {
            setCareerLadder(ladderResult.data.ladder);
            
            // Find next job in ladder
            const currentIndex = ladderResult.data.ladder.findIndex((j: Job) => j.id === result.data.currentJob.id);
            if (currentIndex >= 0 && currentIndex < ladderResult.data.ladder.length - 1) {
              setNextJob(ladderResult.data.ladder[currentIndex + 1]);
            } else {
              setNextJob(null);
            }
          }
        }
      } else {
        toast.error(result.error || 'Failed to load jobs');
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      toast.error('Failed to load jobs');
    }
    setIsLoading(false);
  };

  const loadWorkRelationships = async () => {
    if (!character) return;

    try {
      const result = await getWorkRelationships(character.id);
      if (result.success) {
        setWorkRelationships(result.data.coworkers);
      }
    } catch (error) {
      console.error('Error loading work relationships:', error);
    }
  };

  const handleApply = async (jobId: string, cvData: CVData, suspicionLevel: number) => {
    if (!character) return;

    // Find the job
    const job = availableJobs.find(j => j.id === jobId);
    if (!job) {
      toast.error('Job not found');
      return;
    }

    // Check if CV will be reviewed (higher suspicion = better chance)
    const reviewChance = Math.min(95, 50 + suspicionLevel * 0.5);
    const cvReviewed = Math.random() * 100 < reviewChance;

    if (!cvReviewed) {
      toast.error('Your application was not reviewed. Try improving your CV!');
      return;
    }

    // CV was reviewed - schedule interview
    toast.success('✅ Your CV was reviewed! Interview scheduled.');
    
    // Open interview modal
    setInterviewJob(job);
    setInterviewCVData(cvData);
    setInterviewSuspicion(suspicionLevel);
    setShowInterview(true);
  };

  const handleInterviewComplete = async (score: number, passed: boolean) => {
    if (!character || !interviewJob) return;

    setShowInterview(false);

    if (!passed) {
      toast.error('Interview failed. Better luck next time!');
      setInterviewJob(null);
      setInterviewCVData(null);
      return;
    }

    // Determine probation based on suspicion
    let probationDays = 0;
    let probationPerformance = 75;
    let liedOnResume = interviewSuspicion > 20;

    if (interviewSuspicion > 60) {
      probationDays = 45;
      probationPerformance = 80;
    } else if (interviewSuspicion > 40) {
      probationDays = 30;
      probationPerformance = 75;
    } else if (interviewSuspicion > 20) {
      probationDays = 15;
      probationPerformance = 70;
    }

    // Apply for job with probation data
    setIsApplying(true);
    try {
      const result = await applyForJob(character.id, interviewJob.id);

      if (result.success) {
        let message = `🎉 Congratulations! You got the job: ${interviewJob.title}!`;
        
        if (probationDays > 0) {
          message += `\n\n⚠️ PROBATION: ${probationDays} days, ${probationPerformance}%+ performance required`;
        }
        
        toast.success(message);
        await refreshCharacter();
        await loadJobs();
        setFullTimeSubsection('current-job');
      } else {
        toast.error(result.error || 'Failed to finalize job offer');
      }
    } catch (error) {
      console.error('Error finalizing job:', error);
      toast.error('Failed to finalize job offer');
    }
    
    setIsApplying(false);
    setInterviewJob(null);
    setInterviewCVData(null);
  };

  const handleWork = async () => {
    if (!character) return;

    setIsWorking(true);
    try {
      const result = await doWork(character.id);

      if (result.success) {
        toast.success(result.message || 'Work completed!');
        await refreshCharacter();
        await loadJobs();
      } else {
        toast.error(result.error || 'Failed to complete work');
      }
    } catch (error) {
      console.error('Error working:', error);
      toast.error('Failed to complete work');
    }
    setIsWorking(false);
  };

  const handleQuitJob = async () => {
    if (!character || !confirm('Are you sure you want to quit your job?')) return;

    try {
      const result = await quitJob(character.id);

      if (result.success) {
        toast.success(result.message || 'You quit your job');
        await refreshCharacter();
        await loadJobs();
        // Reset to main Full-Time menu after quitting
        setFullTimeSubsection(null);
      } else {
        toast.error(result.error || 'Failed to quit job');
      }
    } catch (error) {
      console.error('Error quitting job:', error);
      toast.error('Failed to quit job');
    }
  };

  const handleRequestDayOff = () => {
    toast('Day off request feature coming soon!', { icon: '📅' });
  };

  const handleRequestRaise = () => {
    toast('Raise request feature coming soon!', { icon: '💰' });
  };

  const handleRequestPromotion = async () => {
    if (!character) return;

    try {
      const { requestPromotion } = await import('@/actions/jobs');
      const result = await requestPromotion(character.id);

      if (result.success) {
        toast.success(result.message || 'Promotion granted!');
        await refreshCharacter();
        await loadJobs();
      } else {
        toast.error(result.error || 'Failed to request promotion');
      }
    } catch (error) {
      console.error('Error requesting promotion:', error);
      toast.error('Failed to request promotion');
    }
  };

  const handleCoworkerInteraction = async (relationshipId: string, action: string) => {
    if (!character) return;

    try {
      const result = await interactWithCoworker(character.id, relationshipId, action as any);
      
      if (result.success) {
        toast.success(result.message || 'Interaction successful!');
        await loadWorkRelationships();
        await refreshCharacter();
      } else {
        toast.error(result.error || 'Interaction failed');
      }
    } catch (error) {
      console.error('Error with coworker interaction:', error);
      toast.error('Interaction failed');
    }
  };

  if (!character) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 text-[#5cb85c] animate-spin" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'full-time':
        // If no subsection selected, show the 4 options
        if (!fullTimeSubsection) {
          return (
            <FullTimeJobPanel
              hasJob={!!currentJob}
              daysEmployed={Math.floor((character?.yearsInJob || 0) * 365)}
              onSelectSubsection={setFullTimeSubsection}
            />
          );
        }

        // Render selected subsection
        switch (fullTimeSubsection) {
          case 'browse-market':
            return (
              <div className="space-y-4">
                <button
                  onClick={() => setFullTimeSubsection(null)}
                  className="text-sm text-[#888] hover:text-[#fff] transition-colors"
                >
                  ← Back to Full-Time Options
                </button>
                <JobMarketBrowser
                  jobs={availableJobs}
                  character={character}
                  onApply={handleApply}
                  isApplying={isApplying}
                />
                
                {/* Interview Modal */}
                {showInterview && interviewJob && interviewCVData && (
                  <InterviewMiniGame
                    isOpen={showInterview}
                    onClose={() => {
                      setShowInterview(false);
                      setInterviewJob(null);
                      setInterviewCVData(null);
                    }}
                    job={interviewJob}
                    character={character}
                    suspicionLevel={interviewSuspicion}
                    cvData={interviewCVData}
                    onComplete={handleInterviewComplete}
                  />
                )}
              </div>
            );

          case 'current-job':
            return currentJob ? (
              <div className="space-y-4">
                <button
                  onClick={() => setFullTimeSubsection(null)}
                  className="text-sm text-[#888] hover:text-[#fff] transition-colors"
                >
                  ← Back to Full-Time Options
                </button>
                <CurrentJobPanel
                  job={currentJob}
                  character={character}
                  onWork={handleWork}
                  onRequestDayOff={handleRequestDayOff}
                  onRequestRaise={handleRequestRaise}
                  onRequestPromotion={handleRequestPromotion}
                  onResign={handleQuitJob}
                  isWorking={isWorking}
                />
              </div>
            ) : (
              <div className="bg-[#0a0a0a] border border-[#333] p-6 text-center">
                <p className="text-[#888]">No active job</p>
              </div>
            );

          case 'career-progression':
            return currentJob && careerLadder.length > 0 ? (
              <div className="space-y-4">
                <button
                  onClick={() => setFullTimeSubsection(null)}
                  className="text-sm text-[#888] hover:text-[#fff] transition-colors"
                >
                  ← Back to Full-Time Options
                </button>
                <CareerProgressionPanel
                  currentJob={currentJob}
                  nextJob={nextJob}
                  character={character}
                  careerLadder={careerLadder}
                />
              </div>
            ) : (
              <div className="bg-[#0a0a0a] border border-[#333] p-6 text-center">
                <p className="text-[#888]">No active job</p>
              </div>
            );

          case 'workplace-relations':
            return currentJob ? (
              <div className="space-y-4">
                <button
                  onClick={() => setFullTimeSubsection(null)}
                  className="text-sm text-[#888] hover:text-[#fff] transition-colors"
                >
                  ← Back to Full-Time Options
                </button>
                <WorkplaceRelationsPanel
                  character={character}
                  currentJob={currentJob}
                  relationships={workRelationships}
                  onInteract={handleCoworkerInteraction}
                />
              </div>
            ) : (
              <div className="bg-[#0a0a0a] border border-[#333] p-6 text-center">
                <p className="text-[#888]">No active job</p>
              </div>
            );

          default:
            return null;
        }

      case 'part-time':
        return (
          <div className="bg-[#0a0a0a] border border-[#333] p-12 text-center">
            <h2 className="text-2xl font-bold text-[#fff] mb-3">⏰ Part-Time Jobs</h2>
            <p className="text-[#888] mb-4">Coming soon! Part-time employment system in development.</p>
            <p className="text-xs text-[#666]">
              Part-time jobs will offer flexible hours and the ability to work alongside full-time employment.
            </p>
          </div>
        );

      case 'freelancing':
        return (
          <div className="bg-[#0a0a0a] border border-[#333] p-12 text-center">
            <h2 className="text-2xl font-bold text-[#fff] mb-3">💰 Freelancing & Gigs</h2>
            <p className="text-[#888] mb-4">Coming soon! Freelance work and gig economy features.</p>
            <p className="text-xs text-[#666]">
              Take on project-based work, build your reputation, and be your own boss.
            </p>
          </div>
        );

      case 'self-employed':
        return (
          <div className="bg-[#0a0a0a] border border-[#333] p-12 text-center">
            <h2 className="text-2xl font-bold text-[#fff] mb-3">🏪 Self-Employed Business</h2>
            <p className="text-[#888] mb-4">Coming soon! Start and run your own small business.</p>
            <p className="text-xs text-[#666]">
              Open a shop, provide services, and build your entrepreneurial empire.
            </p>
          </div>
        );

      case 'create-company':
        return (
          <div className="bg-[#0a0a0a] border border-[#333] p-12 text-center">
            <h2 className="text-2xl font-bold text-[#fff] mb-3">🏢 Create Company</h2>
            <p className="text-[#888] mb-4">Coming soon! Build a corporate empire from scratch.</p>
            <p className="text-xs text-[#666]">
              Hire employees, expand operations, and dominate your industry.
            </p>
          </div>
        );

      case 'investments':
        return (
          <div className="bg-[#0a0a0a] border border-[#333] p-12 text-center">
            <h2 className="text-2xl font-bold text-[#fff] mb-3">📈 Investments & Passive Income</h2>
            <p className="text-[#888] mb-4">Coming soon! Invest in stocks, crypto, and real estate.</p>
            <p className="text-xs text-[#666]">
              Build wealth through smart investments and passive income streams.
            </p>
          </div>
        );

      case 'education':
        return (
          <div className="bg-[#0a0a0a] border border-[#333] p-12 text-center">
            <h2 className="text-2xl font-bold text-[#fff] mb-3">🎓 Education & Skills</h2>
            <p className="text-[#888] mb-4">Coming soon! Improve your qualifications and abilities.</p>
            <p className="text-xs text-[#666]">
              Attend university, take courses, and develop skills to unlock better career opportunities.
            </p>
          </div>
        );

      case 'overview':
        return (
          <div className="bg-[#0a0a0a] border border-[#333] p-12 text-center">
            <h2 className="text-2xl font-bold text-[#fff] mb-3">📊 Career Overview</h2>
            <p className="text-[#888] mb-4">Coming soon! View your complete career statistics and history.</p>
            <p className="text-xs text-[#666]">
              Track your earnings, job history, promotions, and career achievements.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#000] p-4">
      <div className="max-w-[1800px] mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#fff] mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-[#5cb85c]" />
            Career Center
          </h1>
          <p className="text-sm text-[#888]">
            Manage your employment, build your career, and achieve financial success
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <CareerSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              hasFullTimeJob={!!currentJob}
              hasPartTimeJob={false}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#5cb85c] animate-spin" />
              </div>
            ) : (
              renderContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
