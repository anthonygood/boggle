import App from "./App"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import boggleActions from "../../actions/boggle-actions"

const mapStateToProps = (state, props) => {
  return state.boggle
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(boggleActions, dispatch)
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(App)
