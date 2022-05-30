// import VenueMarkerIcon from "../../icons/png/venue-marker-icon.png";
import { MapMouseEvent } from "maplibre-gl";
import UnlApi from "../../api/UnlApi";
import ImdfVenueData from "../../api/venues/models/ImdfVenueData";
import Base from "../Base/Base";
import {
  venueFootprintFillLayer,
  venueLevelFillLayer,
  venueLevelLineLayer,
  venueMarkersSymbolLayer,
  venueOpeningLineLayer,
  venueUnitMarkersSymbolLayer,
  venueUnitsFillLayer,
  venueUnitsLineLayer,
  VENUE_FOOTPRINT_FILL_LAYER,
  VENUE_FOOTPRINT_SOURCE,
  VENUE_LEVEL_FILL_LAYER,
  VENUE_LEVEL_LINE_LAYER,
  VENUE_LEVEL_SOURCE,
  VENUE_MARKERS_SOURCE,
  VENUE_MARKERS_SYMBOL_LAYER,
  VENUE_OPENINGS_LINE_LAYER,
  VENUE_OPENINGS_SOURCE,
  VENUE_UNITS_FILL_LAYER,
  VENUE_UNITS_LINE_LAYER,
  VENUE_UNITS_SOURCE,
  VENUE_UNIT_MARKERS_SOURCE,
  VENUE_UNIT_MARKERS_SYMBOL_LAYER,
} from "./layers";
import { featureCollection, venuesToFeatureCollection } from "./helpers";
import { ImdfFeatureType } from "../../api/venues/models/ImdfFeatureType";
import ImdfFeature from "../../api/venues/models/ImdfFeature";

const DISPLAYED_FEATURE_TYPES = [
  ImdfFeatureType.LEVEL,
  ImdfFeatureType.UNIT,
  ImdfFeatureType.OPENING,
  ImdfFeatureType.VENUE,
];

export interface IndoorControlOptions {}

export default class IndoorControl extends Base {
  imdfVenueData?: {
    [level: number]: ImdfVenueData | undefined;
  };

  constructor() {
    super();
  }

  updateVenueMapLayers = () => {
    const venueLevelSource: maplibregl.GeoJSONSource = this.map.getSource(
      VENUE_LEVEL_SOURCE
    ) as maplibregl.GeoJSONSource;

    // const venueUnitsSource: maplibregl.GeoJSONSource = this.map.getSource(
    //   VENUE_UNITS
    // )

    // if (venueLevelSource) {
    //   venueLevelSource.setData(this.imdfVenueData?[0].level);
    // }

    // if (venueFootprintSource) {
    //   const featureColl = venuesToFeatureCollection(false, records.items);
    //   venueFootprintSource.setData(featureColl);
    // }
  };

  handleVenueClick = (e: MapMouseEvent) => {
    //@ts-ignore
    const venueId = e.features[0].properties.id;

    if (!venueId) {
      return;
    }

    const unlApi = new UnlApi({ apiKey: this.map.getApiKey() });
    unlApi.venuesApi
      .getImdfFeatures(this.map.getVpmId(), venueId, 0, DISPLAYED_FEATURE_TYPES)
      .then((imdfData: ImdfFeature[]) => {
        const levels: GeoJSON.Feature[] = [];
        const unit: GeoJSON.Feature[] = [];
        const opening: GeoJSON.Feature[] = [];
        const venue: GeoJSON.Feature[] = [];

        imdfData.forEach((feature: ImdfFeature) => {
          const featureParsed = {
            feature_type: feature.featureType,
            geometry: feature.geometry,
            id: feature.id,
            properties: feature.properties,
            type: feature.type,
            unlFeatureId: feature.unlId,
          };

          switch (feature.featureType) {
            case ImdfFeatureType.LEVEL:
              levels.push(featureParsed);
              break;
            case ImdfFeatureType.OPENING:
              opening.push(featureParsed);
              break;
            case ImdfFeatureType.UNIT:
              unit.push(featureParsed);
              break;
            case ImdfFeatureType.VENUE:
              venue.push({
                ...featureParsed,
                properties: {
                  ...feature.properties,
                  venueId: feature.venueId,
                },
              });
              break;
            default:
              break;
          }
        });

        this.imdfVenueData = {
          0: {
            level: levels.length > 0 ? featureCollection(levels) : undefined,
            opening:
              opening.length > 0 ? featureCollection(opening) : undefined,
            venue: venue.length > 0 ? featureCollection(venue) : undefined,
            unit: unit.length > 0 ? featureCollection(unit) : undefined,
          },
        };

        this.updateVenueMapLayers();
      });
  };

  fetchVenueRecords = () => {
    const unlApi = new UnlApi({ apiKey: this.map.getApiKey() });
    unlApi.recordsApi.getAll(this.map.getVpmId(), "venue").then((records) => {
      const venueMarkersSource: maplibregl.GeoJSONSource = this.map.getSource(
        VENUE_MARKERS_SOURCE
      ) as maplibregl.GeoJSONSource;
      const venueFootprintSource: maplibregl.GeoJSONSource = this.map.getSource(
        VENUE_FOOTPRINT_SOURCE
      ) as maplibregl.GeoJSONSource;

      if (venueMarkersSource) {
        venueMarkersSource.setData(
          venuesToFeatureCollection(true, records.items)
        );
      }

      if (venueFootprintSource) {
        const featureColl = venuesToFeatureCollection(false, records.items);
        venueFootprintSource.setData(featureColl);
      }
    });
  };

  insertSourcesAndLayers = () => {
    // this.map.loadImage(
    //   VenueMarkerIcon,
    //   (error?: Error | null, image?: HTMLImageElement | ImageBitmap | null) => {
    //     if (error || !image) {
    //       return;
    //     }

    //     this.map.addImage("venue-marker-icon", image);
    //   }
    // );

    this.map.addSource(VENUE_MARKERS_SOURCE, {
      type: "geojson",
      data: venuesToFeatureCollection(true, []),
    });
    this.map.addSource(VENUE_FOOTPRINT_SOURCE, {
      type: "geojson",
      data: venuesToFeatureCollection(false, []),
    });
    this.map.addSource(VENUE_LEVEL_SOURCE, {
      type: "geojson",
      data: featureCollection([]),
    });
    this.map.addSource(VENUE_UNITS_SOURCE, {
      type: "geojson",
      data: featureCollection([]),
    });
    this.map.addSource(VENUE_OPENINGS_SOURCE, {
      type: "geojson",
      data: featureCollection([]),
    });
    this.map.addSource(VENUE_UNIT_MARKERS_SOURCE, {
      type: "geojson",
      data: featureCollection([]),
    });

    this.map.on("click", VENUE_MARKERS_SYMBOL_LAYER, this.handleVenueClick);
    this.map.on("click", VENUE_FOOTPRINT_FILL_LAYER, this.handleVenueClick);

    this.map.addLayer(venueMarkersSymbolLayer);
    this.map.addLayer(venueFootprintFillLayer);

    this.map.addLayer(venueLevelFillLayer);
    this.map.addLayer(venueLevelLineLayer);
    this.map.addLayer(venueUnitsFillLayer);
    this.map.addLayer(venueUnitsLineLayer);
    this.map.addLayer(venueOpeningLineLayer);
    this.map.addLayer(venueUnitMarkersSymbolLayer);
  };

  onAddControl = () => {
    this.map.on("load", () => {
      this.insertSourcesAndLayers();
      this.fetchVenueRecords();
    });
  };

  onRemoveControl = () => {
    this.map.off("click", VENUE_MARKERS_SOURCE, this.handleVenueClick);
    this.map.off("click", VENUE_FOOTPRINT_SOURCE, this.handleVenueClick);

    this.map.removeLayer(VENUE_MARKERS_SYMBOL_LAYER);
    this.map.removeSource(VENUE_MARKERS_SOURCE);

    this.map.removeLayer(VENUE_FOOTPRINT_FILL_LAYER);
    this.map.removeSource(VENUE_FOOTPRINT_SOURCE);

    this.map.removeLayer(VENUE_LEVEL_FILL_LAYER);
    this.map.removeLayer(VENUE_LEVEL_LINE_LAYER);
    this.map.removeLayer(VENUE_UNITS_FILL_LAYER);
    this.map.removeLayer(VENUE_UNITS_LINE_LAYER);
    this.map.removeLayer(VENUE_OPENINGS_LINE_LAYER);
    this.map.removeLayer(VENUE_UNIT_MARKERS_SYMBOL_LAYER);

    this.map.removeSource(VENUE_LEVEL_SOURCE);
    this.map.removeSource(VENUE_UNITS_SOURCE);
    this.map.removeSource(VENUE_OPENINGS_SOURCE);
    this.map.removeSource(VENUE_UNIT_MARKERS_SOURCE);
  };
}
