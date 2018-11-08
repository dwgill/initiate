import { connect } from "react-redux";
import getCombatantById from "../../selectors/getCombatantById";
import updateCombatant from "../../actions/updateCombatant";

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
    )
});

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance;
