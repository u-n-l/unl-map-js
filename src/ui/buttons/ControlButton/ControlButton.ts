class ControlButton {
  node: HTMLButtonElement;
  icon?: SVGElement;

  constructor() {
    this.node = document.createElement("button");
    this.node.type = "button";
  }

  addClassName = (className: string) => {
    this.node.classList.add(className);

    return this;
  };

  removeClassName = (className: string) => {
    this.node.classList.remove(className);

    return this;
  };

  setIcon = (icon: SVGElement, id?: string) => {
    if (this.icon) {
      this.node.removeChild(this.icon);
    }

    this.node.appendChild(icon);
    this.icon = icon;

    return this;
  };

  setText = (text: string) => {
    this.node.textContent = text;

    return this;
  };

  onClick = (callback: (event: MouseEvent) => void) => {
    this.node.addEventListener("click", callback);

    return this;
  };
}

export default ControlButton;
