import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import StartPage from "./pages/StartPage";
import TestPage from "./pages/TestPage";
import TestExample from "./pages/TestExample";
import TestResultPage from "./pages/TestResultPage";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import UserInfo, { UserContext } from "./pages/UserInfo";
import ResultGraph from "./pages/ResultGraph";

export default function App() {
  return (
    <UserInfo>
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
          <Route path="/result_graph" component={ResultGraph}></Route>
        </Switch>
      </div>
    </UserInfo>
  );
}
