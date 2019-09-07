import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Login from '../Login/Login';

// Sets the theme for the app
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
    primary: {
      main: '#d4af37'
    },
    secondary: {
      main: '#868a86',
      contrastText: '#ffffff'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Login />
      </div>
    </ThemeProvider>
  );
}

export default App;
