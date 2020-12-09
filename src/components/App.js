import React from 'react';
import Header from './Header';
import Home from './Home';
import Movie from './Movie';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:movieId" component={Movie} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
