import React, {ChangeEvent, Dispatch} from 'react';
import {Button, Grid, TextField, Theme, withStyles} from "@material-ui/core";
import {Lock, NoteAdd} from '@material-ui/icons';
import DropDown from "../uicomponents/DropDown";
import {cardValues} from "../models/CardTypes";
import {PokerActionTypes} from "../redux/types/PokerActionTypes";
import PokerActions from "../redux/actions/PokerActions";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {randomBytes} from "crypto";

interface dispatchProps {
    setCardType: (cardType: number) => void
    setSessionName: (name: string) => void
    setSessionToken: (token: string) => void
}

interface Props extends dispatchProps, RouteComponentProps {
    classes: any
}

interface State {
    cardType: string,
    sessionName: string,
    sessionToken: string
}

const styles = (theme: Theme) => ({
    root: {
        color: theme.palette.primary.contrastText
    }
});

class CreateSessionForm extends React.Component<Props, State> {

    state: State = {
        cardType: "",
        sessionName: "",
        sessionToken: ""
    };

    handleChangeDropDown = (event: ChangeEvent<HTMLInputElement>): any => {
        this.setState({cardType: event.target.value}, () => console.log(this.state.cardType));
    };

    handleChangeSessionName = (event: ChangeEvent<HTMLInputElement>): any => {
        this.setState({...this.state, sessionName: event.target.value}, () => console.log(this.state.sessionName));
    };

    onFormSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        let sessionTokenFromCrypto = randomBytes(7).toString('hex');

        this.setState({
            ...this.state,
            sessionToken: sessionTokenFromCrypto
        }, () => {
            this.props.setSessionToken(sessionTokenFromCrypto);
            this.props.setCardType(parseInt(this.state.cardType)); //Store cardType index in redux-store
            this.props.setSessionName(this.state.sessionName); //Store session Name in redux-store
            this.props.history.push("/" + this.state.sessionToken + "/poker-table")
        });
        // console.log(this.state);
        // console.log("sessionTokenFromCrypto" + sessionTokenFromCrypto);
        // console.log(parseInt(this.state.cardType));
    };

    render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div>
                <form noValidate autoComplete="off" onSubmit={this.onFormSubmit}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                            <TextField value={this.state.sessionName} id="outlined-basic"
                                       onChange={this.handleChangeSessionName}
                                       label="Session Name" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12}><DropDown
                            onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleChangeDropDown(e)}
                            values={cardValues()}
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <Lock/>
                        </Grid>
                        <Grid item xs={12}><Button
                            variant="contained"
                            color="secondary"
                            className={classes.root}
                            startIcon={<NoteAdd/>}
                            type="submit"
                        >
                            Create
                        </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<PokerActionTypes>) => {
    const pokerActions = new PokerActions();
    return {
        setCardType: async (cardType: number) => dispatch(pokerActions.setCardType(cardType)),
        setSessionName: async (name: string) => dispatch(pokerActions.setSessionName(name)),
        setSessionToken: async (token: string) => dispatch(pokerActions.setSessionToken(token)),
    }
};

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(CreateSessionForm)));