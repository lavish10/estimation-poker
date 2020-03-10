import {StoryModel} from "../../interfaces/StoryModel";

export enum ActionTypes {
    MAKE_DEAL,
    SET_DECK_TYPE,
    SET_SESSION_NAME,
    SET_SESSION_TOKEN
}

interface MakeDealAction {
    type: typeof ActionTypes.MAKE_DEAL
    payload: StoryModel
}


interface SetCardType {
    type: typeof ActionTypes.SET_DECK_TYPE
    payload: number
}

interface SetSessionName {
    type: typeof ActionTypes.SET_SESSION_NAME
    payload: string
}

interface SetSessionToken {
    type: typeof ActionTypes.SET_SESSION_TOKEN
    payload: string
}

export type PokerActionTypes = MakeDealAction | SetCardType | SetSessionName | SetSessionToken