import UnlMap from "../../map/UnlMap";
import ControlButton from "../GridControl/components/ControlButton";
declare class Base {
    node: HTMLDivElement;
    map: UnlMap;
    constructor();
    onAddControl: () => void;
    onRemoveControl: () => void;
    addButton: (...buttons: ControlButton[]) => void;
    addClassName: (className: string) => void;
    removeClassName: (className: string) => void;
    onAdd: (map: UnlMap) => HTMLDivElement;
    onRemove: () => void;
}
export default Base;
