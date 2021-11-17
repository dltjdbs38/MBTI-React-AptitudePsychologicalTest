import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import StartPage from "./pages/StartPage";
import TestExample from "./components/TestExample";
import styled from "styled-components";
import { Route, Switch, Link, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <StartPage></StartPage>
          </Route>
          <Route path="/test_example">
            <TestExample></TestExample>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
