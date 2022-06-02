"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cellPopupTemplate = (locationId) => {
    const root = document.createElement("div");
    root.classList.add("mapbox-control-cell-popup");
    const text = document.createTextNode(locationId);
    const content = document.createElement("p");
    content.classList.add("mapbox-control-cell-content");
    content.appendChild(text);
    root.appendChild(content);
    return root;
};
exports.default = cellPopupTemplate;
