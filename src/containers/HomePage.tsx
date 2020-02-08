import React from 'react';
import Header from "../components/Header";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import PageContent from "./PageContent";


export default function HomePage() {
    return (
        <>
            <Header  children={<></>}/>
            <Container>
                <Box my={2}>
                    <PageContent />
                </Box>
            </Container>
        </>
    );
}