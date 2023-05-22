import Environment from "../../../map/models/Environment";
import base from "./base";
import satellite from "./satellite";
import terrain from "./terrain";
import traffic from "./traffic";
import vectorial from "./vectorial";
import rich from "./rich";

export type MapTiles =
  | "vectorial"
  | "satellite"
  | "terrain"
  | "traffic"
  | "base"
  | "rich";

export const getStyle = (style?: MapTiles, env?: Environment) => {
  switch (style) {
    case "vectorial":
      return vectorial(env);
    case "satellite":
      return satellite(env);
    case "terrain":
      return terrain(env);
    case "traffic":
      return traffic(env);
    case "base":
      return base(env);
    case "rich":
      return rich(env);
    default:
      return vectorial(env);
  }
};
