import React from 'react';
import HomePage from "./containers/HomePage";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "./models/MaterialTheme";
import {HashRouter as Router, Route} from 'react-router-dom';
import PokerTable from "./containers/PokerTable";

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <Route exact path={"/"} component={HomePage}/>
                    <Route exact path={"/poker-table"} component={PokerTable}/>
                </Router>
            </ThemeProvider>
        </div>
    );
};

export default App;
