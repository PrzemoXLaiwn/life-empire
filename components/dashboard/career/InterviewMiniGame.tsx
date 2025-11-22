'use client';

/**
 * Interview Mini-Game - Job Interview Simulation
 * 
 * Features:
 * - 5 simulated interview questions
 * - 3 response options per question (Honest, Confident, Charm)
 * - Success chance shown upfront
 * - RNG-based results
 * - Final score (0-100)
 */

import { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  CheckCircle, 
  XCircle,
  Clock,
  TrendingUp,
  Sparkles,
  Shield
} from 'lucide-react';
import type { Job } from '@prisma/client';

interface InterviewMiniGameProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
  character: any;
  suspicionLevel: number;
  cvData: any;
  onComplete: (score: number, passed: boolean) => void;
}

interface Question {
  id: number;
  topic: string;
  description: string;
}

interface Answer {
  type: 'honest' | 'confident' | 'charm';
  label: string;
  description: string;
  icon: string;
}

const INTERVIEW_QUESTIONS: Question[] = [
  {
    id: 1,
    topic: 'Experience',
    description: 'Tell me about your relevant work experience...',
  },
  {
    id: 2,
    topic: 'Skills',
    description: 'How would you rate your technical skills?',
  },
  {
    id: 3,
    topic: 'Challenges',
    description: 'Describe a difficult situation you handled...',
  },
  {
    id: 4,
    topic: 'Teamwork',
    description: 'How do you work with others in a team?',
  },
  {
    id: 5,
    topic: 'Goals',
    description: 'Where do you see yourself in 5 years?',
  },
];

export default function InterviewMiniGame({
  isOpen,
  onClose,
  job,
  character,
  suspicionLevel,
  cvData,
  onComplete,
}: InterviewMiniGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerSuccess, setLastAnswerSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset state
      setCurrentQuestion(0);
      setScore(0);
      setAnswers([]);
      setShowResult(false);
      setLastAnswerSuccess(null);
    }
  }, [isOpen]);

  const calculateSuccessChance = (answerType: 'honest' | 'confident' | 'charm'): number => {
    let baseChance = 50;

    switch (answerType) {
      case 'honest':
        // Safe option - based on real skills
        baseChance = 70;
        // If you lied on CV, honest answers are still okay
        baseChance -= suspicionLevel * 0.1; // Slight penalty
        break;

      case 'confident':
        // Risky option - hard if you lied
        baseChance = 60;
        // Heavy penalty if you lied
        baseChance -= suspicionLevel * 0.5; // Major penalty
        // Bonus if you have real skills
        const skillValues = Object.values(cvData.realSkills) as number[];
        const avgSkill = skillValues.length > 0 
          ? skillValues.reduce((a, b) => a + b, 0) / skillValues.length 
          : 0;
        baseChance += avgSkill * 0.2;
        break;

      case 'charm':
        // Charisma-based option
        baseChance = 50;
        // Based on charisma stat
        baseChance += character.charisma * 0.5;
        // Small penalty for suspicion
        baseChance -= suspicionLevel * 0.2;
        break;
    }

    return Math.max(10, Math.min(90, Math.floor(baseChance)));
  };

  const handleAnswer = (answerType: 'honest' | 'confident' | 'charm') => {
    const successChance = calculateSuccessChance(answerType);
    const success = Math.random() * 100 < successChance;

    // Calculate points for this answer
    let points = 0;
    if (success) {
      points = answerType === 'honest' ? 15 : answerType === 'confident' ? 25 : 18;
    } else {
      points = answerType === 'honest' ? 8 : answerType === 'confident' ? 0 : 5;
    }

    const newScore = score + points;
    setScore(newScore);
    setAnswers([...answers, answerType]);
    setLastAnswerSuccess(success);

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < INTERVIEW_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setLastAnswerSuccess(null);
      } else {
        // Interview complete
        setShowResult(true);
      }
    }, 1500);
  };

  const getFinalResult = () => {
    if (score >= 80) return { label: 'Excellent!', color: 'text-[#5cb85c]', passed: true };
    if (score >= 60) return { label: 'Good', color: 'text-[#5cb85c]', passed: true };
    if (score >= 40) return { label: 'Average', color: 'text-[#f0ad4e]', passed: Math.random() < 0.5 };
    return { label: 'Poor', color: 'text-[#d9534f]', passed: false };
  };

  const handleComplete = () => {
    const result = getFinalResult();
    onComplete(score, result.passed);
  };

  if (!isOpen) return null;

  const question = INTERVIEW_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / INTERVIEW_QUESTIONS.length) * 100;

  const answerOptions: Answer[] = [
    {
      type: 'honest',
      label: '😊 Be Honest',
      description: 'Safe choice, matches your real skills',
      icon: '✅',
    },
    {
      type: 'confident',
      label: '😎 Confident (Bluff)',
      description: suspicionLevel > 20 ? 'Risky! You lied on CV, hard to back up' : 'Show confidence in your abilities',
      icon: '💪',
    },
    {
      type: 'charm',
      label: '💬 Use Charm',
      description: 'Use your charisma and personality',
      icon: '✨',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0a0a] border-2 border-[#5cb85c] max-w-2xl w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border-b border-[#333] p-4">
          <h2 className="text-2xl font-bold text-[#fff] flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-[#5cb85c]" />
            🎤 JOB INTERVIEW
          </h2>
          <p className="text-sm text-[#888] mt-1">
            {job.title} - TechCorp Industries
          </p>
        </div>

        {!showResult ? (
          <div className="p-6 space-y-6">
            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-[#888]">
                  Interview Progress: Question {currentQuestion + 1}/{INTERVIEW_QUESTIONS.length}
                </span>
                <span className="text-[#5cb85c] font-bold">
                  Current Score: {score}/100
                </span>
              </div>
              <div className="w-full bg-[#1a1a1a] h-3 border border-[#333]">
                <div 
                  className="bg-[#5cb85c] h-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="bg-[#0f0f0f] border border-[#333] p-6">
              <div className="text-xs text-[#888] mb-2">INTERVIEWER ASKS:</div>
              <h3 className="text-lg font-bold text-[#fff] mb-1">
                "{question.description}"
              </h3>
              <div className="text-sm text-[#666] mt-2">
                Topic: {question.topic}
              </div>
            </div>

            {/* Last Answer Result */}
            {lastAnswerSuccess !== null && (
              <div className={`p-4 border-2 ${
                lastAnswerSuccess 
                  ? 'bg-[#5cb85c]/10 border-[#5cb85c]' 
                  : 'bg-[#d9534f]/10 border-[#d9534f]'
              }`}>
                <div className="flex items-center gap-2">
                  {lastAnswerSuccess ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-[#5cb85c]" />
                      <span className="text-[#5cb85c] font-bold">Good answer! The interviewer seems impressed.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-[#d9534f]" />
                      <span className="text-[#d9534f] font-bold">Weak answer. The interviewer looks skeptical.</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Answer Options */}
            {lastAnswerSuccess === null && (
              <div className="space-y-3">
                <div className="text-sm text-[#888] mb-3">Choose your approach:</div>
                
                {answerOptions.map((option) => {
                  const successChance = calculateSuccessChance(option.type);
                  
                  return (
                    <button
                      key={option.type}
                      onClick={() => handleAnswer(option.type)}
                      className="w-full p-4 bg-[#0f0f0f] border-2 border-[#333] hover:border-[#5cb85c] transition-all text-left group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{option.icon}</span>
                          <span className="font-bold text-[#fff] group-hover:text-[#5cb85c]">
                            {option.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            successChance >= 70 ? 'text-[#5cb85c]' :
                            successChance >= 50 ? 'text-[#f0ad4e]' :
                            'text-[#d9534f]'
                          }`}>
                            {successChance}%
                          </div>
                          <div className="text-xs text-[#888]">Success</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-[#888] mb-2">
                        {option.description}
                      </div>
                      
                      {/* Success bar */}
                      <div className="w-full bg-[#1a1a1a] h-2">
                        <div 
                          className={`h-full ${
                            successChance >= 70 ? 'bg-[#5cb85c]' :
                            successChance >= 50 ? 'bg-[#f0ad4e]' :
                            'bg-[#d9534f]'
                          }`}
                          style={{ width: `${successChance}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Final Result */
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold mb-3 ${getFinalResult().color}`}>
                {score}/100
              </div>
              <div className={`text-2xl font-bold mb-2 ${getFinalResult().color}`}>
                {getFinalResult().label}
              </div>
              <div className="text-sm text-[#888]">
                Interview Performance
              </div>
            </div>

            {/* Result Details */}
            <div className="bg-[#0f0f0f] border border-[#333] p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#888]">Questions Answered:</span>
                <span className="text-[#fff] font-bold">{INTERVIEW_QUESTIONS.length}/5</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#888]">Final Score:</span>
                <span className={`font-bold ${getFinalResult().color}`}>{score}/100</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#888]">Result:</span>
                <span className={`font-bold ${getFinalResult().passed ? 'text-[#5cb85c]' : 'text-[#d9534f]'}`}>
                  {getFinalResult().passed ? '✅ HIRED!' : '❌ REJECTED'}
                </span>
              </div>
            </div>

            {/* Special Offer (15% chance if high suspicion and passed) */}
            {getFinalResult().passed && suspicionLevel >= 60 && Math.random() < 0.15 && (
              <div className="bg-[#f0ad4e]/10 border-2 border-[#f0ad4e] p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-[#f0ad4e] flex-shrink-0" />
                  <div>
                    <div className="text-lg font-bold text-[#f0ad4e] mb-2">
                      🎉 AMAZING NEWS!
                    </div>
                    <div className="text-sm text-[#fff] mb-2">
                      We're impressed with your experience! We'd like to offer you a SENIOR position instead!
                    </div>
                    <div className="text-xs text-[#888]">
                      ⚠️ But you'll be on extended probation (45 days, 80%+ performance required)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Probation Warning */}
            {getFinalResult().passed && suspicionLevel > 20 && (
              <div className="bg-[#d9534f]/10 border border-[#d9534f] p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#d9534f] flex-shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-[#d9534f] mb-1">
                      ⚠️ PROBATION PERIOD REQUIRED
                    </div>
                    <div className="text-xs text-[#888]">
                      {suspicionLevel <= 40 && 'Your CV raised some questions. 15 days probation, 70%+ performance required.'}
                      {suspicionLevel > 40 && suspicionLevel <= 60 && 'Your CV raised concerns. 30 days probation, 75%+ performance required.'}
                      {suspicionLevel > 60 && 'Your CV raised serious questions. 45 days probation, 80%+ performance required.'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleComplete}
              className="w-full px-6 py-4 bg-[#5cb85c] hover:bg-[#4a9d4a] text-[#000] font-bold text-lg transition-colors"
            >
              {getFinalResult().passed ? '✅ Accept Job Offer' : '❌ Close'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
