import { AssistantPackage, RuleDefinition } from '@sketch-hq/sketch-assistant-types'

const textNoLoremIpsum: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    // Iterate
    for (const group of utils.objects.group) {
      if (group.layers.length > 2 || group.layers.length <= 1) {
        continue
      } else {
        utils.report(`Here are the layers:“${group.name}”`, group)
      }
    }
  },
  name: 'sketch-color-contrast/text-no-lorem-ipsum',
  title: 'Color contrast should pass WCAG 2.1 AA.',
  description: 'Color contrast does not pass WCAG 2.1 AA.',
}

const assistant: AssistantPackage = async () => {
  return {
    name: 'sketch-color-contrast',
    rules: [textNoLoremIpsum],
    config: {
      rules: {
        'sketch-color-contrast/text-no-lorem-ipsum': {
          active: true,
        },
      },
    },
  }
}

export default assistant
