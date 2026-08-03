export type ViewMode = 'external' | 'section' | 'networks' | 'isolate'

export type StructureTuple = readonly [
  id: string,
  name: string,
  latin: string,
  role: string,
  x: number,
  y: number,
]

export interface AnatomyStructure {
  id: string
  name: string
  latin: string
  role: string
  anatomy: string
  clinical: string
  relation: string
  metric: string
  x: number
  y: number
}

export interface Organ {
  id: string
  name: string
  latin: string
  systemId: string
  icon: string
  summary: string
  location: string
  color: string
  structures: AnatomyStructure[]
}

export interface AnatomySystem {
  id: string
  name: string
  icon: string
  description: string
  organs: Organ[]
}

export interface SearchResult {
  systemId: string
  organId: string
  structureId?: string
  name: string
  latin: string
  kind: 'organ' | 'structure'
}
