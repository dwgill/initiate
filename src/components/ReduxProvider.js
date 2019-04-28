import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import reducer from "../reducers";
import * as reduxLocalStorage from "redux-localstorage-simple";
import { initialState } from '../reducers';

function createInitiateStore() {
  const localStoreNamespace = 'appState';

  const middlewares = [
    thunk,
    reduxLocalStorage.save({
      namespace: localStoreNamespace,
      debounce: 1000,
    }),
  ];
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const storeEnhancer = composeEnhancers(applyMiddleware(...middlewares));
  
  const preloadedState = reduxLocalStorage.load({
    namespace: localStoreNamespace,
    preloadedState: initialState
  });
  
  const store = createStore(reducer, preloadedState, storeEnhancer);

  return store;
};

const store = createInitiateStore();

const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;
