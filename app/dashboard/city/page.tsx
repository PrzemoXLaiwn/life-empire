'use client'

import { useEffect, useState } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import Link from 'next/link'

export default function CityPage() {
  const { character, isLoading } = useCharacterStore()

  if (isLoading || !character) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mb-4"></div>
          <p className="text-[#888] text-xs uppercase">Loading...</p>
        </div>
      </div>
    )
  }

  if (!character.city) {
    return (
      <div className="space-y-4 max-w-7xl mx-auto fade-in">
        <h1 className="text-2xl font-bold text-[#fff] mb-6">City</h1>
        <div className="ls-section">
          <div className="ls-section-content">
            <p className="text-[#888] text-sm">You are not in any city.</p>
          </div>
        </div>
      </div>
    )
  }

  const city = character.city

  // Get country flag
  const countryFlags: Record<string, string> = {
    'USA': '🇺🇸',
    'UK': '🇬🇧',
    'Japan': '🇯🇵'
  }
  const flag = countryFlags[city.country] || '🌍'

  // City locations/places
  const locations = [
    { icon: '🏥', name: 'Hospital', desc: 'Heal your wounds', href: '/dashboard/hospital' },
    { icon: '💪', name: 'Gym', desc: 'Train your stats', href: '/dashboard/gym' },
    { icon: '💊', name: 'Pharmacy', desc: 'Buy medical supplies', href: '/dashboard/pharmacy' },
    { icon: '🏪', name: 'Shops', desc: 'Browse local stores', href: '/dashboard/shops' },
    { icon: '🏦', name: 'Bank', desc: 'Manage your money', href: '/dashboard/bank' },
    { icon: '💼', name: 'Jobs', desc: 'Find employment', href: '/dashboard/jobs' },
    { icon: '🎓', name: 'Education', desc: 'Study courses', href: '/dashboard/education' },
    { icon: '🏢', name: 'Properties', desc: 'Buy real estate', href: '/dashboard/properties' },
  ]

  return (
    <div className="space-y-4 max-w-7xl mx-auto fade-in">
      <h1 className="text-2xl font-bold text-[#fff] mb-6">
        {flag} {city.name}
      </h1>

      {/* City Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="ls-section">
          <div className="ls-section-header">City Information</div>
          <div className="ls-section-content">
            <div className="ls-info-row">
              <span className="ls-info-label">City:</span>
              <span className="ls-info-value">{city.name}</span>
            </div>
            <div className="ls-info-row">
              <span className="ls-info-label">Country:</span>
              <span className="ls-info-value">{flag} {city.country}</span>
            </div>
            <div className="ls-info-row">
              <span className="ls-info-label">Description:</span>
              <span className="ls-info-value text-xs text-[#888]">{city.description}</span>
            </div>
            <div className="ls-info-row">
              <span className="ls-info-label">Min Level:</span>
              <span className="ls-info-value">{city.minLevel}</span>
            </div>
          </div>
        </div>

        {/* City Bonuses */}
        <div className="ls-section">
          <div className="ls-section-header">🌆 City Bonuses</div>
          <div className="ls-section-content">
            <div className="space-y-2">
              {city.incomeBonus > 0 && (
                <div className="flex items-center justify-between p-2 bg-[#1a1a1a] border border-[#2a2a2a]">
                  <span className="text-xs text-[#d0d0d0]">Income</span>
                  <span className="text-sm font-bold text-success">+{city.incomeBonus}%</span>
                </div>
              )}
              {city.crimeBonus > 0 && (
                <div className="flex items-center justify-between p-2 bg-[#1a1a1a] border border-[#2a2a2a]">
                  <span className="text-xs text-[#d0d0d0]">Crime Success</span>
                  <span className="text-sm font-bold text-success">+{city.crimeBonus}%</span>
                </div>
              )}
              {city.trainingBonus > 0 && (
                <div className="flex items-center justify-between p-2 bg-[#1a1a1a] border border-[#2a2a2a]">
                  <span className="text-xs text-[#d0d0d0]">Training Speed</span>
                  <span className="text-sm font-bold text-success">+{city.trainingBonus}%</span>
                </div>
              )}
              {city.businessBonus > 0 && (
                <div className="flex items-center justify-between p-2 bg-[#1a1a1a] border border-[#2a2a2a]">
                  <span className="text-xs text-[#d0d0d0]">Business Costs</span>
                  <span className="text-sm font-bold text-success">-{city.businessBonus}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="ls-section">
        <div className="ls-section-header">📍 City Locations</div>
        <div className="ls-section-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {locations.map((location, index) => (
              <Link
                key={index}
                href={location.href}
                className="ls-action-item text-center"
              >
                <div className="text-3xl mb-2">{location.icon}</div>
                <div className="ls-action-title text-sm">{location.name}</div>
                <div className="ls-action-details text-[10px]">{location.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/travel" className="ls-section hover:border-[#5cb85c] transition-colors cursor-pointer">
          <div className="ls-section-header">🚗 Travel (Same Country)</div>
          <div className="ls-section-content">
            <p className="text-xs text-[#888]">
              Drive to other cities in {city.country}
            </p>
          </div>
        </Link>

        <Link href="/dashboard/airport" className="ls-section hover:border-[#5cb85c] transition-colors cursor-pointer">
          <div className="ls-section-header">✈️ Airport (International)</div>
          <div className="ls-section-content">
            <p className="text-xs text-[#888]">
              Fly to cities in other countries
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}