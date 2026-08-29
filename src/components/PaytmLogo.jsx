import React from 'react'

export function PaytmLogo({ size = 'md', showSub = true, className = '' }) {
  const isSm = size === 'sm'
  const isLg = size === 'lg'

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Authentic Paytm Typography & Icon Mark */}
      <div className="flex items-center">
        <span
          className={`font-black tracking-tight leading-none text-[#002970] ${
            isSm ? 'text-lg' : isLg ? 'text-2xl' : 'text-xl'
          }`}
          style={{ letterSpacing: '-0.04em' }}
        >
          pay
        </span>
        <span
          className={`font-black tracking-tight leading-none text-[#00baf2] ${
            isSm ? 'text-lg' : isLg ? 'text-2xl' : 'text-xl'
          }`}
          style={{ letterSpacing: '-0.04em' }}
        >
          tm
        </span>
        <span
          className={`ml-1 font-extrabold uppercase text-[#002970] bg-[#e8f5fe] border border-[#bce0fd] rounded-md px-1.5 py-0.5 leading-none ${
            isSm ? 'text-[9px]' : 'text-[10px]'
          }`}
        >
          money
        </span>
      </div>
    </div>
  )
}

export function PaytmBrandPill({ text = 'Security & Posture', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#e8f5fe] text-[#002970] border border-[#bce0fd] shadow-xs ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#00ba88]" />
      {text}
    </span>
  )
}
