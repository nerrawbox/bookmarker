import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Dashboard from './containers/Dashboard';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>

          <Route exact path={''} render={() => <Redirect to="/home" />} />
          <Route exact path={'/home'} component={Dashboard} />

        </Router>
      </div>
    )
  }
}

export default App;
