import { connect } from "react-redux";
import newCombatant from "../../actions/newCombatant";
import progressInitiative from "../../actions/progressInitiative";
import getCombatantsByInitiativeOrder from "../../selectors/getCombatantsByInitiativeOrder";
import getNumCombatants from "../../selectors/getNumCombatants";

const mapStateToProps = state => ({
  combatants: getCombatantsByInitiativeOrder(state),
  canProgress: getNumCombatants(state) > 1
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
