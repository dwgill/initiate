function newUniqueId() {
  return `combatant_${new Date().toISOString()}`;
}

export default newUniqueId;
