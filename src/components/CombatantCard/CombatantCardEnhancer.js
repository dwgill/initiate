import { connect } from "react-redux";
import copyCombatant from "../../actions/copyCombatant";
import deleteCombatant from "../../actions/deleteCombatant";
import updateCombatant from "../../actions/updateCombatant";
import getActiveId from "../../selectors/getActiveId";
import getCombatants from "../../selectors/getCombatants";

const mapStateToProps = (state, { id }) => {
  const {
    name = "",
    initiative = null,
    armorClass = null,
    healthPoints = null,
    notes = ""
  } = getCombatants(state)[id] || {};

  const active = getActiveId(state) === id;

  return {
    active,
    name,
    initiative,
    armorClass,
    healthPoints,
    notes
  };
};

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
