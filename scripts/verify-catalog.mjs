import path from 'node:path'
import assert from 'node:assert/strict'
import { expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

async function checkAccess(page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  assert.deepEqual(
    result.violations.map((v) => [v.id, v.nodes.map((n) => n.target)]),
    [],
  )
}

export async function verifyCatalog(page, origin, artifacts, version, checks) {
  await page.goto(origin + '/catalog.html')
  const host = page.locator('.catalog')
  const card = page.getByRole('region', { name: 'Paleta' })
  for (const [mode, surface, accent] of [
    ['light', 'rgb(255, 255, 255)', 'rgb(36, 75, 241)'],
    ['dark', 'rgb(24, 34, 53)', 'rgb(137, 162, 255)'],
  ]) {
    await page.getByLabel('Modo', { exact: true }).selectOption(mode)
    await expect(host).toHaveAttribute('data-nx-theme', 'mktauto')
    await expect(card).toHaveCSS('background-color', surface)
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      assert(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        'Catalog overflow at ' + width,
      )
      if (width === 320 || width === 1440) {
        await checkAccess(page)
        await page.evaluate(() => window.scrollTo(0, 0))
        if (version === '19.3.1')
          await page.screenshot({
            path: path.join(artifacts, 'catalog-' + mode + '-' + width + '.png'),
            fullPage: false,
          })
      }
    }
    await page.getByRole('button', { name: 'Abrir confirmação em portal' }).click()
    const portal = page.getByRole('dialog', { name: 'Confirmar alteração?' })
    await expect(portal).toHaveCSS('background-color', surface)
    assert(await portal.evaluate((node) => node.closest('main') !== null))
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
    await page.keyboard.press('Escape')
    await expect(portal).toHaveCount(0)
    assert.notEqual(await page.locator('body').evaluate((node) => node.style.overflow), 'hidden')
    const trigger = page.getByRole('button', { name: 'Abrir revisão' })
    await expect(trigger).toHaveCSS('background-color', accent)
    await trigger.click()
    const modal = page.getByRole('dialog', { name: 'Revisar exemplo' })
    await expect(modal).toHaveCSS('background-color', surface)
    await expect(modal.getByRole('button', { name: 'Fechar' })).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(modal.getByRole('button', { name: 'Confirmar exemplo' })).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(modal.getByRole('button', { name: 'Fechar' })).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(modal.getByRole('button', { name: 'Confirmar exemplo' })).toBeFocused()
    await checkAccess(page)
    await page.keyboard.press('Escape')
    await expect(modal).toHaveCount(0)
    await expect(trigger).toBeFocused()
    await page.setViewportSize({ width: 390, height: 900 })
    const menu = page.getByRole('button', { name: 'Menu', exact: true })
    await menu.click()
    const drawer = page.getByRole('dialog', { name: 'Índice de componentes' })
    await expect(drawer.getByRole('button', { name: 'Fechar menu' })).toBeFocused()
    await checkAccess(page)
    await page.mouse.click(389, 100)
    await expect(drawer).toHaveCount(0)
    await expect(menu).toBeFocused()
    await menu.click()
    await page.setViewportSize({ width: 1024, height: 900 })
    await expect(drawer).toHaveCount(0)
    checks.push(
      'MKTauto ' +
        mode +
        ': 320/390/768/1024/1440; axe desktop/mobile, dialog/drawer, focus and Escape/backdrop',
    )
  }
  await page.getByRole('button', { name: 'Inserir exemplo' }).click()
  await expect(page.getByRole('textbox', { name: 'Descrição' })).toHaveValue('Descrição de exemplo')
  await page.getByLabel('Horário').fill('14:30')
  await expect(page.getByLabel('Horário')).toHaveValue('14:30')
  await page.getByRole('button', { name: 'Variação', exact: true }).click()
  await expect(page.getByRole('table', { name: 'Dados da seleção' }).getByRole('rowheader')).toHaveText(
    'Variação',
  )
  await page.getByRole('checkbox', { name: 'Variação' }).check()
  await expect(page.getByLabel('Original')).toBeChecked()
  await page.getByRole('button', { name: /Revisar.*Pendente/ }).click()
  await expect(page.locator('[aria-current=step]')).toContainText('Revisar')
  await expect(page.getByRole('button', { name: /Confirmar.*Bloqueado/ })).toBeDisabled()
  await page.getByText('Detalhes da etapa', { exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByText('Etapa selecionada: Revisar.')).toBeVisible()
  await page.getByRole('button', { name: 'Abrir revisão' }).click()
  await page.getByRole('button', { name: 'Confirmar exemplo' }).click()
  await expect(page.getByRole('status')).toHaveText('Exemplo confirmado.')
  await page.getByRole('searchbox', { name: 'Pesquisar forma' }).fill('círc')
  await expect(page.getByLabel('Formas encontradas').locator('option')).toHaveCount(2)
  await page.getByRole('searchbox', { name: 'Pesquisar forma' }).fill('inexistente')
  await expect(page.getByRole('heading', { name: 'Nenhuma forma encontrada' })).toBeVisible()
  await page.getByRole('button', { name: 'Limpar pesquisa' }).click()
  await page.getByRole('button', { name: 'Próxima', exact: true }).click()
  await expect(page.getByLabel('Formas encontradas')).toHaveValue('circle')
  await page.getByRole('tab', { name: 'Listas', exact: true }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'Galeria' })).toHaveAttribute('aria-selected', 'true')
  await page.getByRole('button', { name: 'Ampliar Círculo azul' }).click()
  await expect(page.getByRole('dialog').getByRole('img', { name: 'Círculo azul' })).toBeVisible()
  await page.keyboard.press('Escape')
  const videoBytes = await page.evaluate(async () => {
    const canvas = document.createElement('canvas')
    canvas.width = 48
    canvas.height = 32
    const context = canvas.getContext('2d')
    const stream = canvas.captureStream(15)
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' })
    const chunks = []
    recorder.ondataavailable = (event) => chunks.push(event.data)
    const stopped = new Promise((resolve) => {
      recorder.onstop = resolve
    })
    try {
      recorder.start()
      context.fillStyle = 'blue'
      context.fillRect(0, 0, 48, 32)
      await new Promise((resolve) => setTimeout(resolve, 180))
      recorder.stop()
      await stopped
      return Array.from(new Uint8Array(await new Blob(chunks).arrayBuffer()))
    } finally {
      stream.getTracks().forEach((track) => track.stop())
    }
  })
  await page
    .getByLabel('Escolher imagem ou vídeo')
    .setInputFiles({ name: 'amostra.webm', mimeType: 'video/webm', buffer: Buffer.from(videoBytes) })
  await page.getByRole('button', { name: 'Ampliar amostra.webm' }).click()
  const video = page.getByRole('dialog').locator('video')
  await expect(video).toHaveJSProperty('controls', true)
  await expect.poll(() => video.evaluate((node) => node.videoWidth)).toBe(48)
  await page.keyboard.press('Escape')
  await page.getByRole('switch', { name: 'Mostrar carregamento' }).check()
  await expect(page.getByRole('button', { name: 'Carregar exemplo', exact: true })).toBeDisabled()
  await page.getByRole('button', { name: 'Limpar carregamento' }).click()
  await expect(page.getByRole('button', { name: 'Carregar exemplo', exact: true })).toBeEnabled()
  await page.getByLabel('Nota curta').fill('Exemplo com mais de vinte caracteres')
  await expect(page.getByLabel('Nota curta')).toHaveAttribute('aria-invalid', 'true')
  await checkAccess(page)
  // Switch only the inner host; aliases must resolve on each theme boundary.
  await page.goto(origin)
  const nested = page.locator('#nested-host')
  await nested.evaluate((node) => {
    node.dataset.nxTheme = 'mktauto'
    node.dataset.nxMode = 'dark'
  })
  await expect(page.getByTestId('nested-card')).toHaveCSS('background-color', 'rgb(24, 34, 53)')
  await expect(page.locator('#dark-host .nx-card').first()).toHaveCSS('background-color', 'rgb(20, 30, 43)')
  checks.push('Catalog interactions, native selection and nested cross-brand aliases')
}
