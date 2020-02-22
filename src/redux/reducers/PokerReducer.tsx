import {ActionTypes, PokerActionTypes} from "../types/PokerActionTypes";
import {PokerState} from "./PokerState";
import Stories from "../../models/Stories";


export const initialState: PokerState = {
    stories: new Stories([ {id: 0, description: "", title: ""} ])
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
        case ActionTypes.GET_DEALS:
            console.log("Get stories", action.payload);
            return {
                ...state,
                stories: action.payload
            };
    }
    return initialState;
}