import React from "react";
import { AppRegistry } from "react-native";
import App from "./src/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from './src/reducers';

const store = createStore(allReducers);

const rootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent("BudgetTracker", () => rootApp);
