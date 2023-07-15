import chokidar from 'chokidar'
import { FSWatcher, promises as fs } from 'fs'
import path, { resolve } from 'path'
import { ResolvedConfig } from 'vite'

type ESLintGlobalsPropValue = boolean | 'readonly' | 'readable' | 'writable' | 'writeable'

interface ESLintConfigs {
  globals: Record<string, ESLintGlobalsPropValue>
}

type Options = Partial<{
  dtsDir: string
  filepath: string
  globalsPropValue: ESLintGlobalsPropValue
}>

const defaultOptions = {
  dtsDir: 'src/types',
  filepath: '.eslintrc-auto-import-types.json',
  globalsPropValue: true
}

export default function (options: Options = {}) {
  options = { ...defaultOptions, ...options }

  const { dtsDir, filepath, globalsPropValue } = options as Required<Options>
  const dirPath = resolve(process.cwd(), dtsDir)

  async function generateConfigFiles() {
    const filesPath = await fs.readdir(dirPath)
    const eslintConfigs: ESLintConfigs = { globals: {} }
    const dtsArr = []
    for (const filePath of filesPath) {
      const file = await fs.readFile(dirPath + path.sep + filePath, 'utf-8')
      const dts = file.match(/(?<=declare (namespace|type|interface) )[a-zA-Z0-9]*/g)
      if (Array.isArray(dts)) {
        dtsArr.push(...dts)
      }
    }
    for (const dts of dtsArr) {
      eslintConfigs.globals[dts] = globalsPropValue
    }
    fs.writeFile(filepath, JSON.stringify(eslintConfigs, null, 2), 'utf-8')
  }
  const setupWatcher = (watcher: FSWatcher) => {
    watcher.on('unlink', generateConfigFiles)
    watcher.on('add', generateConfigFiles)
  }

  return {
    name: 'auto-import-types',
    configResolved(config: ResolvedConfig) {
      generateConfigFiles()
      setupWatcher(chokidar.watch(defaultOptions.dtsDir))
    }
  }
}
