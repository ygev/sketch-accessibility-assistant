# ```aa-contrast-shape```

## Specifies which shape layers do not pass WCAG 2.1 AA color contrast compliance.

### Rationale
>#### [WCAG 2.1 Success Criterion 1.4.11 Non-text Contrast](https://www.w3.org/TR/WCAG21/#non-text-contrast)
> The intent of this Success Criterion is to provide enough contrast for interactive user interface components, form field borders, focus and selection indicators so they can be perceived by people with moderately low vision (who do not use contrast-enhancing assistive technology). People with low vision often have difficulty perceiving graphics that have insufficient contrast. This can be exacerbated if the person has a color vision deficiency that lowers the contrast even further. Providing a relative luminance (lightness) difference of 4.5:1 or greater can make these items more distinguishable when the person does not see a full range of colors and does not use assistive technology. **When non-text content is larger, a color contrast of 3:1 or greater can be sufficient for perception by people with moderately low vision.** [Source](https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)#Benefits) 

### Default Configuration

```js
{
  "active": true,
}
```
