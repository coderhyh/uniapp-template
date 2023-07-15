import chokidar from 'chokidar'
import fs from 'fs'
import path from 'path'
import { ResolvedConfig } from 'vite'

export const autoUpdatePages = () => {
  const pagePath = 'src/pages'
  const pagesJSONPath = './src/pages.json'
  const getPagesJSON = () => {
    const pagesFile = fs.readFileSync(pagesJSONPath, { encoding: 'utf-8' })
    return JSON.parse(pagesFile)
  }
  const init = () => {
    const pagesJSON = getPagesJSON()
    const pagesDir = fs.readdirSync(pagePath)
    pagesJSON.pages = pagesJSON.pages.filter((e: any) => pagesDir.includes(e.path.split('/').at(-1)))
    fs.writeFileSync(pagesJSONPath, JSON.stringify(pagesJSON, null, 2) + '\n')
  }
  const setupWatcher = (watcher: fs.FSWatcher) => {
    watcher.on('unlink', (unlinkPath: string) => {
      if (path.extname(unlinkPath) !== '.vue') return
      const pagesJSON = getPagesJSON()
      const oldLength = pagesJSON.pages.length
      pagesJSON.pages = pagesJSON.pages.filter((e: any) => !unlinkPath.includes(e.path))
      const newLength = pagesJSON.pages.length
      oldLength !== newLength && fs.writeFileSync(pagesJSONPath, JSON.stringify(pagesJSON, null, 2) + '\n')
    })
  }
  return {
    name: 'auto-update-pages',
    configResolved(config: ResolvedConfig) {
      init()
      setupWatcher(chokidar.watch(pagePath))
    }
  }
}

export default autoUpdatePages
