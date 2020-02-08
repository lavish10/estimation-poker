import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: { // works
            main: '#1976d2',
            contrastText: '#fff',
        },
        secondary: { // works
            main: '#171b1b',
            contrastText: '#fff',
        }
    },
});