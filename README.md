## Introduction

unl-map-js is a mapping library for developers of web applications, extending and enhacning functionalities of [maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js). Apart from the capabilities of maplibre, the package exposes the following controls:

- Grid lines and cells visualisation with a customisable precision;
- Tile selector, including vectorial, traffic, terrain, satellite and base options;
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
