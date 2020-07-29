import { AssistantPackage, RuleDefinition } from '@sketch-hq/sketch-assistant-types'

const helloWorld: RuleDefinition = {
  rule: async (context) => {
    context.utils.report('Hello world')
  },
  name: 'sketch-assistant-template/hello-world',
  title: 'Hello World',
  description: 'Reports a hello world message',
}

const assistant: AssistantPackage = async () => {
  return {
    name: 'sketch-assistant-template',
    rules: [helloWorld],
    config: {
      rules: {
        'sketch-assistant-template/hello-world': { active: true },
      },
    },
  }
}

export default assistant
