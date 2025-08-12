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
    name: 'UNL_Terrain_1_Default',
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          `${sanitizedBaseUrl}/${TILES_ENDPOINTS_VERSION}/raster/1/{z}/{x}/{y}?surfaceTile=terrain`,
        ],
        tileSize: 512,
      },
    },
    glyphs: 'https://assets.vector.hereapi.com/fonts/{fontstack}/{range}.pbf',
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 22,
        layout: {
          visibility: 'visible',
        },
      },
    ],
  };
};
