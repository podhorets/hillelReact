import { combineReducers } from "redux";
import { battleReducer } from "./battle/battle.reducer";
import { popularReducer } from "./popular/popular.reducer";

export const rootReducer = combineReducers({
    popularReducer,
    battleReducer
});
