import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Card, createStyles, Grid, Theme} from "@material-ui/core";
import Header from "../uicomponents/Header";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import BetTable from "../components/BetForm";
import EstimationPokerService from "../service/EstimationPokerService";

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
export default function GamblerPage() {
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
                                        <BetTable pokerService={EstimationPokerService.getInstance()}/>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </>
                </Box>
            </Container>
        </>
    )

}