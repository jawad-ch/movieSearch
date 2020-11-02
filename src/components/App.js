import React from 'react';
import Header from './Header';
import Home from './Home';
import Movie from './Movie';
import NotFound from './NotFound';
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
          {/* <Route  component={NotFound} /> */}
        </Switch>
        {/* <Movie movieId={497582}/> */}
      </Router>
    </div>
  );
}

export default App;
