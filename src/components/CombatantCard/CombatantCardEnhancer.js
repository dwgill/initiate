import { connect } from "react-redux";
import getCombatantById from "../../selectors/getCombatantById";
import updateCombatant from "../../actions/updateCombatant";
import copyCombatant from "../../actions/copyCombatant";
import deleteCombatant from "../../actions/deleteCombatant";

const mapStateToProps = (state, ownProps) => ({
  combatant: getCombatantById(state)(ownProps.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdateCombatant: newProperties =>
    dispatch(
      updateCombatant({
        id: ownProps.id,
        ...newProperties
      })
    ),
  onCopyCombatant: () => dispatch(copyCombatant(ownProps.id)),
  onDeleteCombatant: () => dispatch(deleteCombatant(ownProps.id))
});

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance;
