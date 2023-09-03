import { Outlet } from "@solidjs/router";
import { Component } from "solid-js";

export const Authenticated: Component = () => {
  return (
    <div class="flex flex-col min-h-full">
      <div class="justify-center flex grow">
        <main class="-mt-24 grow grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
