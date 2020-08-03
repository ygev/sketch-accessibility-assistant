import { AssistantPackage } from '@sketch-hq/sketch-assistant-types'
import { AAContrastShape } from './rules/aa-contrast-shape'
import { AAContrastText } from './rules/aa-contrast-text'
import { AAAContrastText } from './rules/aaa-contrast-text'
import { AAContrastOverlap } from './rules/aa-contrast-overlap'

const assistant: AssistantPackage = async () => {
  return {
    name: 'sketch-color-contrast',
    rules: [AAContrastShape, AAContrastText, AAAContrastText, AAContrastOverlap],
    config: {
      rules: {
        'sketch-color-contrast/aa-contrast-shape': {
          active: true,
        },
        'sketch-color-contrast/aa-contrast-overlap': {
          active: true,
        },
        'sketch-color-contrast/aa-contrast-text': {
          active: true,
        },
        'sketch-color-contrast/aaa-contrast-text': {
          active: false,
        },
      },
    },
  }
}

export default assistant
