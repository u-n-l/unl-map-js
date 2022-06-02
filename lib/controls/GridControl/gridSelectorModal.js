"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CloseIcon_1 = __importDefault(require("../../icons/ts/CloseIcon"));
const CellPrecision_1 = __importDefault(require("./CellPrecision"));
const helpers_1 = require("./helpers");
const gridSelectorModal = (currentPrecision, onPrecisionChange) => {
    const root = document.createElement("div");
    root.classList.add("mapbox-control-grid-selector-modal-root");
    root.setAttribute("id", "grid-selector-modal");
    const modalContent = document.createElement("div");
    modalContent.classList.add("mapbox-control-grid-selector-modal-content");
    const header = document.createElement("div");
    header.classList.add("mapbox-control-grid-selector-modal-header");
    const closeButton = document.createElement("button");
    closeButton.classList.add("mapbox-control-grid-selector-modal-close-button");
    closeButton.onclick = () => {
        root.style.display = "none";
    };
    closeButton.appendChild((0, CloseIcon_1.default)());
    const divider = document.createElement("hr");
    divider.classList.add("mapbox-control-grid-selector-modal-divider");
    const headerText = document.createElement("h2");
    headerText.innerHTML = "Choose Grid Size";
    headerText.classList.add("mapbox-control-grid-selector-modal-header-title");
    const modalBody = document.createElement("div");
    modalBody.classList.add("mapbox-control-grid-selector-modal-body");
    header.appendChild(headerText);
    header.appendChild(closeButton);
    const titlesColumn = document.createElement("div");
    const geohashLengthTitle = document.createElement("p");
    geohashLengthTitle.classList.add("mapbox-control-grid-selector-modal-title");
    geohashLengthTitle.appendChild(document.createTextNode("Geohash Length"));
    const cellWidthTitle = document.createElement("p");
    cellWidthTitle.classList.add("mapbox-control-grid-selector-modal-title");
    cellWidthTitle.appendChild(document.createTextNode("Cell Width"));
    const cellHeightTitle = document.createElement("p");
    cellHeightTitle.classList.add("mapbox-control-grid-selector-modal-title");
    cellHeightTitle.appendChild(document.createTextNode("Cell Height"));
    titlesColumn.appendChild(geohashLengthTitle);
    titlesColumn.appendChild(cellWidthTitle);
    titlesColumn.appendChild(cellHeightTitle);
    const valuesColumn = document.createElement("div");
    const geohashSelector = document.createElement("select");
    geohashSelector.classList.add("mapbox-control-grid-selector-modal-select");
    Object.keys(CellPrecision_1.default).forEach((key) => {
        const value = CellPrecision_1.default[key];
        if (Number.isInteger(value)) {
            const option = document.createElement("option");
            option.setAttribute("value", value);
            option.appendChild(document.createTextNode(value));
            geohashSelector.append(option);
            if (Number(value) === currentPrecision) {
                option.selected = true;
            }
        }
    });
    let cellSize = (0, helpers_1.getFormattedCellDimensions)(currentPrecision).split("x");
    const widthValue = document.createElement("p");
    widthValue.classList.add("mapbox-control-grid-selector-modal-size");
    widthValue.innerHTML = cellSize[0].trim();
    const heightValue = document.createElement("p");
    heightValue.classList.add("mapbox-control-grid-selector-modal-size");
    heightValue.innerHTML = cellSize[1].trim();
    geohashSelector.addEventListener("change", () => {
        let newValue = geohashSelector.value;
        cellSize = (0, helpers_1.getFormattedCellDimensions)(newValue).split("x");
        console.log("newValue", newValue);
        console.log("cellSize", cellSize);
        widthValue.innerHTML = cellSize[0].trim();
        heightValue.innerHTML = cellSize[1].trim();
    });
    valuesColumn.appendChild(geohashSelector);
    valuesColumn.appendChild(widthValue);
    valuesColumn.appendChild(heightValue);
    modalBody.appendChild(titlesColumn);
    modalBody.appendChild(valuesColumn);
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("mapbox-control-grid-selector-modal-buttons-container");
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("mapbox-control-grid-selector-modal-cancel-button");
    cancelButton.onclick = () => {
        root.style.display = "none";
        geohashSelector.value = currentPrecision;
    };
    cancelButton.appendChild(document.createTextNode("Cancel"));
    const selectButton = document.createElement("button");
    selectButton.classList.add("mapbox-control-grid-selector-modal-select-button");
    selectButton.onclick = () => {
        onPrecisionChange(geohashSelector.value);
    };
    selectButton.appendChild(document.createTextNode("Select"));
    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(selectButton);
    modalContent.appendChild(header);
    modalContent.appendChild(divider);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(buttonsContainer);
    root.appendChild(modalContent);
    return root;
};
exports.default = gridSelectorModal;
