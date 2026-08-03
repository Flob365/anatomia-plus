import { cp, mkdir, readdir, rename, rm, writeFile } from 'node:fs/promises'

const distDirectory = new URL('../dist/', import.meta.url)
const temporaryDirectory = new URL('../.sites-client-build/', import.meta.url)
const clientDirectory = new URL('../dist/client/', import.meta.url)
const serverDirectory = new URL('../dist/server/', import.meta.url)

await rm(temporaryDirectory, { recursive: true, force: true })
await mkdir(temporaryDirectory, { recursive: true })

for (const entry of await readdir(distDirectory)) {
  await rename(
    new URL(entry, distDirectory),
    new URL(entry, temporaryDirectory),
  )
}

await mkdir(clientDirectory, { recursive: true })
for (const entry of await readdir(temporaryDirectory)) {
  await rename(
    new URL(entry, temporaryDirectory),
    new URL(entry, clientDirectory),
  )
}
await rm(temporaryDirectory, { recursive: true, force: true })

await mkdir(serverDirectory, { recursive: true })
await writeFile(
  new URL('index.js', serverDirectory),
  `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404) return response

    const acceptsHtml = request.headers.get('accept')?.includes('text/html')
    if (!acceptsHtml) return response

    const indexUrl = new URL('/index.html', request.url)
    return env.ASSETS.fetch(new Request(indexUrl, request))
  },
}
`,
)

await mkdir(new URL('../dist/.openai/', import.meta.url), { recursive: true })
await cp(
  new URL('../.openai/hosting.json', import.meta.url),
  new URL('../dist/.openai/hosting.json', import.meta.url),
  { force: true },
)
