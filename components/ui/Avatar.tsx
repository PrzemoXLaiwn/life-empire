'use client'

import { Crown, Skull, Flame, Star, Diamond, Rocket, Bot, Swords, Ship, Users } from 'lucide-react'
import Image from 'next/image'

interface AvatarProps {
  icon: string
  customUrl?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Avatar({ icon, customUrl, size = 'md', className = '' }: AvatarProps) {
  const icons: Record<string, any> = {
    crown: Crown,
    skull: Skull,
    fire: Flame,
    star: Star,
    diamond: Diamond,
    rocket: Rocket,
    robot: Bot,
    ninja: Swords,
    pirate: Ship,
    alien: Users
  }

  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4' },
    md: { container: 'w-12 h-12', icon: 'w-6 h-6' },
    lg: { container: 'w-16 h-16', icon: 'w-8 h-8' },
    xl: { container: 'w-24 h-24', icon: 'w-12 h-12' }
  }

  // Custom avatar
  if (icon === 'custom' && customUrl) {
    return (
      <div className={`${sizes[size].container} rounded-full overflow-hidden border-2 border-[#5cb85c] shadow-lg ${className}`}>
        <Image 
          src={customUrl} 
          alt="Avatar" 
          width={parseInt(sizes[size].container.split('w-')[1]?.split(' ')[0] || '12') * 4}
          height={parseInt(sizes[size].container.split('w-')[1]?.split(' ')[0] || '12') * 4}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  // Icon avatar
  const Icon = icons[icon] || Crown

  return (
    <div className={`${sizes[size].container} rounded-full bg-gradient-to-br from-[#5cb85c] to-[#4a9d4a] flex items-center justify-center border-2 border-[#5cb85c] shadow-lg ${className}`}>
      <Icon className={`${sizes[size].icon} text-white`} />
    </div>
  )
}