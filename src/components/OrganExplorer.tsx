import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { OrganVisual } from './OrganVisual'
import type { Organ, ViewMode } from '../types/anatomy'

const modeLabels: Record<ViewMode, string> = { external: 'Externe', section: 'Coupe', networks: 'Réseaux', isolate: 'Isoler' }

interface Props {
  organ: Organ
  structureId: string | null
  mode: ViewMode
  rotation: number
  zoom: number
  onStructure: (id: string) => void
  onMode: (mode: ViewMode) => void
  onRotate: (amount: number) => void
  onZoom: (amount: number) => void
  onReset: () => void
}

export function OrganExplorer({ organ, structureId, mode, rotation, zoom, onStructure, onMode, onRotate, onZoom, onReset }: Props) {
  const [labelsVisible, setLabelsVisible] = useState(true)
  const dragStart = useRef<number | null>(null)
  const selected = organ.structures.find((structure) => structure.id === structureId) ?? organ.structures[0]
  useEffect(() => setLabelsVisible(true), [organ.id])

  return <main className="explorer" data-organ={organ.id}>
    <div className="mode-switch" role="group" aria-label="Niveau anatomique">
      {(Object.keys(modeLabels) as ViewMode[]).map((item) => <button key={item} className={mode === item ? 'active' : ''} onClick={() => onMode(item)}>{modeLabels[item]}</button>)}
    </div>
    <div className="organ-stage" onPointerDown={(event) => { dragStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId) }} onPointerMove={(event) => { if (dragStart.current === null) return; const delta = event.clientX - dragStart.current; if (Math.abs(delta) > 12) { onRotate(delta > 0 ? 3 : -3); dragStart.current = event.clientX } }} onPointerUp={() => { dragStart.current = null }} onWheel={(event) => { event.preventDefault(); onZoom(event.deltaY > 0 ? -.1 : .1) }}>
      <div className="organ-aura"/>
      <div className="organ-transform" style={{ transform: `perspective(1100px) rotateY(${rotation}deg) scale(${zoom})` }}>
        <OrganVisual organ={organ} mode={mode} selectedId={structureId} onSelect={onStructure}/>
      </div>
      {labelsVisible && organ.structures.slice(0, zoom > 1.3 ? 10 : 6).map((structure, index) => <button key={structure.id} className={`anatomy-label anatomy-label--${index % 2 ? 'right' : 'left'} ${structure.id === selected.id ? 'selected' : ''}`} style={{ top: `${18 + index * 10}%` }} onClick={() => onStructure(structure.id)}><span>{structure.name}</span><i/></button>)}
      <div className="stage-caption"><strong>{organ.name}</strong><span>{organ.latin} · {organ.location}</span></div>
    </div>
    <div className="camera-controls" aria-label="Contrôles de la vue">
      <button onClick={onReset}><Icon name="reset"/>Réinitialiser</button>
      <span className="control-divider"/>
      <button onClick={() => onZoom(-.1)} aria-label="Réduire le zoom"><Icon name="zoomOut"/>Zoom −</button>
      <output>{Math.round(zoom * 100)}%</output>
      <button onClick={() => onZoom(.1)} aria-label="Augmenter le zoom"><Icon name="zoomIn"/>Zoom +</button>
      <span className="control-divider"/>
      <button onClick={() => setLabelsVisible((value) => !value)}><Icon name={labelsVisible ? 'eyeOff' : 'eye'}/>{labelsVisible ? 'Masquer' : 'Afficher'} les repères</button>
    </div>
    <div className="rotation-pad" aria-label="Rotation de l’organe"><button onClick={() => onRotate(-8)} aria-label="Tourner à gauche"><Icon name="chevronLeft"/></button><div><Icon name="move"/></div><button onClick={() => onRotate(8)} aria-label="Tourner à droite"><Icon name="chevronRight"/></button></div>
  </main>
}
