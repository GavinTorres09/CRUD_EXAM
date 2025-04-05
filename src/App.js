import 'styles/main.scss';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Page } from 'components/Pages';
import Home from 'views/home';
import Users from 'views/users';
import ParticlesBackground from 'components/ParticlesBackground';  // Import ParticlesBackground component

function App() {
  return (
    <div className='app'>
      <Router>
        <ParticlesBackground /> {/* Add ParticlesBackground globally here */}
        <Page>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='*'>
              404 {/* You can replace this with a 404 page component */}
            </Route>
          </Switch>
        </Page>
      </Router>
    </div>
  );
}

export default App;
