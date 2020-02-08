import React from 'react';
import {createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            // textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);
export default function PageContent() {
    let classes = useStyles();
    return (
        <>

            <div className={classes.root}>
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant={"h5"} color={"secondary"}>
                                Scrum Poker
                            </Typography>

                        </Paper>
                    </Grid>
                </Grid>
            </div>

        </>
    );
}