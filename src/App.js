import React from "react";
import Home from "./Home"
import Game from "./components/Games/Game"

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
       <header>
         <h1>Find & track the best  free-to-play games!</h1>
         <h2>Search for what to play next!</h2>
       </header>
       <main>
         <Router>
          <Switch>
            <Route path="/game/:id">
              <Game />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/">
              <Home />
            </Route>
           </Switch>
         </Router>
        </main>
    </div>
  );
}
export default App;
