import React from "react";
import { AppRegistry } from "react-native";
import App from "./src/components/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from './src/reducers';

const store = createStore(reducers);

const rootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent("BudgetTracker", () => rootApp);
