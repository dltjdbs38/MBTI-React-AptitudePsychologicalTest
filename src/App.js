import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import StartPage from "./pages/StartPage";
import TestPage from "./pages/TestPage";
import TestExample from "./pages/TestExample";
import styled from "styled-components";
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={StartPage}>
            <StartPage></StartPage>
          </Route>
          <Route path="/test_example" component={TestExample}>
            <TestExample></TestExample>
          </Route>
          <Route path="/test" component={TestPage}>
            <TestPage></TestPage>
          </Route>
          <Route path="/test_result" component={TestResultPage}>
            <TestResultPage></TestResultPage>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
