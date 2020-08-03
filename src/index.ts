import { AssistantPackage } from '@sketch-hq/sketch-assistant-types'
import { AAContrastShape } from './rules/aa-contrast-shape'
import { AAContrastText } from './rules/aa-contrast-text'
import { AAAContrastText } from './rules/aaa-contrast-text'
import { textNotJustified } from './rules/text-not-justified'

const assistant: AssistantPackage = async () => {
  return {
    name: 'sketch-color-contrast',
    rules: [AAContrastText, AAAContrastText, AAContrastShape, textNotJustified],
    config: {
      rules: {
        'sketch-color-contrast/aa-contrast-text': {
          active: true,
        },
        'sketch-color-contrast/aaa-contrast-text': {
          active: true,
        },
        'sketch-color-contrast/aa-contrast-shape': {
          active: true,
        },
        'sketch-color-contrast/text-not-justified': {
          active: true,
        },
      },
    },
  }
}

export default assistant
