import { AssistantPackage } from '@sketch-hq/sketch-assistant-types'
import { AAContrastShape } from './rules/aa-contrast-shape'
import { AAContrastText } from './rules/aa-contrast-text'

const assistant: AssistantPackage = async () => {
  return {
    name: 'sketch-color-contrast',
    rules: [AAContrastShape, AAContrastText],
    config: {
      rules: {
        'sketch-color-contrast/aa-contrast-shape': {
          active: true,
        },
        'sketch-color-contrast/aa-contrast-text': {
          active: true,
        },
      },
    },
  }
}

export default assistant
