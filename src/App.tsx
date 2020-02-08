import React from 'react';
import HomePage from "./containers/HomePage";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "./models/MaterialTheme";

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
