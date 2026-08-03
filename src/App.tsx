import { useEffect, useState } from 'react'
import { allOrgans } from './data/anatomy'
import { findOrgan, findStructure } from './lib/anatomy'
import { useExplorerState } from './hooks/useExplorerState'
import { AnatomyTree } from './components/AnatomyTree'
import { BodyOverview } from './components/BodyOverview'
import { OrganExplorer } from './components/OrganExplorer'
import { SearchDialog } from './components/SearchDialog'
import { StructurePanel } from './components/StructurePanel'
import { Icon } from './components/Icon'

export function App() {
  const explorer = useExplorerState()
  const { state } = explorer
  const organ = state.organId ? findOrgan(state.organId) ?? null : null
  const structure = organ && state.structureId ? findStructure(organ.id, state.structureId) ?? organ.structures[0] : null
  const [searchOpen, setSearchOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)
  const [infoOpen, setInfoOpen] = useState(false)

  useEffect(() => { setPanelOpen(Boolean(organ)); setNavOpen(false) }, [organ?.id])
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) }
      if (event.key.toLowerCase() === 'r' && organ) explorer.resetView()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [organ, explorer])

  const pick = (organId: string, structureId?: string) => {
    explorer.selectLocation(organId, structureId)
  }

  return <div className={`app-shell ${organ ? 'is-exploring' : 'is-overview'} ${navOpen ? 'nav-open' : ''} ${panelOpen ? 'panel-open' : ''}`}>
    <header className="topbar">
      <button className="mobile-menu" onClick={() => setNavOpen(true)} aria-label="Ouvrir le menu"><Icon name="menu"/></button>
      <button className="top-brand" onClick={explorer.closeOrgan}>ANATOMIA<b>+</b></button>
      <div className="breadcrumb">{organ ? <><span>{organ.systemId === 'cardiovascular' ? 'Cardiovasculaire' : organ.systemId === 'respiratory' ? 'Respiratoire' : organ.systemId === 'digestive' ? 'Digestif' : organ.systemId === 'nervous' ? 'Nerveux' : 'Urinaire'}</span><i>/</i><span>{organ.name}</span>{structure && <><i>/</i><strong>{structure.name}</strong></>}</> : <span>Atlas du corps humain</span>}</div>
      <button className="search-trigger" onClick={() => setSearchOpen(true)}><Icon name="search"/><span>Rechercher une structure…</span><kbd>⌘ K</kbd></button>
      <button className="top-icon" aria-label="À propos" onClick={() => setInfoOpen(true)}><Icon name="help"/></button>
    </header>
    <AnatomyTree organ={organ} structureId={state.structureId} onOrgan={explorer.selectOrgan} onStructure={(id) => { explorer.selectStructure(id); setPanelOpen(true) }} onClose={() => setNavOpen(false)}/>
    {organ ? <OrganExplorer organ={organ} structureId={state.structureId} mode={state.mode} rotation={state.rotation} zoom={state.zoom} onStructure={(id) => { explorer.selectStructure(id); setPanelOpen(true) }} onMode={explorer.setMode} onRotate={explorer.rotateBy} onZoom={explorer.zoomBy} onReset={explorer.resetView}/> : <BodyOverview organs={allOrgans} onSelect={explorer.selectOrgan}/>} 
    {organ && structure && panelOpen && <StructurePanel organ={organ} structure={structure} onSelect={explorer.selectStructure} onIsolate={() => explorer.setMode('isolate')} onClose={() => setPanelOpen(false)}/>} 
    {organ && !panelOpen && <button className="panel-reopen" onClick={() => setPanelOpen(true)}><Icon name="info"/>Voir la fiche</button>}
    <footer className="shortcut-bar"><span><kbd>⌘ K</kbd> Rechercher</span><span><kbd>R</kbd> Réinitialiser la vue</span><span><Icon name="move"/> Faire tourner</span><span><Icon name="zoomIn"/> Zoomer</span></footer>
    <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} onPick={pick}/>
    {infoOpen && <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setInfoOpen(false) }}><section className="about-dialog" role="dialog" aria-modal="true" aria-label="À propos d’Anatomia"><button onClick={() => setInfoOpen(false)} aria-label="Fermer"><Icon name="close"/></button><Icon name="heart" size={28}/><h2>ANATOMIA+</h2><p>Un atlas interactif pour comprendre les organes, leurs structures et leurs relations. Les informations sont pédagogiques et ne remplacent jamais un avis médical.</p><small>11 organes · 5 systèmes · 110 structures documentées</small></section></div>}
    {navOpen && <button className="nav-scrim" onClick={() => setNavOpen(false)} aria-label="Fermer le menu"/>}
  </div>
}
