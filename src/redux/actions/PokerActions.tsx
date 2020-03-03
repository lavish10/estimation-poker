import Story from "../../models/Story";
import {ActionTypes, PokerActionTypes} from "../types/PokerActionTypes";

class PokerActions {
    public makeDeal(story: Story): PokerActionTypes {
        return {
            type: ActionTypes.MAKE_DEAL,
            payload: story
        }
    }

    public setCardType(index: number): PokerActionTypes {
        return {
            type: ActionTypes.SET_DECK_TYPE,
            payload: index
        }
    }
    public setSessionName(name: string): PokerActionTypes {
        return {
            type: ActionTypes.SET_SESSION_NAME,
            payload: name
        }
    }
    public setSessionToken(token: string): PokerActionTypes {
        return {
            type: ActionTypes.SET_SESSION_TOKEN,
            payload: token
        }
    }
}
export default PokerActions;