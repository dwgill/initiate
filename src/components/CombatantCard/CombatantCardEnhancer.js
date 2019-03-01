import { connect } from "react-redux";
import copyCombatant from "../../actions/copyCombatant";
import deleteCombatant from "../../actions/deleteCombatant";
import updateCombatant from "../../actions/updateCombatant";
import getActiveId from "../../selectors/getActiveId";

const mapStateToProps = (state, ownProps) => {
  return {
    active: getActiveId(state) === ownProps.id
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
