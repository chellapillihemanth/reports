import React from 'react'

export function StatusBadge({ status, tone }) {
  const map = {
    high: 'bg-rose-50 text-rose-700 border border-rose-200 font-bold',
    medium: 'bg-amber-50 text-amber-900 border border-amber-300 font-bold',
    low: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold',
    info: 'bg-sky-50 text-sky-900 border border-sky-200 font-bold',
    neutral: 'bg-slate-100 text-slate-800 border border-slate-200 font-semibold',
    navy: 'bg-[#002970] text-white font-bold',
    cyan: 'bg-[#00baf2] text-white font-bold',
  }
  const cls = map[tone] || map.neutral
  return <span className={`badge ${cls}`}>{status}</span>
}

export function KpiCard({ label, value, sub, tone = 'info' }) {
  const toneConfig = {
    high: {
      badgeBg: 'bg-rose-50 text-rose-700 border border-rose-200',
      val: 'text-rose-600',
      badgeText: 'Critical',
      hoverBorder: 'hover:border-rose-300',
    },
    medium: {
      badgeBg: 'bg-amber-50 text-amber-900 border border-amber-300',
      val: 'text-amber-700',
      badgeText: 'Medium',
      hoverBorder: 'hover:border-amber-300',
    },
    low: {
      badgeBg: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      val: 'text-emerald-700',
      badgeText: 'Passed',
      hoverBorder: 'hover:border-emerald-300',
    },
    info: {
      badgeBg: 'bg-[#e8f5fe] text-[#002970] border border-[#bce0fd]',
      val: 'text-[#002970]',
      badgeText: 'Scope',
      hoverBorder: 'hover:border-[#00baf2]',
    },
    navy: {
      badgeBg: 'bg-[#002970] text-white',
      val: 'text-[#002970]',
      badgeText: 'Estate',
      hoverBorder: 'hover:border-[#002970]',
    },
  }

  const conf = toneConfig[tone] || toneConfig.info

  return (
    <div className={`bg-white border border-[#e1edf9] rounded-2xl p-4 shadow-paytm ${conf.hoverBorder} hover:shadow-paytm-hover transition-all duration-200 flex flex-col justify-between h-full`}>
      {/* Top Header Row with Label and Tone Pill Badge (No dots) */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 truncate">
          {label}
        </span>
        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${conf.badgeBg} shrink-0`}>
          {conf.badgeText}
        </span>
      </div>

      {/* Hero Metric Number */}
      <div className={`text-2xl lg:text-3xl font-black tracking-tight mt-1 ${conf.val}`}>
        {value}
      </div>

      {/* Subtitle / Context (No dots) */}
      {sub && (
        <div className="text-[11px] font-semibold text-slate-500 mt-2.5 pt-2 border-t border-slate-100/80 truncate">
          {sub}
        </div>
      )}
    </div>
  )
}

export function Card({ title, children, className = '', rightAction }) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card-title">
          <span>{title}</span>
          {rightAction && <div className="normal-case font-normal">{rightAction}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

export function Bar({ label, value, max, tone = 'info' }) {
  const pct = max ? Math.round((value / max) * 100) : 0
  const colors = {
    high: 'bg-rose-500',
    medium: 'bg-amber-500',
    low: 'bg-emerald-500',
    info: 'bg-[#00baf2]',
    navy: 'bg-[#002970]',
  }
  return (
    <div className="mb-3.5 last:mb-0">
      <div className="flex justify-between items-center text-xs font-bold text-[#002970] mb-1.5">
        <span className="truncate pr-2">{label}</span>
        <span className="font-mono font-black text-[#002970] shrink-0">{value}</span>
      </div>
      <div className="h-2 bg-[#f0f7fe] rounded-full overflow-hidden border border-[#d8ebfd]">
        <div className={`h-full rounded-full transition-all duration-300 ${colors[tone] || colors.info}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function ProgressBar({ value, tone = 'low' }) {
  const colors = {
    high: 'bg-rose-500',
    medium: 'bg-amber-500',
    low: 'bg-emerald-500',
    info: 'bg-[#00baf2]',
    navy: 'bg-[#002970]',
  }
  return (
    <div className="w-full h-2 bg-[#f0f7fe] rounded-full overflow-hidden border border-[#d8ebfd]">
      <div className={`h-full rounded-full transition-all duration-300 ${colors[tone] || colors.info}`} style={{ width: `${value}%` }} />
    </div>
  )
}

export function PageHeader({ title, subtitle, badge }) {
  return (
    <div className="mb-6 pb-4 border-b border-[#e1edf9]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black tracking-tight text-[#002970] uppercase leading-none">{title}</h1>
          {subtitle && <p className="text-xs font-semibold text-slate-500 mt-1.5">{subtitle}</p>}
        </div>
        {badge && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#e8f5fe] text-[#002970] border border-[#bce0fd] shadow-sm">
            {badge}
          </span>
        )}
      </div>
    </div>
  )
}

export function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e1edf9] bg-white shadow-paytm">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="text-left uppercase tracking-wider text-slate-600 bg-[#f5f9fe] border-b border-[#e1edf9]">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 whitespace-nowrap font-extrabold text-[#002970]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  )
}
