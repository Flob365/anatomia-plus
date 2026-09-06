import { render } from '@testing-library/react'
import { allOrgans } from './data/anatomy'
import { OrganVisual } from './components/OrganVisual'

const kidneys = allOrgans.find((organ) => organ.id === 'kidneys')!

test('expose les états visuels et le plan de coupe de l’organe', () => {
  const { container } = render(
    <OrganVisual
      organ={kidneys}
      mode="section"
      selectedId="cortex"
      onSelect={() => undefined}
    />,
  )

  const visual = container.querySelector('svg')
  expect(visual).toHaveAttribute('data-mode', 'section')
  expect(visual).toHaveAttribute('data-selected-structure', 'cortex')
  expect(container.querySelector('[aria-label="Plan de coupe"]')).toBeInTheDocument()
  expect(container.querySelector('.tissue-shell')).toBeInTheDocument()
  expect(container.querySelector('.cutaway-layer')).toBeInTheDocument()
})

test('compose une matière anatomique et un réseau propre à l’organe', () => {
  const { container, rerender } = render(
    <OrganVisual organ={kidneys} mode="section" selectedId="cortex" onSelect={() => undefined} />,
  )

  expect(container.querySelector('.tissue-highlight')).toBeInTheDocument()
  expect(container.querySelector('.tissue-depth')).toBeInTheDocument()
  expect(container.querySelector('.cut-rim')).toBeInTheDocument()

  rerender(<OrganVisual organ={kidneys} mode="networks" selectedId="cortex" onSelect={() => undefined} />)
  expect(container.querySelector('.network-layer')).toBeInTheDocument()
})

test.each(allOrgans)('affiche le réseau anatomique de $name', (organ) => {
  const { container } = render(
    <OrganVisual organ={organ} mode="networks" selectedId={organ.structures[0].id} onSelect={() => undefined} />,
  )

  expect(container.querySelector('.network-layer')).toBeInTheDocument()
})

test.each(allOrgans)('sépare la surface réaliste et la coupe de $name', organ => {
  const { container, rerender } = render(<OrganVisual organ={organ} mode="external" selectedId={null} onSelect={() => undefined}/> )
  expect(container.querySelector('.realistic-organ')).toBeInTheDocument()
  expect(container.querySelector('.cutaway-layer')).not.toBeInTheDocument()
  const externalImage = container.querySelector('image')?.getAttribute('href')
  rerender(<OrganVisual organ={organ} mode="section" selectedId={null} onSelect={() => undefined}/> )
  if (organ.id === 'heart') expect(container.querySelector('image')?.getAttribute('href')).not.toBe(externalImage)
  else expect(container.querySelector('[aria-label="Plan de coupe"]')).toBeInTheDocument()
})

test('deux vues du même organe ne partagent pas les identifiants de leurs filtres et masques', () => {
  const { container } = render(<><OrganVisual organ={kidneys} mode="section" selectedId={null} onSelect={() => undefined}/><OrganVisual organ={kidneys} mode="isolate" selectedId="cortex" onSelect={() => undefined}/></>)
  const ids = [...container.querySelectorAll('[id]')].map(element => element.id)
  expect(new Set(ids).size).toBe(ids.length)
  const use = container.querySelector('use')!
  expect(container.querySelector(use.getAttribute('href')!)).toBeInTheDocument()
})
