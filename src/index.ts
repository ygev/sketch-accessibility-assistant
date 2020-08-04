import { AssistantPackage } from '@sketch-hq/sketch-assistant-types'
import { AAContrastShape } from './rules/aa-contrast-shape'
import { AAContrastText } from './rules/aa-contrast-text'
import { AAAContrastText } from './rules/aaa-contrast-text'
import { textNotJustified } from './rules/text-not-justified'
import { textLineHeight } from './rules/text-line-height'

const assistant: AssistantPackage = async () => {
  return {
    name: 'sketch-accessibility-assistant',
    rules: [AAContrastText, AAAContrastText, AAContrastShape, textNotJustified, textLineHeight],
    config: {
      rules: {
        'sketch-accessibility-assistant/aa-contrast-text': {
          active: true,
        },
        'sketch-accessibility-assistant/aaa-contrast-text': {
          active: true,
        },
        'sketch-accessibility-assistant/aa-contrast-shape': {
          active: true,
        },
        'sketch-accessibility-assistant/text-not-justified': {
          active: true,
        },
        'sketch-accessibility-assistant/text-line-height': {
          active: true,
        },
      },
    },
  }
}

export default assistant
