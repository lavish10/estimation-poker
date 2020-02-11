import React from 'react';
import {Card, CardHeader, createStyles, Grid, Paper, Theme,} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import NavTab from "../uicomponents/NavTab";
import CreateSession from "../components/CreateSession";
import JoinSession from "../components/JoinSession";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        selector: {
            padding: theme.spacing(1),
            color: theme.palette.primary.main,
        }
    }),
);
export default function PageContent() {
    let classes = useStyles();
    const [ value, setValue ] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            <div className={classes.root}>
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <Card className={classes.paper}>
                            <CardHeader title={"Scrum Poker"}/>
                            <NavTab values={[ "Create Session", "Join Session" ]}
                                    tabpanel={[
                                        <Grid container spacing={3} direction="row" justify="center"
                                              alignItems="center">
                                            <Grid item xs={12} sm={6}>
                                                <Paper variant={"outlined"} className={classes.paper}>
                                                    <CreateSession/>
                                                </Paper>
                                            </Grid>
                                        </Grid>,
                                        <Grid container spacing={3} direction="row" justify="center"
                                              alignItems="center">
                                            <Grid item xs={12} sm={6}>
                                                <Paper variant={"outlined"} className={classes.paper}>
                                                    <JoinSession/>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    ]}/>
                        </Card>
                    </Grid>
                </Grid>
            </div>

        </>
    );
}