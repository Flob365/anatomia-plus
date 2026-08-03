import { allOrgans } from '../data/anatomy'
import { findOrgan, searchAnatomy } from './anatomy'

test('couvre onze organes avec un détail structurel conséquent', () => {
  expect(allOrgans).toHaveLength(11)
  expect(allOrgans.every((organ) => organ.structures.length >= 8)).toBe(true)
  expect(findOrgan('heart')?.structures.length).toBeGreaterThanOrEqual(18)
})

test('recherche les noms français et latins sans dépendre des accents', () => {
  expect(searchAnatomy('coeur')[0]?.organId).toBe('heart')
  expect(searchAnatomy('ventriculus').some((result) => result.structureId === 'left-ventricle')).toBe(true)
})
