import { AssistantPackage, RuleDefinition } from '@sketch-hq/sketch-assistant-types'

const helloWorld: RuleDefinition = {
  rule: async (context) => {
    context.utils.report('Hello world')
  },
  name: 'sketch-color-contrast/hello-world',
  title: 'Hello World',
  description: 'Reports a hello world message',
}

const assistant: AssistantPackage = async () => {
  return {
    name: 'sketch-color-contrast',
    rules: [helloWorld],
    config: {
      rules: {
        'sketch-color-contrast/hello-world': { active: true },
      },
    },
  }
}

export default assistant
