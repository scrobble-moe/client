import { Route, Routes } from "@solidjs/router";
import type { Component } from "solid-js";
import "./index.css";
import { Authenticated } from "./layout/Authenticated/index.jsx";
import { ModalView } from "./layout/Shared/ModalView.jsx";
import { Shared } from "./layout/Shared/index.jsx";
import { AniList } from "./pages/Auth/AniList.jsx";
import { Callback } from "./pages/Auth/Callback.jsx";
import { Redirect } from "./pages/Auth/Redirect.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Landing } from "./pages/Landing.jsx";
import { Test } from "./pages/Test.jsx";
import { UI } from "./pages/UI.jsx";

const App: Component = () => {
  return (
    <div class="h-screen bg-one">
      <Routes>
        <Route path="/" component={Shared}>
          <Route path="/" component={ModalView}>
            <Route path="/landing" component={Landing} />
            <Route path="/test" component={Test} />
          </Route>
          <Route path="/ui" component={UI} />
          <Route path="/" component={Dashboard} />
          <Route path="/auth" component={ModalView}>
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
