import { AssistantPackage, RuleDefinition } from '@sketch-hq/sketch-assistant-types'

// Calculating Luminance from r g b values
function calcLum(r: number, g: number, b: number) {
  var r_lum = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
  var g_lum = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
  var b_lum = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
  var luminance = 0.2126 * r_lum + 0.7152 * g_lum + 0.0722 * b_lum
  return luminance
}

// Calculating Ratio
function calcContrast(t: number, b: number) {
  return (Math.max(t, b) + 0.05) / (Math.min(t, b) + 0.05)
}

const textNoLoremIpsum: RuleDefinition = {
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
            topR = group.layers[1].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.red
            topG = group.layers[1].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.green
            topB = group.layers[1].style?.textStyle?.encodedAttributes.MSAttributedStringColorAttribute?.blue
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
            utils.report(`These elements do not pass WCAG 2.1 AAe, because the contrast ratio is: ${ratio.toFixed(2)}:1`, group)
          }
        }
      }
    }
  },
  name: 'sketch-color-contrast/text-no-lorem-ipsum',
  title: 'Color contrast should pass WCAG 2.1 AA.',
  description: 'There is not enough color contrast between the two elements.',
}

const assistant: AssistantPackage = async () => {
  return {
    name: 'sketch-color-contrast',
    rules: [textNoLoremIpsum],
    config: {
      rules: {
        'sketch-color-contrast/text-no-lorem-ipsum': {
          active: true,
        },
      },
    },
  }
}

export default assistant
