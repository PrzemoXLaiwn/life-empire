'use client';

import { useEffect, useState } from 'react';
import { getCurrentCharacter } from '@/actions/character';
import { getAvailableSideHustles, getMySideHustles, startSideHustle, workOnSideHustle } from '@/actions/career';
import toast from 'react-hot-toast';

interface SideHustle {
  id: string;
  name: string;
  type: string;
  description: string;
  requiredSkill?: string;
  requiredSkillLevel: number;
  setupCost: number;
  minEarnings: number;
  maxEarnings: number;
  isPassive: boolean;
  passiveIncomeRate: number;
  energyCost: number;
  timeRequirement: number;
  successRate: number;
  isActive: boolean;
  totalEarned?: number;
  timesWorked?: number;
  lastWorked?: Date;
}

export default function SideHustlesPage() {
  const [character, setCharacter] = useState<any>(null);
  const [available, setAvailable] = useState<SideHustle[]>([]);
  const [myHustles, setMyHustles] = useState<SideHustle[]>([]);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState<string | null>(null);
  const [tab, setTab] = useState<'my' | 'available'>('my');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const charResult = await getCurrentCharacter();
    if ('error' in charResult || !charResult.data) {
      setLoading(false);
      return;
    }

    setCharacter(charResult.data);

    const [availableResult, myResult] = await Promise.all([
      getAvailableSideHustles(charResult.data.id),
      getMySideHustles(charResult.data.id)
    ]);

    if (!('error' in availableResult)) {
      setAvailable(availableResult.data?.hustles || []);
    }
    if (!('error' in myResult)) {
      setMyHustles(myResult.data?.hustles || []);
    }

    setLoading(false);
  }

  async function handleStart(hustleId: string) {
    if (!character) return;

    setWorking(hustleId);
    const result = await startSideHustle(character.id, hustleId);

    if ('error' in result) {
      toast.error(result.error || 'Failed to start hustle');
    } else {
      toast.success(result.message || 'Side hustle started!');
      await loadData();
    }
    setWorking(null);
  }

  async function handleWork(hustleId: string) {
    if (!character) return;

    setWorking(hustleId);
    const result = await workOnSideHustle(character.id, hustleId);

    if ('error' in result) {
      toast.error(result.error || 'Work failed');
    } else {
      toast.success(result.message || 'Work completed!');
      await loadData();
    }
    setWorking(null);
  }

  function getTypeColor(type: string) {
    switch (type) {
      case 'Freelance': return 'bg-blue-900/30 border-blue-500 text-blue-400';
      case 'Passive': return 'bg-green-900/30 border-green-500 text-green-400';
      case 'Gig': return 'bg-yellow-900/30 border-yellow-500 text-yellow-400';
      case 'Investment': return 'bg-purple-900/30 border-purple-500 text-purple-400';
      default: return 'bg-gray-900/30 border-gray-500 text-gray-400';
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Side Hustles</h1>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          💼 Side Hustles
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setTab('my')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              tab === 'my' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            My Hustles ({myHustles.length})
          </button>
          <button
            onClick={() => setTab('available')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              tab === 'available' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Browse ({available.length})
          </button>
        </div>

        {/* My Hustles Tab */}
        {tab === 'my' && (
          <div>
            {myHustles.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400 text-lg">No active side hustles.</p>
                <p className="text-gray-500 mt-2">Browse available hustles to start earning extra cash!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {myHustles.map((hustle) => (
                  <div key={hustle.id} className="bg-gray-800 rounded-lg p-6 border-2 border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{hustle.name}</h3>
                        <p className="text-gray-400 text-sm">{hustle.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded text-xs border ${getTypeColor(hustle.type)}`}>
                        {hustle.type}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-gray-700 rounded p-2 text-center">
                        <div className="text-xs text-gray-400">Total Earned</div>
                        <div className="text-lg font-bold text-green-400">
                          ${hustle.totalEarned?.toLocaleString() || 0}
                        </div>
                      </div>
                      <div className="bg-gray-700 rounded p-2 text-center">
                        <div className="text-xs text-gray-400">Times Worked</div>
                        <div className="text-lg font-bold text-blue-400">{hustle.timesWorked || 0}</div>
                      </div>
                      <div className="bg-gray-700 rounded p-2 text-center">
                        <div className="text-xs text-gray-400">Success Rate</div>
                        <div className="text-lg font-bold text-yellow-400">{hustle.successRate}%</div>
                      </div>
                    </div>

                    {/* Income Info */}
                    <div className="bg-gray-700 rounded-lg p-3 mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-400">Earnings per gig:</span>
                        <span className="text-green-400 font-bold">
                          ${hustle.minEarnings.toLocaleString()} - ${hustle.maxEarnings.toLocaleString()}
                        </span>
                      </div>
                      {hustle.isPassive && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Passive income:</span>
                          <span className="text-green-400 font-bold">
                            ${hustle.passiveIncomeRate.toLocaleString()}/day
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Work Button */}
                    {!hustle.isPassive && (
                      <button
                        onClick={() => handleWork(hustle.id)}
                        disabled={working === hustle.id || (character?.energy || 0) < hustle.energyCost}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-3 rounded font-bold transition-colors"
                      >
                        {working === hustle.id ? 'Working...' : `Work (${hustle.energyCost} energy, ${hustle.timeRequirement}h)`}
                      </button>
                    )}
                    {hustle.isPassive && (
                      <div className="text-center text-green-400 font-bold py-3">
                        ✨ Earning passively: ${hustle.passiveIncomeRate}/day
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Available Hustles Tab */}
        {tab === 'available' && (
          <div>
            {available.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400 text-lg">No available side hustles.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {available.map((hustle) => (
                  <div key={hustle.id} className="bg-gray-800 rounded-lg p-6 border-2 border-gray-700 hover:border-gray-600 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{hustle.name}</h3>
                        <p className="text-gray-400 text-sm">{hustle.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded text-xs border ${getTypeColor(hustle.type)}`}>
                        {hustle.type}
                      </span>
                    </div>

                    {/* Requirements */}
                    {hustle.requiredSkill && (
                      <div className="bg-gray-700 rounded p-3 mb-4">
                        <div className="text-sm text-gray-400 mb-1">Requires:</div>
                        <div className="text-white font-bold">
                          {hustle.requiredSkill}: {hustle.requiredSkillLevel}+
                        </div>
                      </div>
                    )}

                    {/* Income Info */}
                    <div className="bg-gray-700 rounded-lg p-3 mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-400">Earnings per gig:</span>
                        <span className="text-green-400 font-bold">
                          ${hustle.minEarnings.toLocaleString()} - ${hustle.maxEarnings.toLocaleString()}
                        </span>
                      </div>
                      {hustle.isPassive && (
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-400">Passive income:</span>
                          <span className="text-green-400 font-bold">
                            ${hustle.passiveIncomeRate.toLocaleString()}/day
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Setup cost:</span>
                        <span className="text-red-400 font-bold">${hustle.setupCost.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Work Requirements */}
                    <div className="flex gap-2 mb-4 text-sm">
                      <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded">
                        ⚡ {hustle.energyCost} energy
                      </span>
                      <span className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded">
                        ⏱️ {hustle.timeRequirement}h
                      </span>
                      <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded">
                        🎯 {hustle.successRate}% success
                      </span>
                    </div>

                    {/* Start Button */}
                    <button
                      onClick={() => handleStart(hustle.id)}
                      disabled={working === hustle.id || (character?.cash || 0) < hustle.setupCost}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-3 rounded font-bold transition-colors"
                    >
                      {working === hustle.id ? 'Starting...' : `Start (${hustle.setupCost > 0 ? `$${hustle.setupCost.toLocaleString()}` : 'Free'})`}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
