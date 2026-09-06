import { fireEvent, render, screen } from '@testing-library/react'
import { App } from './App'

beforeEach(() => window.history.replaceState(null, '', '/'))

test('ouvre le cœur, sélectionne une structure et change réellement de niveau', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Explorer Cœur' }))
  expect(screen.getByRole('img', { name: 'Cœur, vue section' })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Valve mitrale' }))
  expect(screen.getByRole('heading', { name: 'Valve mitrale' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Valve mitrale, repère anatomique' })).toHaveAttribute('aria-current', 'true')
  expect(screen.getByRole('button', { name: 'Aorte ascendante, repère anatomique' })).not.toHaveAttribute('aria-current')
  fireEvent.click(screen.getByRole('button', { name: 'Masquer les repères' }))
  expect(screen.getByRole('button', { name: 'Valve mitrale, repère anatomique' })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'Aorte ascendante, repère anatomique' })).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Réseaux' }))
  expect(screen.getByRole('img', { name: 'Cœur, vue networks' })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Isoler cette structure' }))
  expect(screen.getByRole('img', { name: 'Cœur, vue isolate' })).toBeInTheDocument()
})

test('la recherche ouvre une sous-structure en français', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Rechercher une structure' }))
  fireEvent.change(screen.getByPlaceholderText('Rechercher un organe ou une structure…'), { target: { value: 'cortex rénal' } })
  fireEvent.click(screen.getByRole('button', { name: 'Cortex rénal Cortex renalis Structure' }))
  expect(screen.getByRole('heading', { name: 'Cortex rénal' })).toBeInTheDocument()
})
