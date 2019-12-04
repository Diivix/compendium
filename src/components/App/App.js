import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
// import Login from '../login/Login';
import { Switch } from 'react-router';
import Routes from '../routes/Routes';
import { isUserAuthenticated } from '../../utils/auth';

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
    primary: { main: '#0096a7' },
    secondary: { main: '#9E9E9E' }
  }
});

function App() {
  const isAuthenticated = isUserAuthenticated();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div>
          {isAuthenticated && (
            // <NavbarComponent activeItem={this.state.activeItem} handleItemClick={this.handleItemClick} handleSignOut={this.handleSignOut} />
            <div>NavBar here...</div>
          )}
          <div className="content">
            <Switch>
              <Routes isAuthenticated={isAuthenticated} />
            </Switch>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
