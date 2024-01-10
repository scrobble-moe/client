import { Outlet } from "@solidjs/router";
import type { Component } from "solid-js";

export const ModalView: Component = () => {
  return (
    <div class="flex bg-two rounded-xl drop-shadow-md m-auto w-5/6 md:w-1/2 h-1/2 overflow-hidden">
      <div class="flex flex-col w-20 md:w-44 bg-four px-2 py-4 md:p-8">
        <img alt="Scrobble.moe Logo" src="/logo.svg" class="mx-auto" />
      </div>
      <div class="flex p-8 m-auto">
        <Outlet />
      </div>
    </div>
  );
};
