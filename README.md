# mapbox-gl-style-editor

A basic code editor for Mapbox Gl Styles, inspired by [mapbox-gl-codeflow-example](https://github.com/mapbox/mapbox-gl-codeflow-example).

To get started:

```bash
git clone https://github.com/tobinbradley/mapbox-gl-style-editor.git
cd mapbox-gl-style-editor
npm install
npm start
```

If you have a GL JS style file you want to work on, save it as `src/gl-style/style.json` and get cracking!

Additional features:

* If your style changes are not valid per the Mapbox GL Style Specification, it will display the error in the web browser.
* Clicking on a feature will give you information on the feature from the style file.