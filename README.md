<h1 align="center">
  <img align="center" src="https://i.imgur.com/ijYtOhk.png" width="125" alt="icon">
<br>
  <h1 align="center">Sketch Accessibility Assistant</h1>
 <p align="center">
  <img src="https://i.imgur.com/cstmMYz.png" width="500" alt="Accessibility Assistant in action.">
</p>
  <p align="center">
    <a href="mailto:ygis@mit.edu">
      <img src="https://img.shields.io/badge/Sketch-68+-blue.svg?style=flat" alt="Contact">
    </a>
    <a href="https://opensource.org/licenses/GPL-3.0">
      <img src="https://img.shields.io/badge/License-GPL 3.0-blue.svg" alt="License: GPL 3.0">
    </a>
  </p>
</h1>

The Accessibility Assistant ensures that your Sketch elements pass AA+ compliance based on the Web Content Accessibility Guidelines. This is a contribution to the Assistants feature launch for Sketch 68. Unlike an accessibility plugin, an assistant automatically detects accessibility infractions and sends out a notification. If you'd like to learn more about Sketch Assistants and how they differ from Sketch plugins, please [read the documentation on Sketch's website.](https://www.sketch.com/docs/assistants/)

## Rules

- [Shapes must meet AA color contrast compliance.](https://github.com/ygev/sketch-accessibility-assistant/tree/main/src/rules/aa-contrast-shape)
- [Text must meet AA color contrast compliance.](https://github.com/ygev/sketch-accessibility-assistant/tree/main/src/rules/aa-contrast-text)
- [Text must meet AAA color contrast compliance.](https://github.com/ygev/sketch-accessibility-assistant/tree/main/src/rules/aaa-contrast-text)
  - Works only if the 2 layers are grouped.
  - Set to `false` by default.

👉 Click [here](https://add-sketch-assistant.now.sh/api/main?pkg=@ygev/sketch-accessibility-assistant)
to add to your Sketch document.

> Or, add using a Sketch release variant:
> [Beta](https://add-sketch-assistant.now.sh/api/main?variant=beta&pkg=@ygev/sketch-accessibility-assistant)
> |
> [Private](https://add-sketch-assistant.now.sh/api/main?variant=private&pkg=@ygev/sketch-accessibility-assistant)
> |
> [Internal](https://add-sketch-assistant.now.sh/api/main?variant=internal&pkg=@ygev/sketch-accessibility-assistant)
> |
> [Experimental](https://add-sketch-assistant.now.sh/api/main?variant=experimental&pkg=@ygev/sketch-accessibility-assistant)
> |
> [Xcode](https://add-sketch-assistant.now.sh/api/main?variant=xcode&pkg=@ygev/sketch-accessibility-assistant)
