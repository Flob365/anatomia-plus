import { useCallback, useEffect, useState } from 'react'
import { findOrgan } from '../lib/anatomy'
import { readExplorerState, serializeExplorerState, type ExplorerSnapshot } from '../lib/urlState'
import type { ViewMode } from '../types/anatomy'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function useExplorerState() {
  const [state, setState] = useState<ExplorerSnapshot>(() => readExplorerState(window.location.search))

  useEffect(() => {
    const next = `${window.location.pathname}${serializeExplorerState(state)}`
    window.history.replaceState(null, '', next)
  }, [state])

  const selectOrgan = useCallback((organId: string) => {
    const organ = findOrgan(organId)
    if (!organ) return
    setState({ organId, structureId: organ.structures[0].id, mode: organId === 'heart' ? 'section' : 'external', rotation: 0, zoom: 1 })
  }, [])
  const selectStructure = useCallback((structureId: string) => setState((current) => ({ ...current, structureId })), [])
  const selectLocation = useCallback((organId: string, structureId?: string) => {
    const organ = findOrgan(organId)
    if (!organ) return
    const validStructure = organ.structures.some((item) => item.id === structureId) ? structureId! : organ.structures[0].id
    setState({ organId, structureId: validStructure, mode: organId === 'heart' ? 'section' : 'external', rotation: 0, zoom: 1 })
  }, [])
  const setMode = useCallback((mode: ViewMode) => setState((current) => ({ ...current, mode })), [])
  const rotateBy = useCallback((amount: number) => setState((current) => ({ ...current, rotation: clamp(current.rotation + amount, -45, 45) })), [])
  const zoomBy = useCallback((amount: number) => setState((current) => ({ ...current, zoom: clamp(Number((current.zoom + amount).toFixed(1)), .8, 2.2) })), [])
  const resetView = useCallback(() => setState((current) => ({ ...current, rotation: 0, zoom: 1 })), [])
  const closeOrgan = useCallback(() => setState({ organId: null, structureId: null, mode: 'external', rotation: 0, zoom: 1 }), [])

  return { state, selectOrgan, selectLocation, selectStructure, setMode, rotateBy, zoomBy, resetView, closeOrgan }
}
