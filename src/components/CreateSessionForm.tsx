import React, {ChangeEvent} from 'react';
import {Button, Grid, TextField, Theme, withStyles} from "@material-ui/core";
import {Lock, NoteAdd} from '@material-ui/icons';
import DropDown from "../uicomponents/DropDown";

interface Props {
    classes: any
}

interface State {
    cardType: string
}

const styles = (theme: Theme) => ({
    root: {
        color: theme.palette.primary.contrastText
    }
});

class CreateSessionForm extends React.Component<Props> {

    state: State = {
        cardType: ""
    };

    handleChangeDropDown = (event: ChangeEvent<HTMLInputElement>): any => {
        this.setState({cardType: event.target.value}, () => console.log(this.state.cardType));
    };

    render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div>
                <form noValidate autoComplete="off">
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="Session Name" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12}><DropDown
                            onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleChangeDropDown(e)}
                            values={[
                                [ 1, 2, 3, 5, 8, 13, 20, 40 ],
                                [ 0, 1, 2, 4, 8, 16, 32, 64 ],
                                [ 1, 2, 4, 8, 12, 16, 24, 40, 80 ],
                                [ '☕', 1, 2, 3, 5, 8, 13, 20 ],
                                [ "XS", "S", "M", "L", "XL", "XXL" ],
                                [ 1, 2, 5, 10, 20, 50, 100 ],
                                [ 1, 2, 3, 4, 5 ]
                            ]}
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

export default withStyles(styles, {withTheme: true})(CreateSessionForm);