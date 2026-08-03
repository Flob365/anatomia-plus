import { render, screen } from '@testing-library/react'
import { App } from './App'

test('affiche la mission de l’atlas', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /explorez le corps humain/i })).toBeInTheDocument()
})
