import { createStore } from "redux";
import {pokerReducer} from "./reducers/PokerReducer";
// import {rootReducer} from "./reducers";

export default createStore(pokerReducer);
