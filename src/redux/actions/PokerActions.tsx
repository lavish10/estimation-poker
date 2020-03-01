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
}
export default PokerActions;