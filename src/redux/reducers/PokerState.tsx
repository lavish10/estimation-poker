import Stories from "../../models/Stories";
import {Stomp} from "@stomp/stompjs";

export interface PokerState {
    stories: Stories
    stompClient: Stomp
    cardTypeIndex: number
}