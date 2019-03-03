import copyCombatant, { determineNewCombatantName } from './copyCombatant';

describe('determineNewCombatantName', () => {
  it('ignores names without final numbers', () => {
    for (const name of ['foo', 'bar', 'foo 1a', 'boyo 1o']) {
      expect(determineNewCombatantName(name)).toEqual(name);
    }
  });

  it('increments terminating numbers', () => {
    expect(determineNewCombatantName('Bandit 1')).toEqual('Bandit 2');
    expect(determineNewCombatantName('Bandit1')).toEqual('Bandit2');
    expect(determineNewCombatantName('Bandit    1')).toEqual('Bandit    2');
    expect(determineNewCombatantName('Bandit 0')).toEqual('Bandit 1');
    expect(determineNewCombatantName('FOO101')).toEqual('FOO102');
    expect(determineNewCombatantName('20001')).toEqual('20002');
    expect(determineNewCombatantName('0')).toEqual('1');
  });
});