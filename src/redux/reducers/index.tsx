import {combineReducers} from "redux";
import {pokerReducer} from "./PokerReducer";

export const rootReducer = combineReducers({
    pokerReducer: pokerReducer
});
export type RootState = ReturnType<typeof rootReducer>

// export default combineReducers({pokerReducer});