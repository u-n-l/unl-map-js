import base from "./base";
import satellite from "./satellite";
import terrain from "./terrain";
import traffic from "./traffic";
import vectorial from "./vectorial";

export type MapTiles =
  | "vectorial"
  | "satellite"
  | "terrain"
  | "traffic"
  | "base";

export const getStyle = (style?: MapTiles) => {
  switch (style) {
    case "vectorial":
      return vectorial;
    case "satellite":
      return satellite;
    case "terrain":
      return terrain;
    case "traffic":
      return traffic;
    case "base":
      return base;
    default:
      return vectorial;
  }
};
