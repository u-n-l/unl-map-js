import { LngLat, MapMouseEvent } from "maplibre-gl";
import ControlButton from "./components/ControlButton";
import Base from "../Base/Base";
import CellPrecision from "./CellPrecision";
import Cell from "./Cell";
export interface GridControlOptions {
    defaultPrecision?: CellPrecision;
    lineColor?: string;
    lineWidth?: number;
    cellFillColor?: string;
    cellBorderColor?: string;
}
export default class GridControl extends Base {
    gridButton: ControlButton;
    currentPrecision: CellPrecision;
    lineColor: string;
    lineWidth: number;
    cellFillColor: string;
    cellBorderColor: string;
    gridSelector: HTMLDivElement;
    cellInfoPopupNode?: HTMLDivElement;
    clickedLngLat?: LngLat;
    constructor(options?: GridControlOptions);
    handlePrecisionChange: (newPrecision: CellPrecision) => void;
    insert: () => void;
    updateCellPopupPosition: () => void;
    addCellInfoPopup: (cell: Cell) => void;
    removeCellInfoPopup: () => void;
    resetCell: () => void;
    handleMapClick: (e: MapMouseEvent) => void;
    updateGridLines: () => void;
    showGrid: () => void;
    hideGrid: () => void;
    showGridSelector: () => void;
    hideGridSelector: () => void;
    onAddControl: () => void;
    onRemoveControl: () => void;
}
