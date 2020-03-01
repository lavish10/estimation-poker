import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Header from "../uicomponents/Header";
import Box from "@material-ui/core/Box";
import {Button, Card, createStyles, Grid, Theme} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

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
export default function BetTable() {

    const [stompClient, setStompClient]: any = useState(Stomp.over(new SockJS("http://localhost:8080/gs-guide-websocket")));

    //listen to stompjs endpoint
    let {sessionId} = useParams();
    console.log(sessionId);

    const handleSubmit = () => {
        //send data through stomp-js endpoint
        stompClient.send("/app/session/" + sessionId, {}, JSON.stringify({'from': "#name", 'text': 'dummy content'}));
    };

    useEffect(() => {
        stompClient.connect({}, function (frame: any) {
            console.log('Connected: ' + frame);
        });
    });
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
                                        <div>
                                            <form onSubmit={handleSubmit}>
                                                <input type="text"/>
                                                <Button type={"submit"}>Submit</Button>
                                            </form>
                                        </div>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </>
                </Box>
            </Container>
        </>
    );


};

