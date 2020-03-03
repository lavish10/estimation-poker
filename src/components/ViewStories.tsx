import React from 'react';
import {connect} from "react-redux";
import {Theme, withStyles} from "@material-ui/core";
import Stories from "../models/Stories";
import {PokerState} from "../redux/reducers/PokerState";
import {StoryModel} from "../interfaces/StoryModel";
import ReactVirtualizedTable from "../uicomponents/Table";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

interface StateFromRedux {
    stories: Stories
}

interface State {
    stompClient: any
    messages: string[]
}

type Props = StateFromRedux

const styles = (theme: Theme) => ({
    root: {
        color: theme.palette.primary.contrastText
    },
});
const mapStateToProps = (state: PokerState): PokerState => {
    return {
        stories: state.stories,
        stompClient: state.stompClient,
        cardTypeIndex: state.cardTypeIndex,
        sessionName: state.sessionToken,
        sessionToken: state.sessionToken,
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
        stompClient: Stomp.over(new SockJS("http://localhost:8080/gs-guide-websocket")),
        messages: [""]
    };

    componentDidMount(): void {
        // let {sessionId} = useParams();
        let sessionId: number = 12345;
        let that = this;
        that.state.stompClient.connect({}, function (frame: any) {

            console.log('Connected: ' + frame);
            that.state.stompClient.subscribe("/topic/" + sessionId, function (message: any) {
                console.log(message.body);
                that.setState({
                    ...that.state,
                    messages: [...that.state.messages, message]
                });
            })
        });
    }


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