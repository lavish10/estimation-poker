import React from 'react';
import {Button, Grid, TextField, Theme, withStyles} from "@material-ui/core";
import {NoteAdd} from '@material-ui/icons';

interface Props {
    classes: any
}

interface State {
}

const styles = (theme: Theme) => ({
    root: {
        color: theme.palette.primary.contrastText
    },
});

class JoinSessionForm extends React.Component<Props> {

    render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div>
                <form noValidate autoComplete="off">
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={12}><TextField
                            id="outlined-basic" label="Session id" variant="outlined" fullWidth/></Grid>
                        <Grid item xs={12}><TextField
                            id="outlined-basic" label="Name" variant="outlined" fullWidth/></Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.root}
                                startIcon={<NoteAdd/>}
                            >
                                Join Session
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </div>);
    }
}

export default withStyles(styles, {withTheme: true})(JoinSessionForm);