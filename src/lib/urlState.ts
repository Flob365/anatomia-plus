import { findOrgan, findStructure } from './anatomy'
import type { ViewMode } from '../types/anatomy'

export interface ExplorerSnapshot {
  organId: string | null
  structureId: string | null
  mode: ViewMode
  rotation: number
  zoom: number
}

const modes: ViewMode[] = ['external', 'section', 'networks', 'isolate']
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const defaultSnapshot: ExplorerSnapshot = {
  organId: null,
  structureId: null,
  mode: 'external',
  rotation: 0,
  zoom: 1,
}

export const readExplorerState = (search: string): ExplorerSnapshot => {
  const params = new URLSearchParams(search)
  const requestedOrgan = params.get('organ')
  const organ = requestedOrgan ? findOrgan(requestedOrgan) : undefined
  if (!organ) return defaultSnapshot
  const requestedStructure = params.get('structure')
  const structure = requestedStructure ? findStructure(organ.id, requestedStructure) : undefined
  const requestedMode = params.get('mode') as ViewMode
  return {
    organId: organ.id,
    structureId: structure?.id ?? organ.structures[0].id,
    mode: modes.includes(requestedMode) ? requestedMode : 'external',
    rotation: clamp(Number(params.get('rotation')) || 0, -45, 45),
    zoom: clamp(Number(params.get('zoom')) || 1, 0.8, 2.2),
  }
}

export const serializeExplorerState = (state: ExplorerSnapshot) => {
  if (!state.organId) return ''
  const params = new URLSearchParams({ organ: state.organId, mode: state.mode })
  if (state.structureId) params.set('structure', state.structureId)
  if (state.rotation) params.set('rotation', String(Math.round(state.rotation)))
  if (state.zoom !== 1) params.set('zoom', state.zoom.toFixed(1))
  return `?${params.toString()}`
}
