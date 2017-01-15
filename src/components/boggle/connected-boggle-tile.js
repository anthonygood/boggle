import BoggleTile from "./BoggleTile"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import boggleActions from "../../actions/boggle-actions"

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(boggleActions, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(BoggleTile)
