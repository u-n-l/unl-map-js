"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base {
    constructor() {
        this.onAddControl = () => {
            //to be extended
        };
        this.onRemoveControl = () => {
            //to be extended
        };
        this.addButton = (...buttons) => {
            buttons.forEach((button) => this.node.appendChild(button.node));
        };
        this.addClassName = (className) => {
            this.node.classList.add(className);
        };
        this.removeClassName = (className) => {
            this.node.classList.remove(className);
        };
        this.onAdd = (map) => {
            this.map = map;
            this.onAddControl();
            return this.node;
        };
        this.onRemove = () => {
            this.onRemoveControl();
            this.node.parentNode.removeChild(this.node);
        };
        this.node = document.createElement("div");
        this.node.classList.add("mapboxgl-ctrl");
        this.node.classList.add("mapboxgl-ctrl-group");
        this.node.classList.add("mapbox-control");
    }
}
exports.default = Base;
