export interface ReduxState {
  order: {
    active: number,
    ids: string[],
  },
  combatants: {
    [index: string]: {
      id: string,
      name?: string,
      initiative?: number,
      armorClass?: null,
      healthPoints?: null
    }
  }
}

export interface Combatant {
  id: string,
  name: string,
  initiative: number,
  armorClass: null,
  healthPoints: null
}

export interface PartialCombatant {
  id: string,
  name? : string,
  initiative?: number,
  armorClass?: null,
  healthPoints?: null
}