import {ActionTypes, PokerActionTypes} from "../types/PokerActionTypes";
import {PokerReducerState} from "./PokerReducerState";
import Stories from "../../models/Stories";


export const initialState: PokerReducerState = {
    stories: new Stories([ {id: 0, description: "", title: ""} ])
};

export function pokerReducer(state = initialState, action: PokerActionTypes) {

    switch (action.type) {
        case ActionTypes.MAKE_DEAL:
            return {
                ...state,
                stories: new Stories([
                    ...state.stories.Stories,
                    action.payload
                ])
            }
    }
}