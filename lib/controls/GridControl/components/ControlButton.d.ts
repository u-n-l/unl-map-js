declare class ControlButton {
    node: HTMLButtonElement;
    icon?: SVGElement;
    constructor();
    addClassName: (className: string) => this;
    removeClassName: (className: string) => this;
    setIcon: (icon: SVGElement) => this;
    setText: (text: string) => this;
    onClick: (callback: (event: MouseEvent) => void) => this;
}
export default ControlButton;
