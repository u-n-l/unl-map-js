import closeIcon from "../../../../icons/ts/CloseIcon";
import CellPrecision from "../../models/CellPrecision";
import { getFormattedCellDimensions } from "../../helpers";

const gridSelectorModal = (
  currentPrecision: CellPrecision,
  onPrecisionChange: (newPrecision: CellPrecision) => void
) => {
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
  closeButton.appendChild(closeIcon());

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
  Object.keys(CellPrecision).forEach((key) => {
    const value = CellPrecision[<any>key];

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

  let cellSize = getFormattedCellDimensions(currentPrecision).split("x");

  const widthValue = document.createElement("p");
  widthValue.classList.add("mapbox-control-grid-selector-modal-size");
  widthValue.innerHTML = cellSize[0].trim();

  const heightValue = document.createElement("p");
  heightValue.classList.add("mapbox-control-grid-selector-modal-size");
  heightValue.innerHTML = cellSize[1].trim();

  geohashSelector.addEventListener("change", () => {
    let newValue = geohashSelector.value;

    cellSize = getFormattedCellDimensions(<any>newValue).split("x");

    widthValue.innerHTML = cellSize[0].trim();
    heightValue.innerHTML = cellSize[1].trim();
  });

  valuesColumn.appendChild(geohashSelector);
  valuesColumn.appendChild(widthValue);
  valuesColumn.appendChild(heightValue);

  modalBody.appendChild(titlesColumn);
  modalBody.appendChild(valuesColumn);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add(
    "mapbox-control-grid-selector-modal-buttons-container"
  );

  const cancelButton = document.createElement("button");
  cancelButton.classList.add(
    "mapbox-control-grid-selector-modal-cancel-button"
  );
  cancelButton.onclick = () => {
    root.style.display = "none";
    geohashSelector.value = <any>currentPrecision;
  };
  cancelButton.appendChild(document.createTextNode("Cancel"));

  const selectButton = document.createElement("button");
  selectButton.classList.add(
    "mapbox-control-grid-selector-modal-select-button"
  );
  selectButton.onclick = () => {
    onPrecisionChange(<any>geohashSelector.value);
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

export default gridSelectorModal;
