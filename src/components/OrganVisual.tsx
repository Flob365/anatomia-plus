import { useId } from 'react'
import type { Organ, ViewMode } from '../types/anatomy'
import { contours, Shell, TissueDefs } from './anatomy/Tissue'
import { Heart, Lungs, Trachea } from './anatomy/ThoracicOrgans'
import { Colon, Intestines, Liver, Pancreas, Stomach } from './anatomy/AbdominalOrgans'
import { Bladder, Brain, Kidneys } from './anatomy/NeuralUrinaryOrgans'
import { RealisticOrgan } from './anatomy/RealisticOrgan'
import { landmarkFor } from './anatomy/landmarks'

const illustrations = {
  heart: Heart, lungs: Lungs, trachea: Trachea, brain: Brain, liver: Liver,
  stomach: Stomach, pancreas: Pancreas, 'small-intestine': Intestines,
  colon: Colon, kidneys: Kidneys, bladder: Bladder,
}

export function OrganVisual({ organ, mode, selectedId, onSelect }: {
  organ: Organ; mode: ViewMode; selectedId: string | null; onSelect: (id: string) => void
}) {
  const instance = useId().replace(/:/g, '')
  const id = `${organ.id}--${instance}`
  const Illustration = illustrations[organ.id as keyof typeof illustrations]
  const selected = organ.structures.find(structure => structure.id === selectedId)
  const [focusX, focusY] = selected ? landmarkFor(organ.id, selected, mode) : [255, 310]
  const section = mode === 'section' || mode === 'isolate'
  return <svg className={`organ-visual organ-visual--${organ.id} mode-${mode}`} data-mode={mode} data-selected-structure={selectedId ?? undefined} viewBox="0 0 510 620" role="img" aria-label={`${organ.name}, vue ${mode}`}>
    <title>{organ.name} — illustration anatomique détaillée</title>
    <TissueDefs id={id} color={organ.color}/>
    <defs>
      <clipPath id={`${id}-focus`}><circle cx={focusX} cy={focusY} r="76"/></clipPath>
    </defs>
    <g className="organ-illustration" filter={`url(#${id}-shadow)`} pointerEvents="none">
      <g id={`${id}-art`} className="anatomical-art">
        {mode === 'external' || (organ.id === 'heart' && section) ? <RealisticOrgan organId={organ.id} cutaway={section}/> : <>
          <Shell id={id} path={contours[organ.id]}/>
          {Illustration && <Illustration id={id} section={section} networks={mode === 'networks'}/>}
        </>}
      </g>
      {mode === 'isolate' && selected && <g className="structure-focus" clipPath={`url(#${id}-focus)`}>
        <use href={`#${id}-art`}/>
      </g>}
    </g>
    {mode === 'isolate' && selected && <circle className="focus-outline" cx={focusX} cy={focusY} r="76" fill="none" stroke="#d8e94c" strokeWidth="1" strokeDasharray="3 5" pointerEvents="none"/>}
    {organ.structures.map((structure, index) => {
      const [x, y] = landmarkFor(organ.id, structure, mode)
      return <g key={structure.id} className={`svg-hotspot ${selectedId === structure.id ? 'selected' : ''} ${index > 9 ? 'fine-detail' : ''}`} onClick={() => onSelect(structure.id)} role="button" tabIndex={0} aria-label={structure.name} onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(structure.id) }
    }}>
      <circle cx={x} cy={y} r="9" fill="#061512" fillOpacity=".75" stroke="#d8e94c" strokeWidth={selectedId === structure.id ? 2.5 : 1.2}/>
      <circle cx={x} cy={y} r="2.5" fill="#d8e94c"/>
    </g>})}
  </svg>
}
