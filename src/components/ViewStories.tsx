import React from 'react';
import {connect} from "react-redux";
import {Theme, withStyles} from "@material-ui/core";
import Stories from "../models/Stories";
import {PokerState} from "../redux/reducers/PokerState";
import {StoryModel} from "../interfaces/StoryModel";
import ReactVirtualizedTable from "../uicomponents/Table";

interface StateFromRedux {
    stories: Stories
}

interface State {
    messages: string[]
}

interface Props extends StateFromRedux {

}

const styles = (theme: Theme) => ({
    root: {
        color: theme.palette.primary.contrastText
    },
});
const mapStateToProps = (state: PokerState): PokerState => {
    return {
        stories: state.stories,
        cardTypeIndex: state.cardTypeIndex,
        sessionName: state.sessionToken,
        sessionToken: state.sessionToken
    };
};

interface Data {
    id: number;
    title: string;
    description: string;
}

function createData(
    id: number,
    title: string,
    description: string,
): Data {
    return {id, title, description};
}

class ViewStories extends React.Component<Props, State> {

    state: State = {
        messages: [""]
    };

    render() {
        const stories = this.props.stories.Stories;
        return (
            <div>
                <ReactVirtualizedTable columns={[
                    {
                        width: 100,
                        label: 'Story ID',
                        dataKey: 'id',
                        numeric: true
                    },
                    {
                        width: 180,
                        label: 'Title',
                        dataKey: 'title',
                    },
                    {
                        width: 300,
                        label: "Description",
                        dataKey: "description"
                    }
                ]} dataRows={
                    stories.map((story: StoryModel, key: number) => {
                            return createData(story.id, story.title, story.description)
                        }
                    )}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(ViewStories));