import React, {ChangeEvent} from 'react';
import {Button, IconButton, TextField, Theme, withStyles} from "@material-ui/core";
import {Lock, NoteAdd} from '@material-ui/icons';
import DropDown from "../components/DropDown";

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

class CreateSession extends React.Component<Props> {

    state: State = {
        cardType: ""
    };

    handleChangeDropDown = (event: ChangeEvent<HTMLInputElement>): any => {
        this.setState({cardType: event.target.value}, () => console.log(this.state.cardType));
    };

    render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Session Name" variant="outlined"/>
                    <DropDown onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleChangeDropDown(e)}
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
                    <IconButton aria-label="delete">
                        <Lock/>
                    </IconButton>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.root}
                        startIcon={<NoteAdd/>}
                    >
                        Create
                    </Button>

                </form>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(CreateSession);