import { rawlist } from '@inquirer/prompts'

import choices from './config.json'
import { commandExec } from './exec'

rawlist({
  message: '选择启动的平台',
  choices
}).then((res) => {
  commandExec(`pnpm dev:${res}`, {})
})
