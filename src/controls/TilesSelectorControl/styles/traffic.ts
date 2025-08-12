import {
  ENDPOINTS_VERSION,
  SANDBOX_TILES_BASE_URL,
  STAGING_TILES_BASE_URL,
  TILES_BASE_URL,
  TILES_ENDPOINTS_VERSION,
} from '../../../api/common/RestClient';
import Environment from '../../../map/models/Environment';

export default (env?: Environment) => {
  const baseUrl =
    env === Environment.STAGING
      ? STAGING_TILES_BASE_URL
      : env === Environment.SANDBOX
      ? SANDBOX_TILES_BASE_URL
      : TILES_BASE_URL;

  // Remove trailing slash if present
  const sanitizedBaseUrl = baseUrl.replace(/\/$/, '');

  return {
    version: 8,
    name: 'UNL_Traffic_1_Default',
    sources: {
      traffic: {
        type: 'raster',
        tiles: [
          `${sanitizedBaseUrl}/${TILES_ENDPOINTS_VERSION}/raster/1/{z}/{x}/{y}?surfaceTile=traffic`,
        ],
        tileSize: 256,
      },
    },
    glyphs: 'https://assets.vector.hereapi.com/fonts/{fontstack}/{range}.pbf',
    layers: [
      {
        id: 'traffic-tiles',
        type: 'raster',
        source: 'traffic',
        minzoom: 0,
        maxzoom: 22,
        layout: {
          visibility: 'visible',
        },
      },
    ],
  };
};
