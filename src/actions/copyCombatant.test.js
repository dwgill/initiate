import copyCombatant, { determineNewCombatantName } from './copyCombatant';

describe('determineNewCombatantName', () => {
  it('puts a 1 after names with no terminating numbers', () => {
    for (const name of ['foo', 'bar', 'foo 1a', 'boyo 1o']) {
      expect(determineNewCombatantName(name, new Set())).toEqual(`${name} 1`);
    }
  });

  it('increments terminating numbers', () => {
    expect(determineNewCombatantName('Bandit 1', new Set())).toEqual('Bandit 2');
    expect(determineNewCombatantName('Bandit1', new Set())).toEqual('Bandit 2');
    expect(determineNewCombatantName('Bandit    1', new Set())).toEqual('Bandit 2');
    expect(determineNewCombatantName('Bandit 0', new Set())).toEqual('Bandit 1');
    expect(determineNewCombatantName('FOO101', new Set())).toEqual('FOO 102');
    expect(determineNewCombatantName('20001', new Set())).toEqual('20002');
    expect(determineNewCombatantName('0', new Set())).toEqual('1');
  });

  it("doesn't pick new numbers that are already in use", () => {
    function doComparison (origName, expectedName, nameSet) {
      expect(determineNewCombatantName(origName, new Set(nameSet))).toEqual(expectedName);
    }
    
    doComparison('Bandit 1', 'Bandit 3', ['Bandit 1', 'Bandit 2', 'Bandit 4']);
    doComparison('Bandit 1', 'Bandit 4', ['Bandit 1', 'Bandit 2', 'Bandit 3']);
    doComparison('Bandit 0', 'Bandit 4', ['Bandit 0', 'Bandit 1', 'Bandit 2', 'Bandit 3']);
  });
});