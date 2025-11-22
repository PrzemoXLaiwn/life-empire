'use client';

import { useEffect, useState } from 'react';
import { getCurrentCharacter } from '@/actions/character';
import { getWorkRelationships, interactWithCoworker } from '@/actions/career';
import toast from 'react-hot-toast';

interface WorkRelationship {
  id: string;
  name: string;
  role: string;
  department: string;
  relationshipScore: number;
  influence: number;
  helpfulness: number;
  competitiveness: number;
  totalInteractions: number;
  canMentor: boolean;
  canRecommend: boolean;
  canNetwork: boolean;
  lastInteraction?: Date;
}

export default function CoworkersPage() {
  const [coworkers, setCoworkers] = useState<WorkRelationship[]>([]);
  const [loading, setLoading] = useState(true);
  const [interacting, setInteracting] = useState<string | null>(null);

  useEffect(() => {
    loadCoworkers();
  }, []);

  async function loadCoworkers() {
    setLoading(true);
    const charResult = await getCurrentCharacter();
    if ('error' in charResult || !charResult.data) {
      setLoading(false);
      return;
    }

    const result = await getWorkRelationships(charResult.data.id);
    if ('error' in result) {
      console.error(result.error);
    } else {
      setCoworkers(result.data?.coworkers || []);
    }
    setLoading(false);
  }

  async function handleInteraction(coworkerId: string, type: 'chat' | 'help' | 'mentor' | 'network') {
    setInteracting(coworkerId);
    const charResult = await getCurrentCharacter();
    if ('error' in charResult || !charResult.data) return;

    const result = await interactWithCoworker(charResult.data.id, coworkerId, type);
    if ('error' in result) {
      toast.error(result.error || 'Interaction failed');
    } else {
      toast.success(result.message || 'Interaction successful!');
      await loadCoworkers();
    }
    setInteracting(null);
  }

  function getRelationshipColor(score: number) {
    if (score >= 50) return 'text-green-400';
    if (score >= 20) return 'text-blue-400';
    if (score >= -20) return 'text-gray-400';
    if (score >= -50) return 'text-orange-400';
    return 'text-red-400';
  }

  function getRelationshipLabel(score: number) {
    if (score >= 50) return 'Close Friend';
    if (score >= 20) return 'Friend';
    if (score >= -20) return 'Neutral';
    if (score >= -50) return 'Unfriendly';
    return 'Enemy';
  }

  function getRoleIcon(role: string) {
    if (role === 'Manager') return '👔';
    if (role === 'Senior Colleague') return '⭐';
    return '👤';
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Coworkers</h1>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          👥 Coworkers & Relationships
        </h1>

        {coworkers.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400 text-lg">No coworkers yet.</p>
            <p className="text-gray-500 mt-2">Get your first performance review to meet your coworkers!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {coworkers.map((coworker) => (
              <div
                key={coworker.id}
                className="bg-gray-800 rounded-lg p-6 border-2 border-gray-700 hover:border-gray-600 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      {getRoleIcon(coworker.role)} {coworker.name}
                    </h2>
                    <p className="text-gray-400 text-sm">{coworker.role} - {coworker.department}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getRelationshipColor(coworker.relationshipScore)}`}>
                      {coworker.relationshipScore > 0 ? '+' : ''}{coworker.relationshipScore}
                    </div>
                    <div className="text-xs text-gray-400">
                      {getRelationshipLabel(coworker.relationshipScore)}
                    </div>
                  </div>
                </div>

                {/* Attributes */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-gray-700 rounded p-2 text-center">
                    <div className="text-xs text-gray-400">Influence</div>
                    <div className="text-lg font-bold text-purple-400">{coworker.influence}</div>
                  </div>
                  <div className="bg-gray-700 rounded p-2 text-center">
                    <div className="text-xs text-gray-400">Helpful</div>
                    <div className="text-lg font-bold text-green-400">{coworker.helpfulness}</div>
                  </div>
                  <div className="bg-gray-700 rounded p-2 text-center">
                    <div className="text-xs text-gray-400">Competitive</div>
                    <div className="text-lg font-bold text-orange-400">{coworker.competitiveness}</div>
                  </div>
                </div>

                {/* Abilities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {coworker.canMentor && (
                    <span className="bg-blue-900/30 border border-blue-500 text-blue-400 px-2 py-1 rounded text-xs">
                      🎓 Can Mentor
                    </span>
                  )}
                  {coworker.canRecommend && (
                    <span className="bg-green-900/30 border border-green-500 text-green-400 px-2 py-1 rounded text-xs">
                      ⬆️ Can Recommend
                    </span>
                  )}
                  {coworker.canNetwork && (
                    <span className="bg-purple-900/30 border border-purple-500 text-purple-400 px-2 py-1 rounded text-xs">
                      🤝 Can Network
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="text-sm text-gray-400 mb-4">
                  Interactions: {coworker.totalInteractions}
                  {coworker.lastInteraction && (
                    <> • Last: {new Date(coworker.lastInteraction).toLocaleDateString()}</>
                  )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleInteraction(coworker.id, 'chat')}
                    disabled={interacting === coworker.id}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                  >
                    💬 Chat
                  </button>
                  <button
                    onClick={() => handleInteraction(coworker.id, 'help')}
                    disabled={interacting === coworker.id}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                  >
                    🤝 Ask Help
                  </button>
                  {coworker.canMentor && (
                    <button
                      onClick={() => handleInteraction(coworker.id, 'mentor')}
                      disabled={interacting === coworker.id}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      🎓 Request Mentoring
                    </button>
                  )}
                  {coworker.canNetwork && (
                    <button
                      onClick={() => handleInteraction(coworker.id, 'network')}
                      disabled={interacting === coworker.id}
                      className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      🌐 Network
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
