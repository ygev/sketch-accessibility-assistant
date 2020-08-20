import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'
import { calcLum, calcContrast } from '../../contrast'
import { Context } from 'vm'

function calcAAContrastShape(sketchObject: Context, utils: Context){
  var maxLayers = sketchObject.layers.length
  for (var i = 0; i < maxLayers; i++) {
    for (var j = i + 1; j < maxLayers; j++) {
      var botXmin = sketchObject.layers[i].frame.x
      var botYmin = sketchObject.layers[i].frame.y
      var botXmax = sketchObject.layers[i].frame.x + sketchObject.layers[i].frame.width
      var botYmax = sketchObject.layers[i].frame.y + sketchObject.layers[i].frame.height

      var topXmin = sketchObject.layers[j].frame.x
      var topYmin = sketchObject.layers[j].frame.y
      var topXmax = sketchObject.layers[j].frame.x + sketchObject.layers[j].frame.width
      var topYmax = sketchObject.layers[j].frame.y + sketchObject.layers[j].frame.height

      if (topXmin < botXmax && botXmin < topXmax && topYmin < botYmax && botYmin < topYmax) {
        var topR
        var topG
        var topB

        // if text (that is, if text color is defined), skip it
        if (sketchObject.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.red !== undefined) {
          continue
        } else if (sketchObject.layers[j].style?.fills?.[0]?.color?.red !== undefined) {
          topR = sketchObject.layers[j].style?.fills?.[0]?.color?.red
          topG = sketchObject.layers[j].style?.fills?.[0]?.color?.green
          topB = sketchObject.layers[j].style?.fills?.[0]?.color?.blue
        } else {
          continue
        }

        var botR = sketchObject.layers[i].style?.fills?.[0]?.color?.red
        var botG = sketchObject.layers[i].style?.fills?.[0]?.color?.green
        var botB = sketchObject.layers[i].style?.fills?.[0]?.color?.blue

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
            `[debug: i:${i}, j:${j}] Layers ${sketchObject.layers[i].name} and ${sketchObject.layers[j].name} do not pass WCAG 2.1 AA, and their contrast ratio is: ${ratio.toFixed(2)}:1`,
            sketchObject.layers[j],
          )
        }
      }
    }
  }
}

export const AAContrastShape: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    for (const artboard of utils.objects.artboard) {
      calcAAContrastShape(artboard, utils)
    }
    for (const group of utils.objects.group) {
      calcAAContrastShape(group, utils)
    }
  },
  name: 'sketch-accessibility-assistant/aa-contrast-shape',
  title: 'Shapes must meet AA color contrast compliance.',
  description: 'There is not enough color contrast between the two shape elements.',
}
