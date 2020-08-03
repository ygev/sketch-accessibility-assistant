import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'

export const AAContrastOverlap: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    for (const artboard of utils.objects.artboard) {
      var maxLayers = artboard.layers.length
      for (var i = 0; i < maxLayers; i++) {
        for (var j = i; j < maxLayers; j++) {
          var botXmin = artboard.layers[i].frame.x
          var botYmin = artboard.layers[i].frame.y
          var botXmax = artboard.layers[i].frame.x + artboard.layers[i].frame.width
          var botYmax = artboard.layers[i].frame.y + artboard.layers[i].frame.height

          var topXmin = artboard.layers[j].frame.x
          var topYmin = artboard.layers[j].frame.y
          var topXmax = artboard.layers[j].frame.x + artboard.layers[j].frame.width
          var topYmax = artboard.layers[j].frame.y + artboard.layers[j].frame.height

          if (topXmin < botXmax && botXmin < topXmax && topYmin < botYmax && botYmin < topYmax) {
            continue
          } else {
            utils.report(`Layers i: ${artboard.layers[i].name} Layers j: ${artboard.layers[j].name} do not overlap.`, artboard.layers[i])
          }
        }
      }
    }
  },
  name: 'sketch-color-contrast/aa-contrast-overlap',
  title: 'All overlapping elements must meet AA compliance',
  description: 'There is not enough color contrast between the two shape elements.',
}
