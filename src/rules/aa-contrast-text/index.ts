import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'
import { calcLum, calcContrast } from '../../contrast'
import { Context } from 'vm'

function calcAAContrastText(sketchObject: Context, utils: Context) {
  var maxLayers = sketchObject.layers.length
  for (var i = 0; i < maxLayers; i++) {
    for (var j = 1; j < maxLayers; j++) {
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

        // Determine if top layer is a shape or text.
        if (sketchObject.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.red !== undefined) {
          topR = sketchObject.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.red
          topG = sketchObject.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.green
          topB = sketchObject.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.blue
        } else if (sketchObject.layers[j].style?.fills?.[0]?.color?.red !== undefined) {
          continue
        }

        // In any case, the bottom is a shape.
        var botR = sketchObject.layers[i].style?.fills?.[0]?.color?.red
        var botG = sketchObject.layers[i].style?.fills?.[0]?.color?.green
        var botB = sketchObject.layers[i].style?.fills?.[0]?.color?.blue

        // Don't crash if something is undefined.
        if (topR == undefined || topG == undefined || topB == undefined || botR == undefined || botG == undefined || botB == undefined) {
          continue
        }

        // Calculate Luminosity for Text RGB and Shape RGB
        var topLum = calcLum(topR, topG, topB)
        var botLum = calcLum(botR, botG, botB)
        var ratio = calcContrast(topLum, botLum)

        var txtSize = sketchObject.layers[j].style?.textStyle?.encodedAttributes.MSAttributedStringFontAttribute.attributes.size
        if (txtSize == undefined) {
          continue
        }

        // If the ratio is 4.5 and above, it passes AA.
        if (ratio >= 3 && txtSize >= 18) {
          // large-size AA pass
          continue
        } else if (ratio >= 4.5 && txtSize < 18) {
          // normal-size AA pass
          continue
        } else {
          // in other cases, AAA fail
          utils.report(`Layers ${sketchObject.layers[i].name} and ${sketchObject.layers[j].name} do not pass WCAG 2.1 AA, and their contrast ratio is: ${ratio.toFixed(2)}:1`, sketchObject.layers[j])
        }
      }
    }
  }
}

export const AAContrastText: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    for (const artboard of utils.objects.artboard) {
      calcAAContrastText(artboard, utils);
    }
    for (const group of utils.objects.group) {
      calcAAContrastText(group, utils);
    }
  },
  name: 'sketch-accessibility-assistant/aa-contrast-text',
  title: 'Text must meet AA color contrast compliance.',
  description: 'There is not enough color contrast between the two text elements.',
}
