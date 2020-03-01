import {ActionTypes, PokerActionTypes} from "../types/PokerActionTypes";
import {PokerState} from "./PokerState";
import Stories from "../../models/Stories";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";


export const initialState: PokerState = {
    stories: new Stories([ {id: 0, description: "", title: ""} ]),
    stompClient: Stomp
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
        case ActionTypes.CONNECT_STOMP_CLIENT:
            return {
                ...state,
                stompClient: Stomp.over(new SockJS("http://localhost:8080/gs-guide-websocket")),
            }
    }
    return initialState;
}