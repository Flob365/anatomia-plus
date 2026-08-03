import { useState } from 'react'
import type { AnatomyStructure, Organ } from '../types/anatomy'
import { Icon } from './Icon'

type Tab = 'role' | 'anatomy' | 'clinical'

export function StructurePanel({ organ, structure, onSelect, onIsolate, onClose }: { organ: Organ; structure: AnatomyStructure; onSelect: (id: string) => void; onIsolate: () => void; onClose?: () => void }) {
  const [tab, setTab] = useState<Tab>('role')
  const index = organ.structures.findIndex((item) => item.id === structure.id)
  const pick = (offset: number) => onSelect(organ.structures[(index + offset + organ.structures.length) % organ.structures.length].id)
  const content = tab === 'role' ? structure.role : tab === 'anatomy' ? structure.anatomy : structure.clinical
  return <aside className="structure-panel" aria-label="Informations anatomiques">
    <button className="panel-close" onClick={onClose} aria-label="Fermer la fiche"><Icon name="close"/></button>
    <div className="structure-count">Structure {String(index + 1).padStart(2, '0')} / {organ.structures.length}</div>
    <h2>{structure.name}</h2><p className="latin-name">{structure.latin}</p>
    <div className="info-tabs" role="tablist">{([['role','Rôle'],['anatomy','Anatomie'],['clinical','Clinique']] as const).map(([id, label]) => <button role="tab" aria-selected={tab === id} className={tab === id ? 'active' : ''} key={id} onClick={() => setTab(id)}>{label}</button>)}</div>
    <div className="panel-copy"><p>{content}</p></div>
    <section className="key-facts"><h3>Caractéristiques clés</h3><dl><div><dt>Organe</dt><dd>{organ.name}</dd></div><div><dt>Localisation</dt><dd>{organ.location}</dd></div><div><dt>Repère</dt><dd>{structure.metric}</dd></div></dl></section>
    <section className="relation-box"><h3><Icon name="layers"/>Relations anatomiques</h3><p>{structure.relation}</p></section>
    <div className="panel-navigation"><button onClick={() => pick(-1)}><Icon name="chevronLeft"/>Précédente</button><button onClick={() => pick(1)}>Suivante<Icon name="chevronRight"/></button></div>
    <button className="isolate-action" onClick={onIsolate}><Icon name="focus"/>Isoler cette structure</button>
  </aside>
}
