import { Component } from "solid-js";
import { Outlet } from "@solidjs/router";
import { Navigation } from "../Shared/Navigation.jsx";

export const Public: Component = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};
