'use client'

import { Building2, Home, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function EmpireOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Your Empire */}
      <div className="bg-bg-card rounded-lg border border-border-light p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-accent-green" />
            <h2 className="font-display font-bold text-text-primary">YOUR EMPIRE</h2>
          </div>
          <p className="text-sm text-text-muted">Net Worth: <span className="text-accent-green font-bold">$1M</span></p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-bg-hover rounded-lg">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-accent-blue" />
              <div>
                <p className="font-semibold text-text-primary">Businesses</p>
                <p className="text-xs text-text-muted">3 active</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-accent-green">$5K/day</p>
              <p className="text-xs text-text-muted">passive income</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-bg-hover rounded-lg">
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-accent-purple" />
              <div>
                <p className="font-semibold text-text-primary">Properties</p>
                <p className="text-xs text-text-muted">2 owned</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-text-primary">$850K</p>
              <p className="text-xs text-text-muted">value</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-bg-hover rounded-lg">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-accent-yellow" />
              <div>
                <p className="font-semibold text-text-primary">Investments</p>
                <p className="text-xs text-text-muted">Portfolio</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-text-primary">$120K</p>
              <p className="text-xs text-text-muted">+12% this month</p>
            </div>
          </div>
        </div>

        <Link href="/dashboard/business">
          <button className="w-full mt-4 px-4 py-2 bg-accent-green hover:bg-accent-green/80 text-white rounded-lg font-semibold transition-colors">
            MANAGE EMPIRE →
          </button>
        </Link>
      </div>

      {/* Gang Status */}
      <div className="bg-bg-card rounded-lg border border-border-light p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">👥</span>
            <h2 className="font-display font-bold text-text-primary">THE SYNDICATE</h2>
          </div>
          <span className="px-2 py-1 bg-accent-purple/20 text-accent-purple text-xs font-bold rounded">
            BOSS
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-muted">Members</p>
              <p className="text-lg font-bold text-text-primary">25/50</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">Territory</p>
              <p className="text-lg font-bold text-text-primary">5/50</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">Gang Bank</p>
              <p className="text-lg font-bold text-accent-green">$500K</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">Daily Income</p>
              <p className="text-lg font-bold text-accent-green">$10K</p>
            </div>
          </div>

          <div className="p-3 bg-accent-purple/10 border border-accent-purple rounded-lg">
            <p className="text-sm text-accent-purple font-semibold">
              ⚔️ Gang War Active!
            </p>
            <p className="text-xs text-text-muted mt-1">
              Defending Downtown district from Mafia
            </p>
          </div>
        </div>

        <Link href="/dashboard/gang">
          <button className="w-full mt-4 px-4 py-2 bg-accent-purple hover:bg-accent-purple/80 text-white rounded-lg font-semibold transition-colors">
            MANAGE GANG →
          </button>
        </Link>
      </div>
    </div>
  )
}