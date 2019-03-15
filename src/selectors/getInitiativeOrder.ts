import createSelector from "selectorator";
import existy from "../logic/existy";
import { ReduxState } from "../types";

const getInitiativeOrder = createSelector<ReduxState, string[]>(
  ["order.ids"],
  (idsOrder: string[]) => (!existy(idsOrder) ? [] : [...idsOrder])
);

export default getInitiativeOrder;
