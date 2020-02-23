import Story from "../../models/Story";
import {ActionTypes, PokerActionTypes} from "../types/PokerActionTypes";
import Stories from "../../models/Stories";

class PokerActions {
    public makeDeal(story: Story): PokerActionTypes {
        return {
            type: ActionTypes.MAKE_DEAL,
            payload: story
        }
    }
}
export default PokerActions;