'use client';

/**
 * Crimes Page
 *
 * Players can:
 * - Browse available crimes by tier
 * - Commit crimes with risk/reward
 * - View crime history
 * - Manage heat level
 * - Pay bail if arrested
 */

import { useEffect, useState } from 'react';
import { useCharacterStore } from '@/lib/character-store';
import {
  getAvailableCrimes,
  commitCrime,
  reduceHeat,
  checkJailStatus,
  payBail,
} from '@/actions/crimes';
import { Target, AlertTriangle, Shield, DollarSign, Zap, Lock } from 'lucide-react';
import type { Crime } from '@prisma/client';

const TIER_COLORS = {
  PETTY: 'text-[#888]',
  MINOR: 'text-[#f0ad4e]',
  MODERATE: 'text-[#5cb85c]',
  SERIOUS: 'text-[#d9534f]',
  MAJOR: 'text-[#d9534f]',
  EXTREME: 'text-[#9b59b6]',
};

export default function CrimesPage() {
  const { character, refreshCharacter } = useCharacterStore();
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [committing, setCommitting] = useState<string | null>(null);
  const [jailStatus, setJailStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (character) {
      loadCrimes();
      checkJail();
    }
  }, [character]);

  const loadCrimes = async () => {
    if (!character) return;

    setIsLoading(true);
    const result = await getAvailableCrimes(character.id);

    if (result.success) {
      setCrimes(result.data.available);
    } else {
      setError(result.error || 'Failed to load crimes');
    }

    setIsLoading(false);
  };

  const checkJail = async () => {
    if (!character) return;

    const result = await checkJailStatus(character.id);

    if (result.success) {
      setJailStatus(result.data);
    }
  };

  const handleCommitCrime = async (crimeId: string) => {
    if (!character || committing) return;

    setCommitting(crimeId);
    setError(null);
    setSuccess(null);

    const result = await commitCrime(character.id, crimeId);

    if (result.success && result.data) {
      const crimeResult = result.data;

      if (crimeResult.success) {
        setSuccess(
          `✅ Crime successful! Earned $${crimeResult.reward.toLocaleString()} (dirty money) and ${crimeResult.experienceGained} XP!`
        );
      } else if (crimeResult.arrested) {
        setError(`🚔 Arrested! You're in jail. ${result.message}`);
      } else if (crimeResult.injured) {
        setError(`⚠️ Failed and got injured! Lost ${crimeResult.healthLost} health.`);
      } else {
        setError(`❌ Crime failed. ${result.message}`);
      }

      await refreshCharacter();
      checkJail();
    } else {
      setError(result.error || 'Failed to commit crime');
    }

    setCommitting(null);
  };

  const handleReduceHeat = async (method: 'bribe' | 'lay_low' | 'lawyer') => {
    if (!character) return;

    setError(null);
    setSuccess(null);

    const result = await reduceHeat(character.id, method);

    if (result.success) {
      setSuccess(result.message || 'Heat reduced!');
      await refreshCharacter();
    } else {
      setError(result.error || 'Failed to reduce heat');
    }
  };

  const handlePayBail = async () => {
    if (!character || !jailStatus?.arrest) return;

    setError(null);
    setSuccess(null);

    const result = await payBail(character.id, jailStatus.arrest.id);

    if (result.success) {
      setSuccess(result.message || 'Released from jail!');
      await refreshCharacter();
      checkJail();
    } else {
      setError(result.error || 'Failed to pay bail');
    }
  };

  if (!character) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#888]">Loading...</div>
      </div>
    );
  }

  // Filter crimes by tier
  const filteredCrimes =
    selectedTier === 'ALL' ? crimes : crimes.filter((c) => c.tier === selectedTier);

  // Get heat stars
  const heatStars = '⭐'.repeat(Math.floor(character.heatLevel));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="ls-section">
        <div className="ls-section-header">
          <Target className="w-5 h-5 inline mr-2" />
          Crime Operations
        </div>
        <div className="ls-section-content">
          <p className="text-sm text-[#888]">
            Build your criminal empire. Higher risk crimes offer bigger rewards.
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

      {/* Jail Status */}
      {jailStatus?.inJail && (
        <div className="ls-section border-2 border-[#d9534f]">
          <div className="ls-section-header bg-[#d9534f]/20">
            <Lock className="w-5 h-5 inline mr-2" />
            IN JAIL
          </div>
          <div className="ls-section-content">
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🔒</div>
              <p className="text-[#d9534f] font-bold mb-2">You are currently incarcerated</p>
              <p className="text-sm text-[#888] mb-4">
                Release in: {Math.ceil(jailStatus.timeRemaining / 60000)} minutes
              </p>

              {jailStatus.canPayBail && jailStatus.arrest && (
                <button onClick={handlePayBail} className="ls-btn ls-btn-warning">
                  Pay Bail (${jailStatus.arrest.bail.toLocaleString()})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Heat Level & Management */}
      <div className="ls-section">
        <div className="ls-section-header">
          <Shield className="w-5 h-5 inline mr-2" />
          Heat Level: {heatStars || '0'} ({character.heatLevel.toFixed(1)}/5.0)
        </div>
        <div className="ls-section-content">
          <div className="mb-4">
            <div className="w-full bg-[#1a1a1a] h-4 mb-2">
              <div
                className="bg-[#d9534f] h-4 transition-all"
                style={{ width: `${(character.heatLevel / 5) * 100}%` }}
              />
            </div>
            <p className="text-xs text-[#888]">
              High heat increases arrest chance. Lay low or pay bribes to reduce heat.
            </p>
          </div>

          {character.heatLevel > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleReduceHeat('bribe')}
                className="ls-btn ls-btn-secondary text-xs"
              >
                Bribe (-1⭐) ${Math.floor(character.heatLevel * 10000).toLocaleString()}
              </button>
              <button
                onClick={() => handleReduceHeat('lay_low')}
                className="ls-btn ls-btn-secondary text-xs"
              >
                Lay Low (-0.5⭐) Free
              </button>
              <button
                onClick={() => handleReduceHeat('lawyer')}
                className="ls-btn ls-btn-secondary text-xs"
              >
                Hire Lawyer (-2⭐) $50,000
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Crime Tier Filter */}
      <div className="flex gap-2 overflow-x-auto">
        {['ALL', 'PETTY', 'MINOR', 'MODERATE', 'SERIOUS', 'MAJOR', 'EXTREME'].map((tier) => (
          <button
            key={tier}
            onClick={() => setSelectedTier(tier)}
            className={`px-4 py-2 border text-xs font-bold whitespace-nowrap ${
              selectedTier === tier
                ? 'border-[#5cb85c] bg-[#5cb85c]/20 text-[#5cb85c]'
                : 'border-[#333] text-[#888] hover:border-[#5cb85c]/50'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      {/* Available Crimes */}
      <div className="ls-section">
        <div className="ls-section-header">Available Crimes</div>
        <div className="ls-section-content">
          {isLoading ? (
            <div className="text-center py-8 text-[#888]">Loading crimes...</div>
          ) : filteredCrimes.length === 0 ? (
            <div className="text-center py-8 text-[#888]">
              No crimes available in this tier. Level up or improve your skills!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCrimes.map((crime) => {
                const requiredSkills = crime.requiredSkills as Record<string, number>;
                const canCommit =
                  !jailStatus?.inJail &&
                  character.energy >= crime.energyCost &&
                  character.level >= crime.requiredLevel &&
                  (!requiredSkills ||
                    Object.keys(requiredSkills).length === 0 ||
                    Object.entries(requiredSkills).every(
                      ([skill, required]) => (character as any)[skill] >= required
                    ));

                return (
                  <div key={crime.id} className="p-4 bg-[#1a1a1a] border border-[#333]">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-[#fff]">{crime.name}</h3>
                        <p className="text-xs text-[#888]">{crime.category}</p>
                      </div>
                      <span
                        className={`px-2 py-1 bg-[#333] text-xs font-bold ${TIER_COLORS[crime.tier]}`}
                      >
                        {crime.tier}
                      </span>
                    </div>

                    <p className="text-xs text-[#d0d0d0] mb-3">{crime.description}</p>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#888]">Reward:</span>
                        <span className="text-[#5cb85c] font-bold">
                          ${crime.minReward.toLocaleString()} - $
                          {crime.maxReward.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#888]">Success Rate:</span>
                        <span className="text-[#f0ad4e]">{crime.baseSuccessRate}%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#888]">Energy Cost:</span>
                        <span className="text-[#888]">-{crime.energyCost} ⚡</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#888]">Heat Gain:</span>
                        <span className="text-[#d9534f]">+{crime.heatGain}⭐</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCommitCrime(crime.id)}
                      disabled={!canCommit || committing === crime.id}
                      className="ls-btn ls-btn-danger w-full text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {committing === crime.id
                        ? 'COMMITTING...'
                        : !canCommit
                        ? 'NOT AVAILABLE'
                        : 'COMMIT CRIME'}
                    </button>
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
