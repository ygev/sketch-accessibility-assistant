import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'

export const textLineHeight: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    for (const layer of utils.objects.text) {
        var fontSize = layer.style?.textStyle?.encodedAttributes?.MSAttributedStringFontAttribute.attributes.size
        var lineHeight = layer.style?.textStyle?.encodedAttributes.paragraphStyle?.maximumLineHeight

        if (lineHeight == undefined || fontSize == undefined){
            continue
        }

        if (lineHeight >= fontSize * 1.5){
            continue
        } else if(lineHeight < fontSize * 1.5) {
            utils.report(`This layer's line height of ${lineHeight} is not high enough for accessible readibility. Try ${fontSize * 1.5} instead.`, layer)
        }
    }
  },
  name: 'sketch-accessibility-assistant/text-line-height',
  title: 'Line spacing must be at least 1.5x times the font size.',
  description:
    'The space between lines impacts readability.',
}
