import React from 'react';
import {connect} from "react-redux";
import {Grid, Theme, withStyles} from "@material-ui/core";
import Stories from "../models/Stories";
import {PokerState} from "../redux/reducers/PokerState";
import {StoryModel} from "../interfaces/StoryModel";

interface StateFromRedux {
    stories: Stories
}

interface State {

}

type Props = StateFromRedux

const styles = (theme: Theme) => ({
    root: {
        color: theme.palette.primary.contrastText
    },
});
const mapStateToProps = (state: PokerState): PokerState => {
    return {
        stories: state.stories
    };
};

class ViewStories extends React.Component<Props, State> {

    render() {
        const stories = this.props.stories.Stories;
        return (
            <div>
                {
                    stories.map((story: StoryModel, key: number) => {
                        console.log(story);
                        return (<Grid item xs={6} key={key}>
                            <span>{story.id}</span>
                            <span>{story.title}</span>
                            <span>{story.description}</span>
                        </Grid>)
                    })
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(ViewStories));