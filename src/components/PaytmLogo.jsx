import React from 'react'
import logoImg from '../assets/logo.webp'

export function PaytmLogo({ size = 'md', className = '' }) {
  const isSm = size === 'sm'
  const isLg = size === 'lg'

  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`}>
      <div className="flex items-baseline">
        <span
          className={`font-black tracking-tight leading-none text-[#002970] ${
            isSm ? 'text-lg' : isLg ? 'text-2xl' : 'text-xl'
          }`}
          style={{ letterSpacing: '-0.03em' }}
        >
          pay
        </span>
        <span
          className={`font-black tracking-tight leading-none text-[#00baf2] ${
            isSm ? 'text-lg' : isLg ? 'text-2xl' : 'text-xl'
          }`}
          style={{ letterSpacing: '-0.03em' }}
        >
          tm
        </span>
        <span
          className={`ml-1.5 font-extrabold uppercase text-[#002970] bg-[#e8f5fe] border border-[#bce0fd] rounded-md px-1.5 py-0.5 leading-none ${
            isSm ? 'text-[9px]' : 'text-[10px]'
          }`}
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
        alt="RES-Q-RITY"
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
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#e8f5fe] text-[#002970] border border-[#bce0fd] shadow-xs ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[#00ba88]" />
      {text}
    </span>
  )
}
