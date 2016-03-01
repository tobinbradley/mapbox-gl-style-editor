# mapbox-gl-style-editor

A basic code editor for Mapbox Gl Styles, inspired by [mapbox-gl-codeflow-example](https://github.com/mapbox/mapbox-gl-codeflow-example).

The primary differences in this one:

* Support for font processing via [genfontgl](https://github.com/sabas/genfontgl).
* Support for SVG processing via [spritezero-cli](https://github.com/mapbox/spritezero-cli).
* GL Spec validation moved from client to node.

To get started, first install the dependencies.

``` bash
npm install
```

Then start the server:
``` bash
gulp --style=bright
```

The style argument is a folder in styles folder. Each style folder should contain:

* The Mapbox GL style file as ```style.json```.
* A ```font``` folder containing any font files to be converted to protobuf.
* A ```svg``` folder containing SVG's to be rendered to a sprite file.

When finished, the style file and rendered assets are in the ```app``` folder.
