import {StoryModel} from "../../interfaces/StoryModel";
import {Stomp} from "@stomp/stompjs";

export enum ActionTypes {
    MAKE_DEAL,
    CONNECT_STOMP_CLIENT
}
interface MakeDealAction {
    type: typeof ActionTypes.MAKE_DEAL
    payload: StoryModel
}
interface ConnectStompAction {
    type: typeof ActionTypes.CONNECT_STOMP_CLIENT
    payload: Stomp
}
export type PokerActionTypes = MakeDealAction | ConnectStompAction