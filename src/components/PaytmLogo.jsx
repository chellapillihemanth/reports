import React from 'react'
import logoImg from '../assets/logo.webp'
import paytmLogoImg from '../assets/paytm_logo.png'

export function PaytmLogo({ size = 'xl', className = '' }) {
  const isSm = size === 'sm'
  const isMd = size === 'md'
  const isLg = size === 'lg'
  const isXl = size === 'xl'

  const heightClass = isSm
    ? 'h-8'
    : isMd
    ? 'h-12'
    : isLg
    ? 'h-14'
    : isXl
    ? 'h-16 lg:h-20' // Extra large and high visibility
    : 'h-16'

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={paytmLogoImg}
        alt="Paytm Money"
        className={`${heightClass} w-auto object-contain max-w-full drop-shadow-xs`}
        loading="eager"
      />
    </div>
  )
}

export function ResqrityLogo({ size = 'md', className = '' }) {
  const heightClass =
    size === 'sm' ? 'h-6' : size === 'lg' ? 'h-10' : size === 'xl' ? 'h-12' : 'h-8'

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoImg}
        alt="RES-Q-RITY — A New Dimension of Security"
        className={`${heightClass} w-auto object-contain max-w-full`}
        loading="eager"
      />
    </div>
  )
}

export function Logo({ size = 'xl', className = '' }) {
  return <PaytmLogo size={size} className={className} />
}

export function PaytmBrandPill({ text = 'Security & Posture', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#e8f5fe] text-[#002970] border border-[#bce0fd] shadow-xs ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[#00ba88]" />
      {text}
    </span>
  )
}
