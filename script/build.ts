import { rawlist } from '@inquirer/prompts'

import choices from './config.json'
import { commandExec } from './exec'

rawlist({
  message: '选择打包的平台',
  choices
}).then((res) => {
  commandExec(`pnpm build:${res}`, {})
})
