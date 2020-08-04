import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'
import { calcLum, calcContrast } from '../../contrast'

export const AAAContrastText: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    for (const artboard of utils.objects.artboard) {
      var maxLayers = artboard.layers.length
      for (var i = 0; i < maxLayers; i++) {
        for (var j = 1; j < maxLayers; j++) {
          var botXmin = artboard.layers[i].frame.x
          var botYmin = artboard.layers[i].frame.y
          var botXmax = artboard.layers[i].frame.x + artboard.layers[i].frame.width
          var botYmax = artboard.layers[i].frame.y + artboard.layers[i].frame.height

          var topXmin = artboard.layers[j].frame.x
          var topYmin = artboard.layers[j].frame.y
          var topXmax = artboard.layers[j].frame.x + artboard.layers[j].frame.width
          var topYmax = artboard.layers[j].frame.y + artboard.layers[j].frame.height

          if (topXmin < botXmax && botXmin < topXmax && topYmin < botYmax && botYmin < topYmax) {
            var topR
            var topG
            var topB

            // Determine if top layer is a shape or text.
            if (artboard.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.red !== undefined) {
              topR = artboard.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.red
              topG = artboard.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.green
              topB = artboard.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.blue
            } else if (artboard.layers[j].style?.fills?.[0]?.color?.red !== undefined) {
              continue
            }

            // In any case, the bottom is a shape.
            var botR = artboard.layers[i].style?.fills?.[0]?.color?.red
            var botG = artboard.layers[i].style?.fills?.[0]?.color?.green
            var botB = artboard.layers[i].style?.fills?.[0]?.color?.blue

            // Don't crash if something is undefined.
            if (topR == undefined || topG == undefined || topB == undefined || botR == undefined || botG == undefined || botB == undefined) {
              continue
            }

            // Calculate Luminosity for Text RGB and Shape RGB
            var topLum = calcLum(topR, topG, topB)
            var botLum = calcLum(botR, botG, botB)
            var ratio = calcContrast(topLum, botLum)

            var txtSize = artboard.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringFontAttribute.attributes.size
            if (txtSize == undefined) {
              continue
            }

            // If the ratio is 4.5 and above, it passes AAA.
            if (ratio >= 4.5 && txtSize >= 18) {
              // large-size AAA pass
              continue
            } else if (ratio >= 7 && txtSize < 18) {
              // normal-size AAA pass
              continue
            } else {
              // in other cases, AAA fail
              utils.report(`Layers ${artboard.layers[i].name} and ${artboard.layers[j].name} do not pass WCAG 2.1 AAA, and their contrast ratio is: ${ratio.toFixed(2)}:1`, artboard.layers[j])
            }
          }
        }
      }
    }
  },
  name: 'sketch-accessibility-assistant/aaa-contrast-text',
  title: 'Text must meet AAA color contrast compliance.',
  description: 'There is not enough color contrast between the two text elements.',
}
