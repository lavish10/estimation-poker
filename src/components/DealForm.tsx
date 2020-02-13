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

class DealForm extends React.Component<Props> {

    render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div>
                <form noValidate autoComplete="off">
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={2}><TextField
                            id="outlined-basic" label="Story id" placeholder="#0000" variant="outlined"
                            required/></Grid>
                        <Grid item xs={10}><TextField
                            id="outlined-basic" label="Story title" placeholder="Title of the story"
                            variant="outlined" fullWidth/></Grid>
                        <Grid item xs={12}><TextField
                            id="outlined-basic" label="Story Description" placeholder="Description of the story"
                            variant="outlined" rows={2} rowsMax={6} fullWidth multiline/></Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.root}
                                startIcon={<NoteAdd/>}
                            >
                                Deal
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </div>);
    }
}

export default withStyles(styles, {withTheme: true})(DealForm);