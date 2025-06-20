import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Switch,
  Redirect,
} from "react-router-dom";
import "./output.css";

import "./style.css";
import Home from "./views/home";
import Page from "./views/page";
import NotFound from "./views/not-found";
import contact from "./views/contact";
import About from "./views/about";
import Review from "./views/review";
import FAQs from "./views/faqs";
import Settings from "./views/settings";
import Cleanerspass2 from "./views/cleanerspass2";
import Dashboard from "./views/dashboard";
import Reward from "./views/reward";
import Cleanerspass from "./views/cleanerspass";
import Referral from "./views/referral";
import Schedule from "./views/schedule";
import Schedule1 from "./views/schedule1";
import Transaction from "./views/transaction";
import success from "./views/success";
import cancel from "./views/cancel";
import Settingsroom from "./views/settingsroom";
import Ref from "./views/ref";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import RouteGuard from "./components/RouteGuard";

const App = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    if (!userId) {
      window.location.href = "/#/";
    }
  });
  return (
    <>
      <HashRouter>
        <ScrollToTop />
        <RouteGuard />
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={contact} exact path="/contact" />
          <Route component={About} path="/about" />
          <Route component={Review} path="/review" />
          <Route component={FAQs} path="/faqs" />
          <Route component={Ref} path="/ref" />
          <Route component={success} exact path="/success" />
          <Route component={cancel} exact path="/cancel" />
          <Route component={Page} exact path="/page" />
          <PrivateRoute component={Dashboard} exact path="/dashboard" />
          <PrivateRoute component={Reward} exact path="/reward" />
          <PrivateRoute component={Settings} exact path="/settings" />
          <PrivateRoute component={Settingsroom} path="/settingsroom" />
          <PrivateRoute component={Transaction} exact path="/transaction" />
          <PrivateRoute component={Referral} exact path="/referral" />
          <PrivateRoute component={Schedule1} exact path="/schedule" />
          <PrivateRoute component={Cleanerspass} exact path="/cleanerspass" />
          <PrivateRoute component={Cleanerspass2} exact path="/cleanerspass2" />
          <Route component={NotFound} path="**" />
          <Redirect to="**" />
        </Switch>
      </HashRouter>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
