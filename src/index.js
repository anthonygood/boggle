import "./index.css"
import React from "react"
import ReactDOM from "react-dom"
import App from "./components/app/connected-app"
import { Provider } from "react-redux"
import configureStore from "./store/configure-store"

const store = configureStore()
window.store = store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
