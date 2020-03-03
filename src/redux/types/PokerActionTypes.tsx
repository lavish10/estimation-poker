import {StoryModel} from "../../interfaces/StoryModel";
import {Stomp} from "@stomp/stompjs";

export enum ActionTypes {
    MAKE_DEAL,
    CONNECT_STOMP_CLIENT,
    SET_DECK_TYPE,
    SET_SESSION_NAME,
    SET_SESSION_TOKEN
}

interface MakeDealAction {
    type: typeof ActionTypes.MAKE_DEAL
    payload: StoryModel
}

interface ConnectStompAction {
    type: typeof ActionTypes.CONNECT_STOMP_CLIENT
    payload: Stomp
}

interface SetCardType {
    type: typeof ActionTypes.SET_DECK_TYPE
    payload: number
}
interface SetSessionName {
    type: typeof ActionTypes.SET_SESSION_NAME
    payload: string
}
interface  SetSessionToken{
    type: typeof ActionTypes.SET_SESSION_TOKEN
    payload: string
}

export type PokerActionTypes = MakeDealAction | ConnectStompAction | SetCardType | SetSessionName | SetSessionToken