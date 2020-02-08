import React from 'react';
import {AppBar, Card, CardHeader, createStyles, Grid, Tab, Tabs, Theme,} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import NavTab from "../components/NavTab";

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
        selector: {
            padding: theme.spacing(2),
            color: theme.palette.primary.main,
        }
    }),
);
export default function PageContent() {
    let classes = useStyles();
    const [value, setValue] = React.useState(0);

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
                            <NavTab values={["Create Session", "Join Session"]} tabpanel={[<>Create Session</>, <>Join Session</>]}/>
                        </Card>
                    </Grid>
                </Grid>
            </div>

        </>
    );
}