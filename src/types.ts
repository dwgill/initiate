export interface ReduxState {
  order: {
    active: number,
    ids: string[],
  },
  combatants: {
    [index: string]: Combatant
  }
}

export interface Combatant {
  id: string,
  name: string,
  initiative: number,
  armorClass: number,
  healthPoints: number,
  notes: string,
}

export type PartialCombatant = { id: Combatant['id'] } & Partial<Combatant>;
