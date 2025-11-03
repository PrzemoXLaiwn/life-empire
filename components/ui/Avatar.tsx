'use client'

import Image from 'next/image'

interface AvatarProps {
  icon: string
  customUrl?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Avatar({ icon, customUrl, size = 'md', className = '' }: AvatarProps) {
  // WYSOKIEJ JAKOŚCI rozmiary - 4x większe dla crisp rendering
  const sizes = {
    sm: 128,  // 4x32
    md: 192,  // 4x48
    lg: 256,  // 4x64
    xl: 384   // 4x96
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  // Custom uploaded avatar
  if (icon === 'custom' && customUrl) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-[#5cb85c] shadow-lg ${className}`}>
        <Image
          src={customUrl}
          alt="Custom Avatar"
          width={sizes[size]}
          height={sizes[size]}
          className="w-full h-full object-contain scale-90"
          quality={100}
          priority
        />
      </div>
    )
  }

  // Character avatars (men1-4, women1-4) - Z PLIKÓW PNG
  const characterAvatars = ['men1', 'men2', 'men3', 'men4', 'women1', 'women2', 'women3', 'women4']
  if (characterAvatars.includes(icon)) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-[#5cb85c] shadow-lg ${className}`}>
        <Image
          src={`/images/avatars/${icon}.PNG`}
          alt={icon}
          width={sizes[size]}
          height={sizes[size]}
          className="w-full h-full object-contain scale-90"
          quality={100}
          priority
        />
      </div>
    )
  }

  // Fallback - NAJWYŻSZA JAKOŚĆ DiceBear SVG!
  // SVG = nieskończona rozdzielczość, zawsze sharp!
  const pixelSize = sizes[size]
  const avatarStyle = icon.includes('woman') || icon.includes('female') ? 'avataaars' : 'avataaars'
  const fallbackUrl = `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${icon}&backgroundColor=transparent&radius=50&size=${pixelSize}&scale=90`

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-[#5cb85c] shadow-lg bg-gradient-to-br from-[#5cb85c]/20 to-[#4a9d4a]/20 flex items-center justify-center ${className}`}>
      <Image
        src={fallbackUrl}
        alt="Avatar"
        width={sizes[size]}
        height={sizes[size]}
        className="w-full h-full object-contain"
        quality={100}
        priority
        unoptimized // SVG doesn't need optimization
      />
    </div>
  )
}