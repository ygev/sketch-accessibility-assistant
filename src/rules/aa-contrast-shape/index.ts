import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'
import { calcLum, calcContrast } from '../../contrast'

export const AAContrastShape: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    for (const artboard of utils.objects.artboard) {
      var maxLayers = artboard.layers.length
      for (var i = 0; i < maxLayers; i++) {
        for (var j = i + 1; j < maxLayers; j++) {
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

            // if text (that is, if text color is defined), skip it
            if (artboard.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.red !== undefined) {
              //utils.report(`text red is uhhh ${artboard.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.red}`, artboard.layers[j], artboard.layers[j])
              continue
            } else if (artboard.layers[j].style?.fills?.[0]?.color?.red !== undefined) {
              topR = artboard.layers[j].style?.fills?.[0]?.color?.red
              topG = artboard.layers[j].style?.fills?.[0]?.color?.green
              topB = artboard.layers[j].style?.fills?.[0]?.color?.blue
            } else {
              continue
            }

            var botR = artboard.layers[i].style?.fills?.[0]?.color?.red
            var botG = artboard.layers[i].style?.fills?.[0]?.color?.green
            var botB = artboard.layers[i].style?.fills?.[0]?.color?.blue

            if (topR == undefined || topG == undefined || topB == undefined || botR == undefined || botG == undefined || botB == undefined) {
              continue
            }

            // Calculate Luminosity for Text RGB and Shape RGB
            var topLum = calcLum(topR, topG, topB)
            var botLum = calcLum(botR, botG, botB)

            var ratio = calcContrast(topLum, botLum)

            if (ratio >= 4.5) {
              // normal-size AA pass
              continue
            } else {
              // normal-size AA fail
              utils.report(
                `[debug: i:${i}, j:${j}] Layers ${artboard.layers[i].name} and ${artboard.layers[j].name} do not pass WCAG 2.1 AA, and their contrast ratio is: ${ratio.toFixed(2)}:1`,
                artboard.layers[j],
              )
            }
          }
        }
      }
    }
  },
  name: 'sketch-accessibility-assistant/aa-contrast-shape',
  title: 'Shapes must meet AA color contrast compliance.',
  description: 'There is not enough color contrast between the two shape elements.',
}
