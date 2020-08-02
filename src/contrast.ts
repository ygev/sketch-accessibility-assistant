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

export { calcLum, calcContrast }
