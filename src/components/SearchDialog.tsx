import { useEffect, useRef, useState } from 'react'
import { searchAnatomy } from '../lib/anatomy'
import { Icon } from './Icon'

interface Props { open: boolean; onClose: () => void; onPick: (organId: string, structureId?: string) => void }

export function SearchDialog({ open, onClose, onPick }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { if (open) { setQuery(''); requestAnimationFrame(() => inputRef.current?.focus()) } }, [open])
  useEffect(() => { const handler = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler) }, [onClose])
  if (!open) return null
  const results = searchAnatomy(query)
  return <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="search-dialog" role="dialog" aria-modal="true" aria-label="Rechercher une structure">
      <div className="search-field"><Icon name="search"/><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un organe ou une structure…"/><kbd>Échap</kbd></div>
      <div className="search-results">{!query ? <p className="search-empty">Essayez « valve », « cortex », « lobe » ou un nom latin.</p> : results.length ? results.map((result) => <button key={`${result.organId}-${result.structureId ?? 'organ'}`} onClick={() => { onPick(result.organId, result.structureId); onClose() }}><span><b>{result.name}</b><small>{result.latin}</small></span><em>{result.kind === 'organ' ? 'Organe' : 'Structure'}</em></button>) : <p className="search-empty">Aucun résultat pour « {query} ».</p>}</div>
    </section>
  </div>
}
