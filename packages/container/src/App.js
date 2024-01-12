import React, { lazy, Suspense, useState, useEffect } from "react";
import Header from "./components/Header";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import { createBrowserHistory } from "history";
import Progress from "./components/Progress";

const LazyAuth = lazy(() => import("./components/AuthApp"));
const LazyMarketing = lazy(() => import("./components/MarketingApp"));
const LazyDashboard = lazy(() => import("./components/DashboardApp"));

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const generateClassName = createGenerateClassName({
    productionPrefix: "co",
  });

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <LazyAuth onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <LazyDashboard />
              </Route>
              <Route path="/" component={LazyMarketing} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
