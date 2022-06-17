## Introduction

unl-map-js is a mapping library for developers of web applications, extending and enhancing functionalities of [maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js). Apart from the capabilities of maplibre, the package exposes the following controls:

- UNL grid lines and cells visualisation with a customisable precision;
- Tile selector, including 'vectorial', 'traffic', 'terrain', 'satellite' and 'base' options;
- Indoor maps overlay in the [IMDF](https://register.apple.com/resources/imdf/) format;
- Drawing tools for creating, updating and deleting draft shapes;

## Getting started

### Installing

```
npm install unl-map-js
```

### Usage in your application

#### Javascript

##### When using modules

```
import UnlSdk from "unl_map_sdk";
```

##### When using CDN

```
<script src='../v1.0.0/unl-map-js.js'></script>
```

#### CSS

##### When using modules

```
import 'unl-map-js/lib/unl-map-js.css'
```

##### When using CDN

```
<link rel='stylesheet' href='../unl-map-js/v1.0.0/unl-map-js.css' type='text/css' />
```

#### Typescript

Typescript definition files are included as part of the same package.

## Initializing the map

In order to initialise

#### Example usage

##### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="../lib/unl-map-js.css" />
    <link rel="stylesheet" href="styles.css" />
    <title>Hello world</title>
  </head>
  <body>
    <div id="map" class="map"></div>
    <script type="module" src="./dist/index.js"></script>
  </body>
</html>
```

##### index.js

```js
import UnlSdk from "unl_map_sdk";

const map = new UnlSdk.Map({
  apiKey: <YOUR-UNL-API-KEY>,
  vpmId: <YOUR-VPM-ID>,
  gridControl: true,
  gridControlPosition: "bottom-right",
  indoorMapsControl: true,
  mapTilesControl: true,
  draftShapesControl: true,
  container: "map",
  center: [0, 0],
  zoom: 1,
});
```

## Custom controls

On top of the maplibre-gl-js, this package exposes the following custom controls that can be initialised during the map instantiation with the default options or added later using the `addControl` function on the map reference. All of them allow to specify the position of the control on the map: 'top-right', 'bottom-right', 'bottom-left', 'top-left'.

### UNL grid and cells

Grid and cells control can be enabled during the map initialization by passing the `gridControl` `true`. The `gridControlPosition` parameter will dictate the position of the control button. If no position is specified, the control defaults to 'top-right'. This first approach will load the grid control with the default options.

```js
const map = new UnlSdk.Map({
  ...
  gridControl: true,
  gridControlPosition: "bottom-right",
  ...
});
```

It can also be added later by calling the `addControl` function on the map reference:

```js
import UnlSdk from "unl_map_sdk";

const map = new UnlSdk.Map({
    ...
});

map.addControl(new UnlSdk.GridControl(), "bottom-right");
```

If the second approach is chosen, the following options can be specified during the `GridControl` initialization:

| Option           | Type            | Default   | Description                                                                      |
| ---------------- | --------------- | --------- | -------------------------------------------------------------------------------- |
| defaultPrecision | `CellPrecision` | 9         | Default precision of the cells. It can be changed manually via the grid selector |
| lineColor        | `string`        | "#C0C0C0" | Grid line's colour                                                               |
| lineWidth        | `number`        | 0.5       | Grid line's width                                                                |
| cellFillColor    | `string`        | "#FFB100" | Cell's colour                                                                    |
| cellBorderColor  | `string`        | "#FFB100" | Cell's border colour                                                             |

If GridControl is enabled, the cell will get highlighted by clicking on the map. It will render a popup displaying the geohash of the correspoding selected cell. For performance reasons, the grid lines will be generated at different zoom levels, dependant on the selected precision, according to the following table:

| Precision | Zoom level |
| --------- | ---------- |
| 10        | 20         |
| 9         | 18         |
| 8         | 16         |
| 7         | 14         |
| 6         | 12         |
| 5         | 10         |
| 4         | 8          |
| 3         | 4          |
| 2         | 3          |
| 1         | 2          |

![Grid lines and cell](https://github.com/u-n-l/unl-map-js/blob/main/docs/gifs/grid_lines.gif?raw=true)
![Grid precision selection](https://github.com/u-n-l/unl-map-js/blob/main/docs/gifs/grid_selector.gif?raw=true)

### Tiles selector

Tile selector control can be enabled during the map initialization by passing the `mapTilesControl` `true`. The `mapTilesControlPosition` parameter will dictate the position of the tile selector. If no position is specified, the control defaults to 'top-left'.

```js
const map = new UnlSdk.Map({
  ...
  mapTilesControl: true,
  mapTilesControlPosition: "bottom-right",
  ...
});
```

It can also be added later by calling the `addControl` function on the map reference:

```js
import UnlSdk from "unl_map_sdk";

const map = new UnlSdk.Map({
    ...
});

map.addControl(new UnlSdk.MapTilesControl(), "bottom-right");
```

If the second approach is chosen, the following options can be specified during the `MapTilesControl` initialization:

| Option                 | Type          | Default                                                  | Description                                             |
| ---------------------- | ------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| styles                 | MapTilesStyle | ["vectorial", "traffic", "terrain", "satellite", "base"] | The options that will be included in the tiles selector |
| displayControlsDefault | boolean       | true                                                     | Display the default tile selector UI                    |

![Tile selector](https://github.com/u-n-l/unl-map-js/blob/main/docs/gifs/tile_selector.gif?raw=true)

#### API Methods

`new MapTilesControl()` returns an instance of MapTilesControl with the following API:

### `set(style: MapTilesStyle) => void`

This method takes a `MapTilesStyle` parameter and updates the selected tile from the map.
The supported MapTilesStyle properties are: `vector`, `traffic`, `terrain`, `satellite`, `base`.

Example

```js
const mapTilesControl = new UnlSdk.MapTilesControl(
  { displayControlsDefault: false },
  "top-left"
);

map.addControl(mapTilesControl);

mapTilesControl.setStyle("terrain");
```

### Indoor maps overlay

Indoor maps overlay control can be enabled during the map initialization by passing the `indoorMapsControl` `true`. The `indoorMapsControlPosition` parameter will dictate the position of the venue level selector buttons. If no position is specified, the control defaults to 'top-right'.

It can also be added later by calling the `addControl` function on the map reference:

```js
import UnlSdk from "unl_map_sdk";

const map = new UnlSdk.Map({
    ...
});

map.addControl(new UnlSdk.IndoorControl(), "bottom-right");
```

Enabling the indoor maps overlay, will fetch the venue maps and render the marker and outer area of the venues that were uploaded in the vpm whose id is passed as part of the map initialization. By clicking on a venue, the full venue data will be downloaded, rendering the venue units and facilities, along with the level selector buttons.

![Indoor maps overlay](https://github.com/u-n-l/unl-map-js/blob/main/docs/gifs/indoor_overlays.gif?raw=true)

### Draft shapes

Draft shapes control can be enabled during the map initialization by passing the `draftShapesControl` `true`. The `draftShapesControlPosition` parameter will dictate the position of the venue level selector buttons. If no position is specified, the control defaults to 'top-left'.

It can also be added later by calling the `addControl` function on the map reference:

```js
import UnlSdk from "unl_map_sdk";

const map = new UnlSdk.Map({
    ...
});

map.addControl(new UnlSdk.DraftShapesControl(), "bottom-right");
```

Enabling the draft shapes control, will fetch and render all the shapes added in the vpm whose id is passed during the map initialization. Additionaly, by clicking on a shape, it can be moved or edited. New shapes can be created: polygon, circle or rectangles, via the three corresponding control buttons.
![Draft shapes creation & editing and delete](https://github.com/u-n-l/unl-map-js/blob/main/docs/gifs/draft_shapes.gif?raw=true)
