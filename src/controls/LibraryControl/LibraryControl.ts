import ControlButton from "../components/ControlButton";
import Base from "../Base/Base";
import libraryDrawIcon from "../../icons/ts/LibraryIcon";
import UnlApi from "../../api/UnlApi";
import { Record } from "../../api/records/models/Record";
import {
  VENUE_MARKERS_SOURCE,
  VENUE_FOOTPRINT_SOURCE,
} from "../IndoorControl/sources";
import { venuesRecordsToFeatureCollection } from "../IndoorControl/helpers";

export interface LibraryControlOptions {}

export default class LibraryControl extends Base {
  libraryButton: ControlButton;
  unlApi?: UnlApi;

  constructor(options?: LibraryControlOptions) {
    super();
    this.libraryButton = new ControlButton()
      .setIcon(libraryDrawIcon())
      .onClick(() => {
        this.handleLibraryClick();
      });
  }

  handleLibraryClick = () => {
    const list = document.getElementById("grid-venues-list");
    if (list!.style.display === "block") {
      list!.style.display = "none";
    } else {
      list!.style.display = "block";
    }
  };

  initControl = () => {
    //@ts-ignore
    this.map.addControl(this.libraryButton, "bottom-right");
  };

  handleMapLoad = () => {
    this.initControl();
  };

  onAddControl = () => {
    this.unlApi = new UnlApi({ apiKey: this.map.getApiKey() });

    this.addButton(this.libraryButton);

    this.map.on("load", this.handleMapLoad);
  };

  onRemoveControl = () => {
    //@ts-ignore
    this.map.removeControl(this.libraryButton);
    this.map.off("load", this.handleMapLoad);
  };
}
