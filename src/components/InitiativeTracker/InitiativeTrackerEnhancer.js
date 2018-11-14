import { connect } from "react-redux";
import getCombatantIdsByInitiative from "../../selectors/getCombatantIdsByInitiative";

const mapStateToProps = state => ({
  combatants: getCombatantIdsByInitiative(state)
});

const enhance = connect(mapStateToProps);

export default enhance;
