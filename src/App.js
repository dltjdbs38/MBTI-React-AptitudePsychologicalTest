import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import StartPage from "./pages/StartPage";
import TestPage from "./pages/TestPage";
import TestExample from "./pages/TestExample";
import TestResultPage from "./pages/TestResultPage";
import styled from "styled-components";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { InfoContext } from "./pages/UserInfo";

export default function App() {
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
          <Route path="/test">
            <TestPage></TestPage>
          </Route>
          <Route path="/test_result" component={TestResultPage}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
