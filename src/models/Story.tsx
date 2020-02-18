import {StoryModel} from "../interfaces/StoryModel";

class Story implements StoryModel{
    id: number;
    title: string;
    description: string;

    constructor({id, title, description}: { id: number, title: string, description: string }) {
        this.id=id;
        this.title=title;
        this.description=description;
    }
    public static toJSON(story: Story) {
        return JSON.stringify(story)
    }

    public static fromJSON(json:string): Story {
        return JSON.parse(json) as Story
    }

}
export default Story