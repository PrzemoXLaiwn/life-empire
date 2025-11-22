'use client';

/**
 * Workplace Relations Panel - Coworkers, Boss, Office Politics
 * 
 * Features:
 * - Boss relationship management
 * - Coworker list with relationship levels
 * - Office events and drama
 * - Networking actions
 * - Rival mechanics
 */

import { 
  Users, 
  Heart,
  MessageCircle,
  Gift,
  Mail,
  Coffee,
  Pizza,
  Gamepad2,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  Star,
  Swords,
  Handshake,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface WorkRelationship {
  id: string;
  name: string;
  role: string;
  department?: string;
  relationshipScore: number;
  influence: number;
  helpfulness: number;
  competitiveness: number;
  canMentor: boolean;
  canRecommend: boolean;
  lastInteraction?: Date;
}

interface WorkplaceRelationsPanelProps {
  character: any;
  currentJob: any;
  relationships: WorkRelationship[];
  onInteract: (relationshipId: string, action: string) => void;
}

export default function WorkplaceRelationsPanel({
  character,
  currentJob,
  relationships,
  onInteract,
}: WorkplaceRelationsPanelProps) {
  // Separate boss from coworkers
  const boss = relationships.find(r => r.role === 'Manager');
  const coworkers = relationships.filter(r => r.role !== 'Manager');

  // Calculate team reputation
  const avgRelationship = relationships.length > 0
    ? Math.floor(relationships.reduce((sum, r) => sum + r.relationshipScore, 0) / relationships.length)
    : 0;

  const getRelationshipLevel = (score: number): string => {
    if (score >= 80) return 'Best Friend';
    if (score >= 60) return 'Friend';
    if (score >= 40) return 'Acquaintance';
    if (score >= 20) return 'Neutral';
    if (score >= 0) return 'Distant';
    if (score >= -20) return 'Tense';
    if (score >= -40) return 'Dislike';
    return 'Rival';
  };

  const getRelationshipColor = (score: number): string => {
    if (score >= 60) return 'text-[#5cb85c]';
    if (score >= 20) return 'text-[#f0ad4e]';
    if (score >= 0) return 'text-[#888]';
    return 'text-[#d9534f]';
  };

  const getHeartIcons = (score: number): string => {
    const hearts = Math.floor((score + 100) / 40); // -100 to 100 → 0 to 5 hearts
    const filled = '❤️'.repeat(Math.max(0, hearts));
    const empty = '🤍'.repeat(Math.max(0, 5 - hearts));
    return filled + empty;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-[#333] p-4">
        <h2 className="text-2xl font-bold text-[#fff] mb-3 flex items-center gap-2">
          <Users className="w-6 h-6 text-[#5cb85c]" />
          WORKPLACE RELATIONS
        </h2>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#888]">🏢 Company:</span>
            <span className="text-[#fff] font-bold">TechCorp Industries - IT Department</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#888]">Team Size:</span>
            <span className="text-[#fff]">{relationships.length} people</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#888]">Your Reputation:</span>
            <span className={`font-bold ${getRelationshipColor(avgRelationship)}`}>
              {getRelationshipLevel(avgRelationship)} ({avgRelationship}/100) 📈
            </span>
          </div>
        </div>
      </div>

      {/* Boss / Management */}
      {boss && (
        <div className="bg-[#0a0a0a] border border-[#333] p-4">
          <h3 className="text-sm font-bold text-[#fff] mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#f0ad4e]" />
            👔 MANAGEMENT
          </h3>

          <div className="p-4 bg-[#1a1a1a] border-2 border-[#f0ad4e] rounded">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center text-2xl">
                👨‍💼
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#fff] mb-1">{boss.name}</h4>
                <p className="text-xs text-[#888] mb-2">Department Manager</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getHeartIcons(boss.relationshipScore)}</span>
                  <span className={`text-sm font-bold ${getRelationshipColor(boss.relationshipScore)}`}>
                    ({boss.relationshipScore}/100) {getRelationshipLevel(boss.relationshipScore)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs mb-3">
              <div className="flex items-center justify-between">
                <span className="text-[#888]">📊 Influence on Your Career:</span>
                <span className="text-[#f0ad4e]">
                  {'⭐'.repeat(Math.floor(boss.influence / 25))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888]">Last Interaction:</span>
                <span className="text-[#888]">3 days ago</span>
              </div>
            </div>

            <div className="p-2 bg-[#0f0f0f] border border-[#333] rounded mb-3 text-xs text-[#888] italic">
              Recent: "Good work on the API project"
            </div>

            {/* Boss Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onInteract(boss.id, 'talk')}
                className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-[#fff] text-xs transition-colors flex items-center justify-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                💬 Talk
              </button>
              <button
                onClick={() => onInteract(boss.id, 'gift')}
                className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-[#fff] text-xs transition-colors flex items-center justify-center gap-1"
              >
                <Gift className="w-3 h-3" />
                🎁 Gift
              </button>
              <button
                onClick={() => onInteract(boss.id, 'email')}
                className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-[#fff] text-xs transition-colors flex items-center justify-center gap-1"
              >
                <Mail className="w-3 h-3" />
                📧 Email
              </button>
              <button
                onClick={() => onInteract(boss.id, 'coffee')}
                className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-[#fff] text-xs transition-colors flex items-center justify-center gap-1"
              >
                <Coffee className="w-3 h-3" />
                ☕ Coffee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coworkers */}
      <div className="bg-[#0a0a0a] border border-[#333] p-4">
        <h3 className="text-sm font-bold text-[#fff] mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#5cb85c]" />
          🤝 COWORKERS
        </h3>

        <div className="space-y-3">
          {coworkers.slice(0, 3).map((coworker) => {
            const isRival = coworker.relationshipScore < 0;
            const isFriend = coworker.relationshipScore >= 60;

            return (
              <div
                key={coworker.id}
                className={`p-3 border-2 rounded ${
                  isRival 
                    ? 'border-[#d9534f] bg-[#d9534f]/5'
                    : isFriend
                    ? 'border-[#5cb85c] bg-[#5cb85c]/5'
                    : 'border-[#333] bg-[#1a1a1a]'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-xl">
                    {coworker.role.includes('Senior') ? '👩‍💻' : coworker.role.includes('Junior') ? '👨‍💻' : '👨'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#fff] text-sm mb-1">
                      {coworker.name}
                    </h4>
                    <p className="text-xs text-[#888] mb-1">{coworker.role}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{getHeartIcons(coworker.relationshipScore)}</span>
                      <span className={`text-xs font-bold ${getRelationshipColor(coworker.relationshipScore)}`}>
                        ({coworker.relationshipScore}/100) {getRelationshipLevel(coworker.relationshipScore)}
                      </span>
                    </div>
                  </div>
                  {isRival && (
                    <div className="text-xs bg-[#d9534f] text-[#fff] px-2 py-1 rounded font-bold">
                      ⚔️ RIVAL
                    </div>
                  )}
                </div>

                {/* Coworker Info */}
                {coworker.canMentor && (
                  <div className="text-xs text-[#5cb85c] mb-2">
                    Can help with: Mentoring, Project tips
                  </div>
                )}
                {isRival && (
                  <div className="text-xs text-[#d9534f] mb-2">
                    Status: Competing for same promotion
                  </div>
                )}

                {/* Actions */}
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => onInteract(coworker.id, 'chat')}
                    className="p-1.5 bg-[#0f0f0f] border border-[#333] hover:border-[#5cb85c] text-[#888] hover:text-[#fff] text-xs transition-colors"
                  >
                    💬 Chat
                  </button>
                  {coworker.canMentor ? (
                    <button
                      onClick={() => onInteract(coworker.id, 'ask-help')}
                      className="p-1.5 bg-[#0f0f0f] border border-[#333] hover:border-[#5cb85c] text-[#888] hover:text-[#fff] text-xs transition-colors"
                    >
                      📚 Ask Help
                    </button>
                  ) : isRival ? (
                    <button
                      onClick={() => onInteract(coworker.id, 'sabotage')}
                      className="p-1.5 bg-[#d9534f]/20 border border-[#d9534f] hover:bg-[#d9534f]/30 text-[#d9534f] text-xs transition-colors"
                    >
                      ⚔️ Sabotage
                    </button>
                  ) : (
                    <button
                      onClick={() => onInteract(coworker.id, 'collaborate')}
                      className="p-1.5 bg-[#0f0f0f] border border-[#333] hover:border-[#5cb85c] text-[#888] hover:text-[#fff] text-xs transition-colors"
                    >
                      🤝 Collaborate
                    </button>
                  )}
                  <button
                    onClick={() => onInteract(coworker.id, 'lunch')}
                    className="p-1.5 bg-[#0f0f0f] border border-[#333] hover:border-[#5cb85c] text-[#888] hover:text-[#fff] text-xs transition-colors"
                  >
                    🍕 Lunch
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {coworkers.length > 3 && (
          <button className="w-full mt-3 p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-[#888] hover:text-[#fff] text-xs transition-colors">
            👥 View All Coworkers ({coworkers.length})
          </button>
        )}
      </div>

      {/* Office Events & Drama */}
      <div className="bg-[#0a0a0a] border border-[#333] p-4">
        <h3 className="text-sm font-bold text-[#fff] mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#5cb85c]" />
          🎭 OFFICE EVENTS & DRAMA
        </h3>

        {/* Upcoming Event */}
        <div className="p-3 bg-[#1a1a1a] border border-[#5cb85c] rounded mb-3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-bold text-[#fff] text-sm mb-1">🎉 Team Lunch - Friday 2PM</h4>
              <p className="text-xs text-[#888]">Attending: 12/24 people</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <button className="p-2 bg-[#5cb85c] hover:bg-[#4a9d4a] text-[#000] text-xs font-bold transition-colors">
              ✅ Attend
            </button>
            <button className="p-2 bg-[#333] hover:bg-[#444] text-[#888] text-xs transition-colors">
              ❌ Skip
            </button>
            <button className="p-2 bg-[#f0ad4e] hover:bg-[#ec971f] text-[#000] text-xs font-bold transition-colors">
              🎤 Organize
            </button>
          </div>
        </div>

        {/* Current Rumors */}
        <div className="p-3 bg-[#1a1a1a] border border-[#333] rounded">
          <h4 className="text-xs font-bold text-[#888] mb-2">💬 Current Rumors:</h4>
          <div className="space-y-2 text-xs text-[#888]">
            <div className="flex items-start gap-2">
              <span className="text-[#f0ad4e]">•</span>
              <span>"Someone is getting promoted next week..."</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#d9534f]">•</span>
              <span>"Budget cuts might be coming"</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#5cb85c]">•</span>
              <span>"New project launching soon - big bonuses!"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Networking Actions */}
      <div className="bg-[#0a0a0a] border border-[#333] p-4">
        <h3 className="text-sm font-bold text-[#fff] mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#5cb85c]" />
          📈 NETWORKING ACTIONS
        </h3>

        <div className="space-y-2">
          <button className="w-full p-3 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-left transition-colors group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#888] group-hover:text-[#5cb85c]" />
                <div>
                  <div className="text-sm text-[#fff] font-bold">☕ Coffee Break</div>
                  <div className="text-xs text-[#888]">Build random relationship (+5-15 points)</div>
                </div>
              </div>
              <div className="text-xs text-[#666]">Free</div>
            </div>
          </button>

          <button className="w-full p-3 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-left transition-colors group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pizza className="w-4 h-4 text-[#888] group-hover:text-[#5cb85c]" />
                <div>
                  <div className="text-sm text-[#fff] font-bold">🍕 Organize Team Lunch</div>
                  <div className="text-xs text-[#888]">Boost all relationships (+10 points each)</div>
                </div>
              </div>
              <div className="text-xs text-[#f0ad4e]">$50</div>
            </div>
          </button>

          <button className="w-full p-3 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-left transition-colors group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-[#888] group-hover:text-[#5cb85c]" />
                <div>
                  <div className="text-sm text-[#fff] font-bold">🎮 After-Work Hangout</div>
                  <div className="text-xs text-[#888]">Build with 3-5 people (+20 points)</div>
                </div>
              </div>
              <div className="text-xs text-[#666]">Free</div>
            </div>
          </button>

          <button className="w-full p-3 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-left transition-colors group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#888] group-hover:text-[#5cb85c]" />
                <div>
                  <div className="text-sm text-[#fff] font-bold">💼 Professional Networking Event</div>
                  <div className="text-xs text-[#888]">Meet industry professionals (+career opportunities)</div>
                </div>
              </div>
              <div className="text-xs text-[#f0ad4e]">$100</div>
            </div>
          </button>

          <button className="w-full p-3 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] text-left transition-colors group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#888] group-hover:text-[#5cb85c]" />
                <div>
                  <div className="text-sm text-[#fff] font-bold">🎁 Give Gift to Coworker</div>
                  <div className="text-xs text-[#888]">Boost specific relationship (+25 points)</div>
                </div>
              </div>
              <div className="text-xs text-[#f0ad4e]">$20-$200</div>
            </div>
          </button>
        </div>
      </div>

      {/* Relationship Tips */}
      <div className="bg-[#1a1a1a] border border-[#5cb85c] p-4">
        <h4 className="text-xs font-bold text-[#5cb85c] mb-2 flex items-center gap-2">
          <Star className="w-3 h-3" />
          💡 RELATIONSHIP TIPS
        </h4>
        <ul className="space-y-1 text-xs text-[#888]">
          <li>• Good relationships with boss increase promotion chances</li>
          <li>• Friends can mentor you and boost skills faster</li>
          <li>• Rivals may sabotage your work - improve relationship or compete</li>
          <li>• Networking events can unlock new job opportunities</li>
          <li>• Team events boost overall office morale</li>
        </ul>
      </div>
    </div>
  );
}
