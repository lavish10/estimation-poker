import React from 'react';
import HomePage from "./containers/HomePage";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {blueGrey, deepOrange} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: blueGrey,
        secondary: deepOrange,
    }
});
const App: React.FC = () => {
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
                <HomePage/>
        </ThemeProvider>
    </div>
  );
};

export default App;
