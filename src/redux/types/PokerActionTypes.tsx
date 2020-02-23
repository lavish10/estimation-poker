import {StoryModel} from "../../interfaces/StoryModel";
import Stories from "../../models/Stories";

export enum ActionTypes {
    MAKE_DEAL,
}
interface MakeDealAction {
    type: typeof ActionTypes.MAKE_DEAL
    payload: StoryModel
}
export type PokerActionTypes = MakeDealAction