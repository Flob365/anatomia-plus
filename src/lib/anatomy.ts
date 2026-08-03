import { allOrgans, anatomySystems } from '../data/anatomy'
import type { SearchResult } from '../types/anatomy'

const normalize = (value: string) => value
  .replace(/œ/g, 'oe').replace(/æ/g, 'ae')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export const findSystem = (id: string) => anatomySystems.find((system) => system.id === id)
export const findOrgan = (id: string) => allOrgans.find((organ) => organ.id === id)
export const findStructure = (organId: string, structureId: string) =>
  findOrgan(organId)?.structures.find((structure) => structure.id === structureId)

export const searchAnatomy = (query: string): SearchResult[] => {
  const needle = normalize(query)
  if (!needle) return []
  return allOrgans.flatMap((organ) => {
    const organMatch = normalize(`${organ.name} ${organ.latin}`).includes(needle)
      ? [{ systemId: organ.systemId, organId: organ.id, name: organ.name, latin: organ.latin, kind: 'organ' as const }]
      : []
    const structures = organ.structures
      .filter((structure) => normalize(`${structure.name} ${structure.latin}`).includes(needle))
      .map((structure) => ({ systemId: organ.systemId, organId: organ.id, structureId: structure.id, name: structure.name, latin: structure.latin, kind: 'structure' as const }))
    return [...organMatch, ...structures]
  }).slice(0, 12)
}
