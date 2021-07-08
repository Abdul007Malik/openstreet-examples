import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Route, Switch, BrowserRouter as Router } from "react-router";
import Home from "./Home";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Example1 from "./Examples/Example1";
import Example2 from "./Examples/Example2";
import Example3 from "./Examples/Example3";
import Example4 from "./Examples/Example4";
import Example5 from "./Examples/Example5";
import Example6 from "./Examples/Example6";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1> Open Layers Example </h1>
          <Switch>
            <Route path="/example-1" component={Example1}></Route>
            <Route path="/example-2" component={Example2}></Route>
            <Route path="/example-3" component={Example3}></Route>
            <Route path="/example-4" component={Example4}></Route>
            <Route path="/example-5" component={Example5}></Route>
            <Route path="/example-6" component={Example6}></Route>
            <Route exact path="/" component={Home}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
