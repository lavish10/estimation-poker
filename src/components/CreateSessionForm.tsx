import React, {ChangeEvent, Dispatch} from 'react';
import {Button, Grid, TextField, Theme, withStyles} from "@material-ui/core";
import {Lock, NoteAdd} from '@material-ui/icons';
import DropDown from "../uicomponents/DropDown";
import {cardValues} from "../models/CardTypes";
import {PokerActionTypes} from "../redux/types/PokerActionTypes";
import PokerActions from "../redux/actions/PokerActions";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

interface dispatchProps {
    setCardType: (cardType: number) => void
}

interface Props extends dispatchProps {
    classes: any
}

interface State {
    cardType: string,
    toPokerTable: boolean
}

const styles = (theme: Theme) => ({
    root: {
        color: theme.palette.primary.contrastText
    }
});

class CreateSessionForm extends React.Component<Props> {

    state: State = {
        cardType: "",
        toPokerTable: false
    };

    handleChangeDropDown = (event: ChangeEvent<HTMLInputElement>): any => {
        this.setState({cardType: event.target.value}, () => console.log(this.state.cardType));
    };

    onFormSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        this.props.setCardType(parseInt(this.state.cardType)); //Store cardType index in redux-store
        console.log(parseInt(this.state.cardType));
        this.setState({...this.state, toPokerTable: true});
    };

    render(): JSX.Element {
        const {classes} = this.props;
        if (this.state.toPokerTable) {
            return <Redirect to={"12345/poker-table"}/>    // TODO: Fetch 12345 from redux store & generate, save randomly generated value
        } else {
            return (
                <div>
                    <form noValidate autoComplete="off" onSubmit={this.onFormSubmit}>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic" label="Session Name" variant="outlined" fullWidth/>
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
}

const mapDispatchToProps = (dispatch: Dispatch<PokerActionTypes>) => {
    const pokerActions = new PokerActions();
    return {
        setCardType: async (cardType: number) => dispatch(pokerActions.setCardType(cardType)),
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(CreateSessionForm));