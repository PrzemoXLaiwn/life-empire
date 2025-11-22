'use client';

/**
 * Character Creation Page
 *
 * First-time setup for new players:
 * - Choose username/nickname
 * - Select gender
 * - Choose starting city
 * - Select avatar
 */

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Avatar } from '@/components/ui/Avatar';

const AVATAR_OPTIONS = [
  { id: 'men1', name: 'Male 1', category: 'Men' },
  { id: 'men2', name: 'Male 2', category: 'Men' },
  { id: 'men3', name: 'Male 3', category: 'Men' },
  { id: 'men4', name: 'Male 4', category: 'Men' },
  { id: 'women1', name: 'Female 1', category: 'Women' },
  { id: 'women2', name: 'Female 2', category: 'Women' },
  { id: 'women3', name: 'Female 3', category: 'Women' },
  { id: 'women4', name: 'Female 4', category: 'Women' },
];

const GENDERS = [
  { value: 'male', label: 'Male', icon: '♂️' },
  { value: 'female', label: 'Female', icon: '♀️' },
  { value: 'other', label: 'Other', icon: '⚧️' },
];

interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  crimeBonus: number;
  policePresence: number;
}

export default function CreateCharacterPage() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('male');
  const [selectedAvatar, setSelectedAvatar] = useState('men1');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
    loadCities();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    setUser(user);
    setIsLoading(false);
  };

  const loadCities = async () => {
    try {
      const response = await fetch('/api/cities');
      const data = await response.json();

      if (data.cities && data.cities.length > 0) {
        setCities(data.cities);
        setSelectedCity(data.cities[0].id); // Select first city by default
      }
    } catch (error) {
      console.error('Failed to load cities:', error);
    }
  };

  const handleCreate = async () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (username.length > 20) {
      setError('Username must be less than 20 characters');
      return;
    }

    if (!selectedCity) {
      setError('Please select a city');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch('/api/character', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          gender,
          avatar: selectedAvatar,
          cityId: selectedCity,
        }),
      });

      const data = await response.json();

      if (response.ok && data.character) {
        // Success! Redirect to dashboard
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(data.error || 'Failed to create character');
        setIsCreating(false);
      }
    } catch (error) {
      console.error('Error creating character:', error);
      setError('Failed to create character. Please try again.');
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mb-4"></div>
          <p className="text-[#888] text-xs uppercase tracking-wider">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image
              src="/images/logo.png"
              alt="Life Empire"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 uppercase tracking-wider">
            Create Your Character
          </h1>
          <p className="text-sm sm:text-base text-[#888]">
            Start your new life in the criminal underworld
          </p>
        </div>

        {/* Creation Form */}
        <div className="ls-section">
          <div className="ls-section-content p-6 sm:p-8 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-[#d9534f]/10 border border-[#d9534f] text-[#d9534f] px-4 py-3 text-sm rounded">
                {error}
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
                Username / Nickname
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                maxLength={20}
                className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 focus:outline-none focus:border-[#5cb85c] transition-colors"
                disabled={isCreating}
              />
              <p className="text-xs text-[#888] mt-1">
                {username.length}/20 characters (minimum 3)
              </p>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-3">
                {GENDERS.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGender(g.value)}
                    disabled={isCreating}
                    className={`p-4 border-2 transition-all ${
                      gender === g.value
                        ? 'border-[#5cb85c] bg-[#5cb85c]/10'
                        : 'border-[#333] hover:border-[#555]'
                    }`}
                  >
                    <div className="text-3xl mb-2">{g.icon}</div>
                    <div className="text-sm text-white font-bold">{g.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar */}
            <div>
              <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                Avatar
              </label>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {AVATAR_OPTIONS.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    disabled={isCreating}
                    className={`p-4 border-2 transition-all hover:scale-105 ${
                      selectedAvatar === avatar.id
                        ? 'border-[#5cb85c] bg-[#5cb85c]/10'
                        : 'border-[#333] hover:border-[#555]'
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      <Avatar icon={avatar.id} size="lg" />
                    </div>
                    <div className="text-xs text-center text-[#888]">{avatar.name}</div>
                  </button>
                ))}
              </div>
              <div className="text-center p-6 bg-[#1a1a1a] border border-[#333]">
                <div className="flex justify-center mb-3">
                  <Avatar icon={selectedAvatar} size="xl" />
                </div>
                <p className="text-sm text-white font-bold">Selected Avatar</p>
                <p className="text-xs text-[#888] mt-1">
                  {AVATAR_OPTIONS.find(a => a.id === selectedAvatar)?.name}
                </p>
              </div>
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                Starting City
              </label>
              {cities.length === 0 ? (
                <div className="text-center py-8 text-[#888]">
                  Loading cities...
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => setSelectedCity(city.id)}
                      disabled={isCreating}
                      className={`p-4 border-2 text-left transition-all ${
                        selectedCity === city.id
                          ? 'border-[#5cb85c] bg-[#5cb85c]/10'
                          : 'border-[#333] hover:border-[#555]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-white text-base">{city.name}</h4>
                          <p className="text-xs text-[#888]">{city.country}</p>
                        </div>
                        {selectedCity === city.id && (
                          <span className="text-[#5cb85c] text-xl">✓</span>
                        )}
                      </div>
                      <p className="text-xs text-[#888] mb-3 line-clamp-2">
                        {city.description}
                      </p>
                      <div className="flex gap-3 text-xs">
                        <span className={`${city.crimeBonus > 0 ? 'text-[#d9534f]' : 'text-[#888]'}`}>
                          Crime: {city.crimeBonus > 0 ? '+' : ''}{city.crimeBonus}%
                        </span>
                        <span className={`${city.policePresence > 50 ? 'text-[#5cb85c]' : 'text-[#f0ad4e]'}`}>
                          Police: {city.policePresence}%
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreate}
              disabled={isCreating || !username.trim() || !selectedCity}
              className="w-full ls-btn ls-btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                  Creating Character...
                </span>
              ) : (
                <span>🚀 START YOUR LIFE</span>
              )}
            </button>

            <p className="text-xs text-center text-[#666]">
              By creating a character, you agree to our Terms of Service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
