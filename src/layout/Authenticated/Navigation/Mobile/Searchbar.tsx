import { MagnifyingGlassIcon } from "solid-phosphor/regular";
import { Component } from "solid-js";

export const SearchBar: Component = () => {
  return (
    <div class="min-w-0 flex-1 px-12 lg:hidden">
      <div class="mx-auto w-full max-w-xs">
        <div class="relative text-white focus-within:text-gray-600">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon class="w-5" />
          </div>
          <input
            id="desktop-search"
            class="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
            placeholder="Search"
            type="search"
            name="search"
          />
        </div>
      </div>
    </div>
  );
};
