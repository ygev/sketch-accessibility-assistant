import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'
import { calcLum, calcContrast } from '../../contrast'

export const AAContrastShape: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    for (const group of utils.objects.group) {
      if (group.layers.length == 2) {
        if (group.layers[0]._class == 'text' && group.layers[1]._class == 'text') {
          continue
        } else {
          // If Shape vs. Text
          var topR
          var topG
          var topB

          if (group.layers[1].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.red !== undefined) {
            continue
          } else if (group.layers[1].style?.fills?.[0]?.color?.red !== undefined) {
            topR = group.layers[1].style?.fills?.[0]?.color?.red
            topG = group.layers[1].style?.fills?.[0]?.color?.green
            topB = group.layers[1].style?.fills?.[0]?.color?.blue
          }

          var botR = group.layers[0].style?.fills?.[0]?.color?.red
          var botG = group.layers[0].style?.fills?.[0]?.color?.green
          var botB = group.layers[0].style?.fills?.[0]?.color?.blue

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
            utils.report(`These shape elements do not pass WCAG 2.1 AA, and their contrast ratio is: ${ratio.toFixed(2)}:1`, group)
          }
        }
      }
    }
  },
  name: 'sketch-color-contrast/aa-contrast-shape',
  title: 'Shapes must meet AA color contrast compliance.',
  description: 'There is not enough color contrast between the two shape elements.',
}
