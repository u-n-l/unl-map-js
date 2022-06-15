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

  setIcon = (icon: SVGElement) => {
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

  setActive(isActive: boolean) {
    if (isActive) {
      this.addClassName("-active");
    } else {
      this.removeClassName("-active");
    }

    return this;
  }

  isActive() {
    return this.node.classList.contains("-active");
  }

  onClick = (callback: (event: MouseEvent) => void) => {
    this.node.addEventListener("click", callback);

    return this;
  };
}

export default ControlButton;
