import { connect } from "react-redux";
import newCombatant from "../../actions/newCombatant";
import progressInitiative from "../../actions/progressInitiative";
import getCombatantsByInitiativeOrder from "../../selectors/getCombatantsByInitiativeOrder";
import getNumCombatants from "../../selectors/getNumCombatants";
import getActiveId from "../../selectors/getActiveId";
import existy from "../../logic/existy";

const mapStateToProps = state => ({
  combatants: getCombatantsByInitiativeOrder(state),
  canProgress: getNumCombatants(state) > 1,
  isProgressing: existy(getActiveId(state))
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
