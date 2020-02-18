import Story from "./Story";

class Stories {
    private readonly _stories: Story[];

    constructor(stories: Story[]) {
        this._stories = stories
    }

    get Stories(): Story[] {
        return [ ...this._stories ]
    }

}
export default Stories;