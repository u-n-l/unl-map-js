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
  VENUE_LEVEL_FILL_LAYER,
  VENUE_LEVEL_LINE_LAYER,
  VENUE_MARKERS_SYMBOL_LAYER,
  VENUE_OPENINGS_LINE_LAYER,
  VENUE_UNITS_FILL_LAYER,
  VENUE_UNITS_LINE_LAYER,
  VENUE_UNIT_MARKERS_SYMBOL_LAYER,
} from "./layers";
import {
  venuesRecordsToFeatureCollection,
  venueUnitMarkersToFeatureCollection,
} from "./helpers";
import { ImdfFeatureType } from "../../api/venues/models/ImdfFeatureType";
import ImdfFeature from "../../api/venues/models/ImdfFeature";
import {
  venueFootprintSource,
  venueLevelSource,
  venueMarkersSource,
  venueOpeningsSource,
  venueUnitMarkersSource,
  venueUnitsSource,
  VENUE_FOOTPRINT_SOURCE,
  VENUE_LEVEL_SOURCE,
  VENUE_MARKERS_SOURCE,
  VENUE_OPENINGS_SOURCE,
  VENUE_UNITS_SOURCE,
  VENUE_UNIT_MARKERS_SOURCE,
} from "./sources";
import { Record } from "../../api/records/models/Record";
import ControlButton from "../components/ControlButton";
import { featureCollection } from "../Base/helpers";
import { RecordFeatureType } from "../../api/records/models/RecordFeatureType";
import mapIcons from "./indoorMapIcons";
import { MapIcon } from "../../Map/models/MapIcon";

const DISPLAYED_FEATURE_TYPES: ImdfFeatureType[] = [
  "level",
  "unit",
  "opening",
  "venue",
];

export default class IndoorControl extends Base {
  private selectedLevel: number;
  private imdfVenueData: {
    [level: number]: ImdfVenueData | undefined;
  };
  private levelButtons: ControlButton[];
  private unlApi?: UnlApi;

  constructor() {
    super();

    this.selectedLevel = 0;
    this.imdfVenueData = {};
    this.levelButtons = [];
  }

  private handleLevelSelection = (level: number) => {
    const selectedVenueId =
      this.imdfVenueData[this.selectedLevel]?.venue?.features[0].properties
        ?.venueId;

    this.selectedLevel = level;

    if (this.imdfVenueData[this.selectedLevel]) {
      this.updateImdfDataSources();
    } else {
      this.fetchImdfVenueData(selectedVenueId);
    }
  };

  private updateLevelSelector = () => {
    if (
      !this.imdfVenueData[this.selectedLevel] ||
      !this.imdfVenueData[this.selectedLevel]?.level
    ) {
      return;
    }

    this.levelButtons.forEach((button) => {
      this.removeButton(button);
    });

    this.levelButtons = this.imdfVenueData[
      this.selectedLevel
    ]!.level!.features.reverse().map((level) =>
      new ControlButton().setText(level.properties?.ordinal).onClick(() => {
        this.handleLevelSelection(level?.properties?.ordinal);
      })
    );

    this.levelButtons.forEach((button) => {
      this.addButton(button);
    });
  };

  private handleVenueClick = (e: MapMouseEvent) => {
    const existingVenueId =
      this.imdfVenueData[this.selectedLevel]?.venue?.features[0].properties
        ?.venueId;

    //@ts-ignore
    const venueId = e.features[0].properties.id;

    if (venueId && existingVenueId !== venueId) {
      this.imdfVenueData = {};
      this.selectedLevel = 0;
      this.fetchImdfVenueData(venueId);
    }
  };

  private fetchImdfVenueData = (venueId: string) => {
    this.unlApi?.venuesApi
      .getImdfFeatures(
        this.map.getVpmId(),
        venueId,
        this.selectedLevel,
        DISPLAYED_FEATURE_TYPES
      )
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
            case "level":
              levels.push(featureParsed);
              break;
            case "opening":
              opening.push(featureParsed);
              break;
            case "unit":
              unit.push(featureParsed);
              break;
            case "venue":
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
          ...this.imdfVenueData,
          [this.selectedLevel]: {
            level: levels.length > 0 ? featureCollection(levels) : undefined,
            opening:
              opening.length > 0 ? featureCollection(opening) : undefined,
            venue: venue.length > 0 ? featureCollection(venue) : undefined,
            unit: unit.length > 0 ? featureCollection(unit) : undefined,
          },
        };

        this.updateImdfDataSources();

        if (Object.keys(this.imdfVenueData).length === 1) {
          this.updateLevelSelector();
        }
      });
  };

  private updateImdfDataSources = () => {
    if (!this.imdfVenueData || !this.imdfVenueData[this.selectedLevel]) {
      return;
    }

    const venueLevelSource: maplibregl.GeoJSONSource = this.map.getSource(
      VENUE_LEVEL_SOURCE
    ) as maplibregl.GeoJSONSource;

    const venueUnitsSource: maplibregl.GeoJSONSource = this.map.getSource(
      VENUE_UNITS_SOURCE
    ) as maplibregl.GeoJSONSource;

    const venueOpeningsSource: maplibregl.GeoJSONSource = this.map.getSource(
      VENUE_OPENINGS_SOURCE
    ) as maplibregl.GeoJSONSource;

    const venueUnitMarkersSource: maplibregl.GeoJSONSource = this.map.getSource(
      VENUE_UNIT_MARKERS_SOURCE
    ) as maplibregl.GeoJSONSource;

    if (venueLevelSource) {
      venueLevelSource.setData(
        this.imdfVenueData[this.selectedLevel]!.level ?? featureCollection([])
      );
    }

    if (venueUnitsSource) {
      venueUnitsSource.setData(
        this.imdfVenueData[this.selectedLevel]!.unit ?? featureCollection([])
      );
    }

    if (venueOpeningsSource) {
      venueOpeningsSource.setData(
        this.imdfVenueData[this.selectedLevel]!.opening ?? featureCollection([])
      );
    }

    if (venueUnitMarkersSource) {
      venueUnitMarkersSource.setData(
        venueUnitMarkersToFeatureCollection(
          this.imdfVenueData[this.selectedLevel]!.unit!
        ) ?? featureCollection([])
      );
    }
  };

  private updateVenueMarkerAndFootprintSources = (records: Record[]) => {
    const venueMarkersSource: maplibregl.GeoJSONSource = this.map.getSource(
      VENUE_MARKERS_SOURCE
    ) as maplibregl.GeoJSONSource;
    const venueFootprintSource: maplibregl.GeoJSONSource = this.map.getSource(
      VENUE_FOOTPRINT_SOURCE
    ) as maplibregl.GeoJSONSource;

    if (venueMarkersSource) {
      venueMarkersSource.setData(
        venuesRecordsToFeatureCollection(true, records)
      );
    }

    if (venueFootprintSource) {
      const featureColl = venuesRecordsToFeatureCollection(false, records);
      venueFootprintSource.setData(featureColl);
    }
  };

  private fetchVenueRecords = () => {
    this.unlApi?.recordsApi
      .getAll(this.map.getVpmId(), RecordFeatureType.VENUE)
      .then((records) => {
        if (records && records.items) {
          this.updateVenueMarkerAndFootprintSources(records.items);
        }
      });
  };

  private loadMapIcons = () => {
    mapIcons.forEach((icon: MapIcon) => {
      this.map.loadImage(
        icon.image,
        (
          error?: Error | null,
          image?: HTMLImageElement | ImageBitmap | null
        ) => {
          if (error || !image) {
            return;
          }
          this.map.addImage(icon.name, image);
        }
      );
    });
  };

  private initSourcesAndLayers = () => {
    this.map.getSource(VENUE_FOOTPRINT_SOURCE) === undefined &&
      this.map.addSource(VENUE_FOOTPRINT_SOURCE, venueFootprintSource);
    this.map.getSource(VENUE_LEVEL_SOURCE) === undefined &&
      this.map.addSource(VENUE_LEVEL_SOURCE, venueLevelSource);
    this.map.getSource(VENUE_UNITS_SOURCE) === undefined &&
      this.map.addSource(VENUE_UNITS_SOURCE, venueUnitsSource);
    this.map.getSource(VENUE_OPENINGS_SOURCE) === undefined &&
      this.map.addSource(VENUE_OPENINGS_SOURCE, venueOpeningsSource);
    this.map.getSource(VENUE_UNIT_MARKERS_SOURCE) === undefined &&
      this.map.addSource(VENUE_UNIT_MARKERS_SOURCE, venueUnitMarkersSource);
    this.map.getSource(VENUE_MARKERS_SOURCE) === undefined &&
      this.map.addSource(VENUE_MARKERS_SOURCE, venueMarkersSource);

    this.map.getLayer(VENUE_FOOTPRINT_FILL_LAYER) === undefined &&
      this.map.addLayer(venueFootprintFillLayer);
    this.map.getLayer(VENUE_LEVEL_FILL_LAYER) === undefined &&
      this.map.addLayer(venueLevelFillLayer);
    this.map.getLayer(VENUE_LEVEL_LINE_LAYER) === undefined &&
      this.map.addLayer(venueLevelLineLayer);
    this.map.getLayer(VENUE_UNITS_FILL_LAYER) === undefined &&
      this.map.addLayer(venueUnitsFillLayer);
    this.map.getLayer(VENUE_UNITS_LINE_LAYER) === undefined &&
      this.map.addLayer(venueUnitsLineLayer);
    this.map.getLayer(VENUE_OPENINGS_LINE_LAYER) === undefined &&
      this.map.addLayer(venueOpeningLineLayer);
    this.map.getLayer(VENUE_UNIT_MARKERS_SYMBOL_LAYER) === undefined &&
      this.map.addLayer(venueUnitMarkersSymbolLayer);
    this.map.getLayer(VENUE_MARKERS_SYMBOL_LAYER) === undefined &&
      this.map.addLayer(venueMarkersSymbolLayer);
  };

  private handleMapLoad = () => {
    this.initSourcesAndLayers();
    this.fetchVenueRecords();
    this.updateImdfDataSources();
  };

  onAddControl = () => {
    this.unlApi = new UnlApi({ apiKey: this.map.getApiKey() });
    this.map.on("load", this.loadMapIcons);
    this.map.on("styledata", this.handleMapLoad);
    this.map.on("click", VENUE_MARKERS_SYMBOL_LAYER, this.handleVenueClick);
    this.map.on("click", VENUE_FOOTPRINT_FILL_LAYER, this.handleVenueClick);
  };

  onRemoveControl = () => {
    this.map.off("click", VENUE_MARKERS_SOURCE, this.handleVenueClick);
    this.map.off("click", VENUE_FOOTPRINT_SOURCE, this.handleVenueClick);
    this.map.off("styledata", this.handleMapLoad);

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

    this.map.removeLayer(VENUE_MARKERS_SYMBOL_LAYER);
    this.map.removeSource(VENUE_MARKERS_SOURCE);
  };
}
