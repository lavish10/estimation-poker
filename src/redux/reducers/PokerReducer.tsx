import {ActionTypes, PokerActionTypes} from "../types/PokerActionTypes";
import {PokerState} from "./PokerState";
import Stories from "../../models/Stories";


export const initialState: PokerState = {
    stories: new Stories([{id: 0, description: "", title: ""}]),
    cardTypeIndex: 0,
    sessionName: "",
    sessionToken: "",
};

export function pokerReducer(state = initialState, action: PokerActionTypes): PokerState {

    switch (action.type) {
        case ActionTypes.MAKE_DEAL:
            return {
                ...state,
                stories: new Stories([
                    ...state.stories.Stories,
                    action.payload
                ])
            };
        case ActionTypes.SET_DECK_TYPE:
            return {
                ...state,
                cardTypeIndex: action.payload
            };
        case ActionTypes.SET_SESSION_NAME:
            return {
                ...state,
                sessionName: action.payload
            };
        case ActionTypes.SET_SESSION_TOKEN:
            return {
                ...state,
                sessionToken: action.payload
            };
    }
    return initialState;
}