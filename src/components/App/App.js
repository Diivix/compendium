import React from 'react';
import { Switch } from 'react-router';
import Routes from '../routes/Routes';
import { isUserAuthenticated } from '../../utils/auth';

function App() {
  const isAuthenticated = isUserAuthenticated();

  return (
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
  );
}

export default App;
