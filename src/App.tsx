import React from 'react';
import HomePage from "./containers/HomePage";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "./models/MaterialTheme";
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import PokerTable from "./containers/PokerTable";
import {Provider} from "react-redux"
import store from "./redux/Store"
import GamblerPage from "./containers/GamblerPage";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <ThemeProvider theme={theme}>
                    <Router>
                        <Switch>
                            <Route exact path={"/"} component={HomePage}/>
                            <Route exact path={"/:sessionId/poker-table"} component={PokerTable}/>
                            <Route exact path={"/:sessionId/gambler"} component={GamblerPage}/>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </div>
        </Provider>
    );
};

export default App;
