import Story from "../../models/Story";
import {ActionTypes, PokerActionTypes} from "../types/PokerActionTypes";

class PokerActions {
    public makeDeal(story: Story): PokerActionTypes {
        return {
            type: ActionTypes.MAKE_DEAL,
            payload: story
        }
    }
}
export default PokerActions;