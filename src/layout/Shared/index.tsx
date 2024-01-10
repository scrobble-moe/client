import { Outlet } from "@solidjs/router";
import type { Component } from "solid-js";

export const Shared: Component = () => {
  return (
    <div class="flex h-full">
      <Outlet />
    </div>
  );
};
