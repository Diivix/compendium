import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import 'rpg-awesome/css/rpg-awesome.min.css';
import { StoreProvider } from './store';
import reducers from './reducers';
import initialState from './store/initialState';

const primaryColor = '#' + process.env.REACT_APP_PRIMARY_COLOR;
const secondaryColor = '#' + process.env.REACT_APP_SECONDARY_COLOR;
const backgroundColor = '#' + process.env.REACT_APP_BACKGROUND_COLOR;

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Raleway',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  palette: {
    type: 'dark',
    background: { paper: secondaryColor, default: backgroundColor },
    primary: { main: primaryColor },
    secondary: { main: secondaryColor }
  }
});

ReactDOM.render(
  <StoreProvider initialState={initialState} reducer={reducers}>
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Route path="/" component={App} onEnter="/login" />
    </Router>
  </MuiThemeProvider>
  </StoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
