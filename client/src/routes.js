import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Links } from "./pages/Links";
import { Create } from "./pages/Create";
import { LinkDetail } from "./pages/LinkDetail";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" esxact>
          <Links />
        </Route>
        <Route path="/create" exact>
          <Create />
        </Route>
        <Route path="/detail/:id">
          <LinkDetail />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/">
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
