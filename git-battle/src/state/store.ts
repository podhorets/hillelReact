import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./root.reducer";
import { createLogger } from "redux-logger";

const logger = createLogger({
    collapsed: true
});

export const store = createStore(rootReducer, applyMiddleware(logger));