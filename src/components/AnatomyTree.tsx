import { anatomySystems } from '../data/anatomy'
import { Icon } from './Icon'
import type { Organ } from '../types/anatomy'

interface Props { organ: Organ | null; structureId: string | null; onOrgan: (id: string) => void; onStructure: (id: string) => void; onClose?: () => void }

const systemIcon = (id: string) => id === 'nervous' ? 'brain' : id === 'respiratory' ? 'wind' : id === 'urinary' ? 'droplet' : id === 'cardiovascular' ? 'heart' : 'stomach'

export function AnatomyTree({ organ, structureId, onOrgan, onStructure, onClose }: Props) {
  return <aside className="anatomy-rail" aria-label="Navigation anatomique">
    <div className="rail-brand"><button onClick={onClose} aria-label="Fermer le menu"><Icon name="close"/></button><span>ANATOMIA<b>+</b></span></div>
    <div className="rail-section-title">Systèmes</div>
    <nav className="system-list">
      {anatomySystems.map((system) => <div key={system.id}>
        <button className={organ?.systemId === system.id ? 'active' : ''} onClick={() => onOrgan(system.organs[0].id)}><Icon name={systemIcon(system.id) as never}/><span>{system.name}</span><small>{system.organs.length}</small></button>
        {organ?.systemId === system.id && system.organs.length > 1 && <div className="organ-sublist">{system.organs.map((item) => <button className={organ.id === item.id ? 'active' : ''} key={item.id} onClick={() => onOrgan(item.id)}>{item.name}</button>)}</div>}
      </div>)}
    </nav>
    {organ && <>
      <div className="rail-organ-head"><span>{organ.name}</span><small>{organ.structures.length} structures</small></div>
      <div className="structure-tree">{organ.structures.map((structure, index) => <button key={structure.id} className={structure.id === structureId ? 'active' : ''} onClick={() => onStructure(structure.id)}><i>{String(index + 1).padStart(2, '0')}</i><span>{structure.name}</span></button>)}</div>
    </>}
    <div className="rail-disclaimer"><Icon name="shield"/><span>Contenu pédagogique<br/>Ne remplace pas un avis médical</span></div>
  </aside>
}
