import type { Component } from "solid-js";
import { GraphQLProvider } from "./GraphQLProvider.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Routes, Route } from "@solidjs/router";
import { Redirect } from "./pages/Auth/Redirect.jsx";
import { Callback } from "./pages/Auth/Callback.jsx";
import "./index.css";
import { Authenticated } from "./layout/Authenticated/index.jsx";
import { Public } from "./layout/Public/index.jsx";
import { AniList } from "./pages/Auth/AniList.jsx";

const App: Component = () => {
  return (
    <GraphQLProvider>
      <div class="h-screen">
        <Routes>
          <Route path="/" component={Public}>
            <Route path="/" component={Dashboard} />
            <Route path="/auth">
              <Route path="/redirect" component={Redirect} />
              <Route path="/callback" component={Callback} />
              <Route path="/AniList" component={AniList} />
            </Route>
          </Route>
          <Route path="/dashboard" component={Authenticated}>
            <Route path="/" component={Dashboard} />
          </Route>
        </Routes>
      </div>
    </GraphQLProvider>
  );
};

export default App;
