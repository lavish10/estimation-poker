import React from 'react';
import {Card, CardActionArea, CardContent, Fab, Grid, Paper, Theme, Typography, withStyles} from "@material-ui/core";
import EstimationPokerService from "../service/EstimationPokerService";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {StoryModel} from "../interfaces/StoryModel";
import {cardValues} from "../models/CardTypes";
import {makeStyles} from "@material-ui/core/styles";

interface DispatchProps {
    classes: any
}

interface Props extends RouteComponentProps, DispatchProps {
    pokerService: EstimationPokerService
}

interface RouterProps {
    sessionId: string
}

interface Message extends StoryModel {
    cardTypeIndex: number
}

interface State {
    stompClient: any
    sessionId: string
    loadingAnimation: boolean
    message: Message
}

const styles = (theme: Theme) => makeStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        }
    }
);

class BetForm extends React.Component<Props, State> {

    state: State = {
        stompClient: this.props.pokerService.getStompClient(),
        sessionId: "",
        loadingAnimation: true,
        message: {id: 0, title: "", description: "", cardTypeIndex: 0},
    };

    componentDidMount(): void {
        let params = this.props.match.params as RouterProps;
        let that = this;
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
            });
            stompClient.subscribe("/masterToClient/" + params.sessionId, function (message: any) {
                console.log(message.body);
                let parsedMessage = JSON.parse(message.body) as Message;
                console.log(parsedMessage.cardTypeIndex);
                that.setState({
                    ...that.state,
                    loadingAnimation: false,
                    message: parsedMessage
                    // cards: cardValues()[parsedMessage.cardTypeIndex],
                })
            });
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
        const {classes} = this.props;
        return (this.state.loadingAnimation) ? (<>
            {/*<img src="https://i.imgur.com/QxmpMd5.gif" alt="Loading"/>*/}
            <img src="https://i.imgur.com/EIfA9cG.gif" alt="Loading"/>

        </>) : (
            <>
                <div>
                    {/*<form onSubmit={this.handleSubmit}>*/}
                    {/*    <input type="text"/>*/}
                    {/*    <Button type={"submit"}>Submit</Button>*/}
                    {/*</form>*/}
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h3" component="h2">
                                    #{this.state.message.id}
                                </Typography><Typography gutterBottom variant="h5" component="h2">
                                {this.state.message.title}
                            </Typography>
                                <Typography variant="body2" color="textSecondary"
                                            component="p">{this.state.message.description}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Paper className={classes.root}>
                        <Grid container spacing={2} justify={"center"}>
                            {
                                cardValues()[this.state.message.cardTypeIndex].map((card: any, key: number) => (
                                        <Grid item xs={"auto"}>
                                            <Fab size={"large"} variant={"extended"} color={"secondary"} key={key}
                                                 value={key}>
                                                {card.toString()}
                                            </Fab>
                                        </Grid>

                                    )
                                )
                            }
                        </Grid>
                    </Paper>
                </div>
            </>
        );
    }
}

export default withRouter(withStyles(styles, {withTheme: true})(BetForm));

