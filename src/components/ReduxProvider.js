import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../reducers";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;
