import {StoryModel} from "../../interfaces/StoryModel";
import Stories from "../../models/Stories";

export enum ActionTypes {
    MAKE_DEAL,
    GET_DEALS
}
interface MakeDealAction {
    type: typeof ActionTypes.MAKE_DEAL
    payload: StoryModel
}

interface ViewDealsAction {
    type: typeof ActionTypes.GET_DEALS
    payload: Stories
}

export type PokerActionTypes = MakeDealAction | ViewDealsAction