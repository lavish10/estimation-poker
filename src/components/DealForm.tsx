import React, {ChangeEvent, Dispatch} from 'react';
import {Button, Grid, TextField, Theme, withStyles} from "@material-ui/core";
import {NoteAdd} from '@material-ui/icons';
import {StoryModel} from "../interfaces/StoryModel";
import {PokerActionTypes} from "../redux/types/PokerActionTypes";
import PokerActions from "../redux/actions/PokerActions";
import {connect} from "react-redux";

interface DispatchProps {
    classes: any
    addStory: (story: StoryModel) => void
}

interface State {
    id: number,
    title: string,
    description: string
}

interface Props extends DispatchProps {

}

const styles = (theme: Theme) => ({
    root: {
        color: theme.palette.primary.contrastText
    },
});

class DealForm extends React.Component<Props, State> {

    state: State = {
        description: "",
        id: 0,
        title: ""
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, [event.target.name]: event.target.value});
    };

    handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        this.props.addStory({
            description: this.state.description,
            id: this.state.id,
            title: this.state.title
        });
        this.setState({
            description: "",
            id: 0,
            title: ""
        });
    };

    render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={2}><TextField
                            id="outlined-basic" label="Story id" placeholder="#0000" variant="outlined" type="number"
                            name="id"
                            onChange={this.handleChange}
                            required/></Grid>
                        <Grid item xs={10}><TextField
                            id="outlined-basic" label="Story title" placeholder="Title of the story" name="title"
                            onChange={this.handleChange}
                            variant="outlined" fullWidth/></Grid>
                        <Grid item xs={12}><TextField
                            id="outlined-basic" label="Story Description" placeholder="Description of the story"
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

export default connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(DealForm));
