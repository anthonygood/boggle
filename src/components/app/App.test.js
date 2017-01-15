import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./connected-app"
import configureStore from "../../store/configure-store"


it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = configureStore()

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  )
});
