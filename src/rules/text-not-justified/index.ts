import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'

export const textNotJustified: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    for (const layer of utils.objects.text) {
      var alignment = layer.style?.textStyle?.encodedAttributes?.paragraphStyle?.alignment
      if (alignment == undefined) {
        continue
      }
      if (alignment == 3) {
        utils.report(`Layer "${layer.name}" has justified text.`, layer)
      }
    }
  },
  name: 'sketch-accessibility-assistant/text-not-justified',
  title: 'Text must not be justified.',
  description:
    'TJustification makes reading more difficult because extra space between words causes "rivers of white" making it difficult to track along a line of text, or less space between words makes it difficult to distinguish separate words.',
}
