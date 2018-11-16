import PropTypes from "prop-types";

export const Combatant = () => PropTypes.shape({
  id: CombatantId().isRequired,
  name: PropTypes.string.isRequired,
  initiative: PropTypes.number,
  armorClass: PropTypes.number,
  healthPoints: PropTypes.number
});

export const CombatantId = () => PropTypes.string;
