import { compose, createStore, applyMiddleware } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";

import { rootReducer } from "./reducers/root.reducer";
import { rootEpic } from "./middleware/epics/root.epic";

// Async calls
const epicMiddleware = createEpicMiddleware();

// REDUX DevTools initialization
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic as any);

  return store;
}

export default configureStore;