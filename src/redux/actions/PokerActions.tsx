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
    public viewDeals(stories: Stories):PokerActionTypes{
        return {
            type: ActionTypes.GET_DEALS,
            payload: stories
        }
    }

}
export default PokerActions;