import React from 'react'
import logoImg from '../assets/logo.webp'

export function PaytmLogo({ size = 'md', className = '' }) {
  const heightClass =
    size === 'sm' ? 'h-6' : size === 'lg' ? 'h-11' : size === 'xl' ? 'h-14' : 'h-8'

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

export function Logo({ size = 'md', className = '' }) {
  return <PaytmLogo size={size} className={className} />
}

export function PaytmBrandPill({ text = 'Security & Posture', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#e8f7fd] text-[#008db8] border border-[#bcecfd] shadow-xs ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[#00c2f3]" />
      {text}
    </span>
  )
}
