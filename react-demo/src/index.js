import React from "react";
import ReactDOM from "react-dom";
import store from "./Redux/store";
import {Provider} from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./Redux/store";

import App from "./App";
ReactDOM.render(
    <Provider store = {store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
  document.getElementById("root")
);
