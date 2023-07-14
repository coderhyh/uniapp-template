import chokidar from 'chokidar'
import fs from 'fs'
import { ResolvedConfig } from 'vite'

export const autoUpdatePages = () => {
  const pagePath = 'src/pages'
  const pagesJSONPath = './src/pages.json'
  const setupWatcher = (watcher: fs.FSWatcher) => {
    watcher.on('unlink', (path: string) => {
      const pagesFile = fs.readFileSync(pagesJSONPath, { encoding: 'utf-8' })
      const pagesJSON = JSON.parse(pagesFile)
      const oldLength = pagesJSON.pages.length
      pagesJSON.pages = pagesJSON.pages.filter((e: any) => !path.includes(e.path))
      const newLength = pagesJSON.pages.length
      oldLength !== newLength && fs.writeFileSync(pagesJSONPath, JSON.stringify(pagesJSON, null, 2) + '\n')
    })
  }
  return {
    name: 'auto-update-pages',
    configResolved(config: ResolvedConfig) {
      if (config.build.watch && config.command === 'build') setupWatcher(chokidar.watch(pagePath))
    }
  }
}

export default autoUpdatePages
