import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./reducers/index.js";

const store = createStore(rootReducers, composeWithDevTools())

export default store;