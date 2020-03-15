import React, {ChangeEvent, Dispatch} from 'react';
import {Button, Card, Fade, Grid, Snackbar, TextField, Theme, Typography, withStyles, Paper} from "@material-ui/core";
import {NoteAdd} from '@material-ui/icons';
import {StoryModel} from "../interfaces/StoryModel";
import {PokerActionTypes} from "../redux/types/PokerActionTypes";
import PokerActions from "../redux/actions/PokerActions";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import EstimationPokerService from "../service/EstimationPokerService";
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {PokerState} from "../redux/reducers/PokerState";

interface DispatchProps {
    classes: any
    addStory: (story: StoryModel) => void
}

interface StateFromRedux {
    cardTypeIndex: number
}

interface State extends StoryModel {
    openSnackbar: boolean
}

interface RouterProps {
    sessionId: string
}

interface Props extends DispatchProps, RouteComponentProps, StateFromRedux {
    pokerService: EstimationPokerService
}

const styles = (theme: Theme) => ({
    root: {
        color: theme.palette.primary.contrastText
    },
});

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class DealForm extends React.Component<Props, State> {

    state: State = {
        description: "",
        id: 0,
        title: "",
        openSnackbar: false
    };

    componentDidMount(): void {
        let params = this.props.match.params as RouterProps;
        let that = this;
        const stompClient: any = this.props.pokerService.getStompClient();
        stompClient.connect({}, function (frame: any) {
            console.log('Connected: ' + frame);
            stompClient.subscribe("/topic/" + params.sessionId, function (message: any) {
                console.log(message.body);
                that.setState({
                    ...that.state,
                    // messages: [...that.state.messages, message]
                });
            });
            // stompClient.subscribe("/masterToClient/" + params.sessionId, function (message: any) {
            //     console.log(message.body);
            // })
        });
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, [event.target.name]: event.target.value});
    };

    handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        let params = this.props.match.params as RouterProps;
        this.props.addStory({
            description: this.state.description,
            id: this.state.id,
            title: this.state.title
        });
        const stompClient = this.props.pokerService.getStompClient();
        // @ts-ignore
        stompClient.send("/app/toClients/" + params.sessionId, {}, JSON.stringify({
            ...this.state,
            cardTypeIndex: this.props.cardTypeIndex
        }));
        this.setState({
            description: "",
            id: 0,
            title: ""
        });
    };
    copyToClipBoard = (event: React.FormEvent<EventTarget>) => {

    };

    render(): JSX.Element {
        const {classes} = this.props;
        let params = this.props.match.params as RouterProps;
        return (
            <div>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={3}><TextField
                            id="outlined-basic" label="ID" placeholder="#0000" variant="outlined" type="number"
                            name="id"
                            value={this.state.id}
                            onChange={this.handleChange}
                            required/></Grid>
                        <Grid item xs={9}><TextField
                            id="outlined-basic" label="Story title" placeholder="Title of the story" name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            variant="outlined" fullWidth/></Grid>
                        <Grid item xs={12}><TextField
                            id="outlined-basic" label="Story Description" placeholder="Description of the story"
                            value={this.state.description}
                            name="description" onChange={this.handleChange}
                            variant="outlined" rows={2} rowsMax={6} fullWidth multiline/></Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.root}
                                startIcon={<NoteAdd/>}
                                type="submit"
                            >
                                Deal
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Invite members
                            </Typography>
                            Invite members to join your session. <br/>
                            Session id: {params.sessionId} <br/>

                            <Button variant={"contained"} color={"primary"} onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/#/${params.sessionId}/gambler`);
                                this.setState({...this.state, openSnackbar: true});
                            }}>COPY INVITE LINK</Button>
                            <Snackbar
                                open={this.state.openSnackbar}
                                onClose={() => {
                                    this.setState({...this.state, openSnackbar: false})
                                }}
                                autoHideDuration={1000}
                                TransitionComponent={Fade}
                            >
                                <Alert severity="info">Invite URL copied!</Alert>
                            </Snackbar>
                        </Grid>
                    </Grid>
                </form>
            </div>);
    }
}

const mapDispatchToProps = (dispatch: Dispatch<PokerActionTypes>) => {
    const pokerActions = new PokerActions();
    return {
        addStory: async (story: StoryModel) => dispatch(pokerActions.makeDeal(story)),
    }
};
const mapStateToProps = (state: PokerState): PokerState => {
    return {
        stories: state.stories,
        cardTypeIndex: state.cardTypeIndex,
        sessionName: state.sessionToken,
        sessionToken: state.sessionToken
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(DealForm)));
