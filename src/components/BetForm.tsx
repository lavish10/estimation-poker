import React from 'react';
import {Button, Theme, withStyles} from "@material-ui/core";
import EstimationPokerService from "../service/EstimationPokerService";
import {RouteComponentProps, withRouter} from 'react-router-dom';

interface Props extends RouteComponentProps {
    pokerService: EstimationPokerService
}

interface RouterProps {
    sessionId: string
}

interface State {
    stompClient: any
    sessionId: string
}

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
    }
});

class BetForm extends React.Component<Props, State> {

    state: State = {
        stompClient: this.props.pokerService.getStompClient(),
        sessionId: ""
    };

    componentDidMount(): void {
        let params = this.props.match.params as RouterProps;
        this.setState({...this.state, sessionId: params.sessionId});
        const stompClient: any = this.props.pokerService.getStompClient();
        stompClient.connect({}, function (frame: any) {
            console.log('Connected: ' + frame);
            stompClient.subscribe("/topic/" + params.sessionId, function (message: any) {
                console.log(message.body);
                // that.setState({
                //     ...that.state,
                //     messages: [...that.state.messages, message]
                // });
            })
        });

    }

    handleSubmit = (event: React.FormEvent<EventTarget>) => {
        //send data through stomp-js endpoint
        event.preventDefault();
        this.state.stompClient.send("/app/session/" + this.state.sessionId, {}, JSON.stringify({
            'from': "#name",
            'text': 'dummy content'
        }));
    };

    render(): JSX.Element {
        return (
            <>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text"/>
                        <Button type={"submit"}>Submit</Button>
                    </form>
                </div>
            </>
        );
    }
}

export default withRouter(withStyles(styles, {withTheme: true})(BetForm));

