import { fireEvent, render, screen } from '@testing-library/react'
import { App } from './App'

beforeEach(() => window.history.replaceState(null, '', '/'))

test('ouvre le cœur, sélectionne une structure et change réellement de niveau', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Explorer Cœur' }))
  expect(screen.getByRole('img', { name: 'Cœur, vue section' })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Valve mitrale' }))
  expect(screen.getByRole('heading', { name: 'Valve mitrale' })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Réseaux' }))
  expect(screen.getByRole('img', { name: 'Cœur, vue networks' })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Isoler cette structure' }))
  expect(screen.getByRole('img', { name: 'Cœur, vue isolate' })).toBeInTheDocument()
})

test('la recherche ouvre une sous-structure en français', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Rechercher une structure… ⌘ K' }))
  fireEvent.change(screen.getByPlaceholderText('Rechercher un organe ou une structure…'), { target: { value: 'cortex rénal' } })
  fireEvent.click(screen.getByRole('button', { name: 'Cortex rénal Cortex renalis Structure' }))
  expect(screen.getByRole('heading', { name: 'Cortex rénal' })).toBeInTheDocument()
})
