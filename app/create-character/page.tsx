'use client';

/**
 * Character Creation Page
 *
 * Allows new users to create their game character
 * - Choose username
 * - Select starting city
 * - Pick avatar
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { createCharacter } from '@/actions/character';
import { Crown, Star, Zap, Target, Shield, Trophy } from 'lucide-react';

interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  crimeBonus: number;
  businessTaxRate: number;
  specializations: string[];
}

const AVATAR_OPTIONS = [
  { icon: Crown, name: 'crown', label: 'Crown' },
  { icon: Star, name: 'star', label: 'Star' },
  { icon: Zap, name: 'lightning', label: 'Lightning' },
  { icon: Target, name: 'target', label: 'Target' },
  { icon: Shield, name: 'shield', label: 'Shield' },
  { icon: Trophy, name: 'trophy', label: 'Trophy' },
];

export default function CreateCharacterPage() {
  const [username, setUsername] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('crown');
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // Load cities on mount
  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      const response = await fetch('/api/cities');
      if (!response.ok) throw new Error('Failed to load cities');

      const data = await response.json();
      setCities(data.cities);
      if (data.cities.length > 0) {
        setSelectedCity(data.cities[0].id);
      }
    } catch (error) {
      console.error('Error loading cities:', error);
      setError('Failed to load cities');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError('Not authenticated');
        setIsLoading(false);
        return;
      }

      // Create character using server action
      const result = await createCharacter({
        username,
        cityId: selectedCity,
        avatar: selectedAvatar,
      });

      if (result.success) {
        // Redirect to dashboard
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'Failed to create character');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error creating character:', error);
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const selectedCityData = cities.find((c) => c.id === selectedCity);

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#fff] uppercase tracking-wider mb-2">
            CREATE YOUR CHARACTER
          </h1>
          <p className="text-sm text-[#888]">Begin your journey to the top</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Section */}
          <div className="ls-section">
            <div className="ls-section-header">1. Choose Username</div>
            <div className="ls-section-content">
              <div className="max-w-md">
                <label className="ls-info-label block mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username (3-20 characters)"
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="[a-zA-Z0-9_]+"
                  title="Only letters, numbers, and underscores allowed"
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#5cb85c]"
                />
                <p className="text-xs text-[#888] mt-2">
                  3-20 characters, alphanumeric and underscores only
                </p>
              </div>
            </div>
          </div>

          {/* Avatar Section */}
          <div className="ls-section">
            <div className="ls-section-header">2. Select Avatar</div>
            <div className="ls-section-content">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {AVATAR_OPTIONS.map(({ icon: Icon, name, label }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setSelectedAvatar(name)}
                    className={`p-6 bg-[#1a1a1a] border-2 transition-all hover:scale-105 ${
                      selectedAvatar === name
                        ? 'border-[#5cb85c] bg-[#5cb85c]/10'
                        : 'border-[#333] hover:border-[#5cb85c]/50'
                    }`}
                  >
                    <Icon
                      className={`w-12 h-12 mx-auto mb-2 ${
                        selectedAvatar === name ? 'text-[#5cb85c]' : 'text-[#888]'
                      }`}
                    />
                    <div className="text-xs text-[#d0d0d0]">{label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* City Selection */}
          <div className="ls-section">
            <div className="ls-section-header">3. Select Starting City</div>
            <div className="ls-section-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => setSelectedCity(city.id)}
                    className={`p-4 bg-[#1a1a1a] border-2 text-left transition-all hover:scale-105 ${
                      selectedCity === city.id
                        ? 'border-[#5cb85c] bg-[#5cb85c]/10'
                        : 'border-[#333] hover:border-[#5cb85c]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-[#fff]">{city.name}</h3>
                        <p className="text-xs text-[#888]">{city.country}</p>
                      </div>
                      {selectedCity === city.id && (
                        <div className="w-6 h-6 bg-[#5cb85c] rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[#d0d0d0] mb-3 line-clamp-2">
                      {city.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-[#d9534f]/20 border border-[#d9534f] text-[#d9534f] text-xs font-bold">
                        +{city.crimeBonus}% CRIME BONUS
                      </span>
                      <span className="px-2 py-1 bg-[#f0ad4e]/20 border border-[#f0ad4e] text-[#f0ad4e] text-xs">
                        {(city.businessTaxRate * 100).toFixed(0)}% TAX
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected City Details */}
              {selectedCityData && (
                <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#5cb85c]">
                  <div className="ls-info-label mb-2">CITY SPECIALIZATIONS</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCityData.specializations.map((spec: string) => (
                      <span
                        key={spec}
                        className="px-2 py-1 bg-[#5cb85c]/20 border border-[#5cb85c]/50 text-[#5cb85c] text-xs uppercase"
                      >
                        {spec.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-[#d9534f]/10 border border-[#d9534f] text-[#d9534f] px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading || !username || !selectedCity}
              className="ls-btn ls-btn-primary px-12 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'CREATING CHARACTER...' : 'START YOUR EMPIRE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
