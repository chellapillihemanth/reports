import React from 'react'
import logoImg from '../assets/logo.webp'

export function PaytmLogo({ size = 'lg', className = '' }) {
  const isSm = size === 'sm'
  const isMd = size === 'md'
  const isLg = size === 'lg'
  const isXl = size === 'xl'

  const fontClass = isSm
    ? 'text-lg'
    : isMd
    ? 'text-2xl'
    : isXl
    ? 'text-4xl'
    : 'text-3xl' // default 'lg'

  const badgeClass = isSm
    ? 'text-[9px] px-1.5 py-0.5'
    : isMd
    ? 'text-[11px] px-2 py-0.5'
    : 'text-xs px-2.5 py-1'

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <div className="flex items-baseline">
        <span
          className={`font-black tracking-tight leading-none text-[#002970] ${fontClass}`}
          style={{ letterSpacing: '-0.04em' }}
        >
          pay
        </span>
        <span
          className={`font-black tracking-tight leading-none text-[#00baf2] ${fontClass}`}
          style={{ letterSpacing: '-0.04em' }}
        >
          tm
        </span>
        <span
          className={`ml-2 font-black uppercase text-[#002970] bg-[#e8f5fe] border border-[#bce0fd] rounded-lg leading-none shadow-xs ${badgeClass}`}
        >
          money
        </span>
      </div>
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

export function Logo({ size = 'lg', className = '' }) {
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
