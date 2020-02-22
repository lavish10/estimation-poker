import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardHeader, createStyles, Grid, Paper, Theme} from "@material-ui/core";
import Header from "../uicomponents/Header";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import DealForm from "../components/DealForm";
import ViewStories from "../components/ViewStories";

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
export default function PokerTable() {
    const classes = useStyles();
    return (
        <>
            <Header children={<></>}/>
            <Container>
                <Box my={2}>
                    <>
                        <div className={classes.root}>
                            <Grid container spacing={10}>
                                <Grid item xs={12}>
                                    <Card className={classes.paper}>
                                        <CardHeader title={"Poker Table"}/>
                                        <Grid container spacing={3} direction="row" justify="center"
                                              alignItems="center">
                                            <Grid item xs={12} sm={6}>
                                                <Paper variant={"outlined"} className={classes.paper}>
                                                    <DealForm />
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Paper variant={"outlined"} className={classes.paper}>
                                                    <ViewStories />
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>

                            </Grid>
                        </div>
                    </>
                </Box>
            </Container>
        </>
    );

}