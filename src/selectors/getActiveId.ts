import createSelector from "selectorator";
import existy from "../logic/existy";
import { ReduxState } from "../types";
import getInitiativeOrder from "./getInitiativeOrder";

const getActivePosition = createSelector<ReduxState, number | null>(
  ["order.active"],
  (activePos: number) => (existy(activePos) ? activePos : null)
);

const getActiveId = createSelector<ReduxState, string | null>(
  [getActivePosition, getInitiativeOrder],
  (activePos, idsOrdering) => idsOrdering[activePos]
);

export default getActiveId;
