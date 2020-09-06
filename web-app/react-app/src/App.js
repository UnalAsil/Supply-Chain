import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import MainPage from "./pages"
import NotFoundPage from "./pages/404"
import Producer from "./pages/producer"
import Logistic from "./pages/logistic"
import Inspector from "./pages/inspector"
import Hall from "./pages/hall"
import Market from "./pages/market"
import Consumer from "./pages/consumer"


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/producer" component={Producer} />
        <Route exact path="/logistic" component={Logistic} />
        <Route exact path="/inspector" component={Inspector} />
        <Route exact path="/hall" component={Hall} />
        <Route exact path="/market" component={Market} />
        <Route exact path="/consumer" component={Consumer} />

        <Route eact path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}
export default App;