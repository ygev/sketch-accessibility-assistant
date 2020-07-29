import { resolve } from 'path'
import { testAssistant } from '@sketch-hq/sketch-assistant-utils'

import Assistant from '..'

test('test assistant', async () => {
  const { violations, ruleErrors } = await testAssistant(
    resolve(__dirname, './empty.sketch'),
    Assistant,
  )
  expect(violations[0].message).toBe('Hello world')
  expect(ruleErrors).toHaveLength(0)
})
