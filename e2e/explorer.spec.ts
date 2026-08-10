import { expect, test } from '@playwright/test'

test('parcours cœur, coupe, valve, zoom et isolement', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Explorer Cœur' }).click()
  await expect(page.getByRole('img', { name: 'Cœur, vue section' })).toBeVisible()
  await page.getByRole('button', { name: '10 Valve mitrale' }).click()
  await expect(page.getByRole('heading', { name: 'Valve mitrale' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Valve mitrale, repère anatomique' })).toBeVisible()
  await page.getByRole('button', { name: 'Augmenter le zoom' }).click()
  await expect(page.locator('output')).toHaveText('110%')
  await page.getByRole('button', { name: 'Isoler cette structure' }).click()
  await expect(page.getByRole('img', { name: 'Cœur, vue isolate' })).toBeVisible()
  await expect(page).toHaveURL(/organ=heart.*mode=isolate.*structure=mitral-valve/)
})

test('recherche une structure en latin', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Rechercher une structure/ }).click()
  await page.getByPlaceholder('Rechercher un organe ou une structure…').fill('ventriculus sinister')
  await page.getByRole('button', { name: /Ventricule gauche/ }).click()
  await expect(page.getByRole('heading', { name: 'Ventricule gauche' })).toBeVisible()
})
