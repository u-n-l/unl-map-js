"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ControlButton {
    constructor() {
        this.addClassName = (className) => {
            this.node.classList.add(className);
            return this;
        };
        this.removeClassName = (className) => {
            this.node.classList.remove(className);
            return this;
        };
        this.setIcon = (icon) => {
            if (this.icon) {
                this.node.removeChild(this.icon);
            }
            this.node.appendChild(icon);
            this.icon = icon;
            return this;
        };
        this.setText = (text) => {
            this.node.textContent = text;
            return this;
        };
        this.onClick = (callback) => {
            this.node.addEventListener("click", callback);
            return this;
        };
        this.node = document.createElement("button");
        this.node.type = "button";
    }
}
exports.default = ControlButton;
