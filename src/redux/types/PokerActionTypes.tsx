import {StoryModel} from "../../interfaces/StoryModel";

export enum ActionTypes {
    MAKE_DEAL,
}
interface MakeDealAction {
    type: typeof ActionTypes.MAKE_DEAL
    payload: StoryModel
}

export type PokerActionTypes = MakeDealAction