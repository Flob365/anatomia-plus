import { defaultSnapshot, readExplorerState, serializeExplorerState } from './urlState'

test('lit et borne un état anatomique depuis une URL', () => {
  expect(readExplorerState('?organ=heart&structure=mitral-valve&mode=section&zoom=8&rotation=-90')).toEqual({
    organId: 'heart', structureId: 'mitral-valve', mode: 'section', zoom: 2.2, rotation: -45,
  })
  expect(readExplorerState('?organ=inconnu')).toEqual(defaultSnapshot)
})

test('sérialise un état de façon stable', () => {
  expect(serializeExplorerState({ organId: 'heart', structureId: 'aorta', mode: 'networks', zoom: 1.4, rotation: 12 }))
    .toBe('?organ=heart&mode=networks&structure=aorta&rotation=12&zoom=1.4')
})
