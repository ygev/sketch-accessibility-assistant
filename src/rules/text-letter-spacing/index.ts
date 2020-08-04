import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'

export const textLetterSpacing: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    for (const layer of utils.objects.text) {
        var fontSize = layer.style?.textStyle?.encodedAttributes?.MSAttributedStringFontAttribute.attributes.size
        var letterSpacing = layer.style?.textStyle?.encodedAttributes.kerning

        if (letterSpacing == undefined || fontSize == undefined){
            continue
        }

        if (letterSpacing >= fontSize * 0.12){
            continue
        } else if(letterSpacing < fontSize * 0.12) {
            utils.report(`This layer's letter-spacing of ${letterSpacing} is not high enough for accessible readibility. Try ${fontSize * 0.12} instead.`, layer)
        }
    }
  },
  name: 'sketch-accessibility-assistant/text-letter-spacing',
  title: 'Letter spacing must be at least 0.12x times the font size.',
  description:
    'The space between letters impacts readability.',
}
