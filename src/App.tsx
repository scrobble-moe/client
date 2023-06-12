import type { Component } from "solid-js";
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
    <div class="h-screen bg-[#E6D584]">
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
  );
};

export default App;
