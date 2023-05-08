import { A } from "@solidjs/router";
import { BellIcon, LogInIcon } from "lucide-solid";
import { Component } from "solid-js";

export const TopNav: Component = () => {
  return (
    <div class="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
      <button
        type="button"
        class="flex-shrink-0 rounded-full p-1 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        <BellIcon />
      </button>

      <div class="relative ml-4 flex-shrink-0">
        <button
          type="button"
          class="flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100"
          id="user-menu-button"
        >
          <img
            class="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </button>
      </div>

      <A
        href="/auth/redirect"
        class="inline-flex items-center ml-4 pt-1 border-b-2 border-transparent text-sm font-medium text-indigo-200 hover:text-white hover:border-white"
      >
        <LogInIcon />
      </A>
    </div>
  );
};
