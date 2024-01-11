import React, { lazy, Suspense, useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import Progress from "./components/Progress";

const LazyAuth = lazy(() => import("./components/AuthApp"));
const LazyMarketing = lazy(() => import("./components/MarketingApp"));

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const generateClassName = createGenerateClassName({
    productionPrefix: "co",
  });
  return (
    <BrowserRouter>
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
              <Route path="/" component={LazyMarketing} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
