import { connect } from "react-redux";
import getCombatantIdsByInitiative from "../../selectors/getCombatantIdsByInitiative";
import getNumCombatants from "../../selectors/getNumCombatants";
import newCombatant from "../../actions/newCombatant";
import progressInitiative from "../../actions/progressInitiative";

const mapStateToProps = state => ({
  combatants: getCombatantIdsByInitiative(state),
  canProgress: getNumCombatants(state) > 0
});

const mapDispatchToProps = {
  onNewCombatant: () => newCombatant(),
  onProgressInitiative: progressInitiative
};

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance;
