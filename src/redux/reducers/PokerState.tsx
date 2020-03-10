import Stories from "../../models/Stories";

export interface PokerState {
    stories: Stories
    cardTypeIndex: number
    sessionName: string
    sessionToken : string
}