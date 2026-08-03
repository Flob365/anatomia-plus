import { useState } from 'react'
import type { Organ } from '../types/anatomy'

const positions: Record<string, [number, number]> = {
  brain: [50, 12], trachea: [50, 25], lungs: [50, 34], heart: [48, 39], liver: [43, 48],
  stomach: [57, 50], pancreas: [52, 53], kidneys: [50, 57], 'small-intestine': [50, 64],
  colon: [50, 67], bladder: [50, 76],
}

export function BodyOverview({ organs, onSelect }: { organs: Organ[]; onSelect: (id: string) => void }) {
  const [view, setView] = useState<'anterior' | 'posterior'>('anterior')
  return (
    <main className="overview">
      <section className="overview-copy">
        <h1>Explorez le corps humain</h1>
        <p>Sélectionnez un organe, puis plongez dans ses couches, ses réseaux et ses plus petites structures.</p>
        <div className="overview-key"><span /> 11 organes · 110 structures documentées</div>
      </section>
      <div className="overview-view-switch" role="group" aria-label="Orientation du corps"><button className={view === 'anterior' ? 'active' : ''} onClick={() => setView('anterior')}>Antérieure</button><button className={view === 'posterior' ? 'active' : ''} onClick={() => setView('posterior')}>Postérieure</button></div>
      <div className={`body-stage ${view}`} aria-label={`Vue ${view === 'anterior' ? 'antérieure' : 'postérieure'} du corps humain`}>
        <svg className="body-silhouette" viewBox="0 0 360 720" role="img" aria-label="Silhouette anatomique humaine">
          <defs>
            <linearGradient id="bodyFill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#17332e"/><stop offset="1" stopColor="#0b1b18"/></linearGradient>
            <filter id="softGlow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <circle cx="180" cy="62" r="48" fill="url(#bodyFill)" stroke="#36544c"/>
          <path d="M142 111 C116 129 104 172 95 217 L54 339 C48 359 76 369 84 350 L126 257 L116 428 L93 675 C91 700 125 706 131 680 L174 458 L186 458 L229 680 C235 706 269 700 267 675 L244 428 L234 257 L276 350 C284 369 312 359 306 339 L265 217 C256 172 244 129 218 111 Z" fill="url(#bodyFill)" stroke="#36544c" strokeWidth="2"/>
          <path d="M180 116 L180 448" stroke="#27473f" strokeDasharray="3 8"/>
        </svg>
        {organs.map((organ) => {
          const [x, y] = positions[organ.id]
          return <button key={organ.id} className={`body-organ body-organ--${organ.id}`} style={{ left: `${x}%`, top: `${y}%`, '--organ-color': organ.color } as React.CSSProperties} onClick={() => onSelect(organ.id)} aria-label={`Explorer ${organ.name}`}>
            <span className="body-organ__pulse"/><span className="body-organ__name">{organ.name}</span>
          </button>
        })}
      </div>
      <div className="overview-hint"><span>Vue {view === 'anterior' ? 'antérieure' : 'postérieure'}</span><span>Survolez un repère pour identifier l’organe</span></div>
    </main>
  )
}
