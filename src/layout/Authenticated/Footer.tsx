import { Component, JSX } from "solid-js";

export const Footer: Component = () => {
  return (
    <footer>
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
          <span class="block sm:inline">
            &copy; 2021 Your Company, Inc. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
