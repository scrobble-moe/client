import { SearchIcon } from "lucide-solid";
import { Component, JSX, createSignal } from "solid-js";
import { Searchbar } from "./Searchbar.js";
import { NavLink } from "./NavLink.jsx";

export const DesktopNav: Component = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);
  return (
    <div class="hidden border-t border-white border-opacity-20 py-5 lg:block">
      <div class="grid grid-cols-3 items-center gap-8">
        <div class="col-span-2">
          <nav class="flex space-x-4">
            <NavLink href="/dashboard">Home</NavLink>
            <NavLink href="/auth/redirect">Redirect</NavLink>

            <a
              href="https://anilist.co/api/v2/oauth/authorize?client_id=2443&redirect_uri=http://localhost:3000/auth/anilist&response_type=code"
              class="text-indigo-100 rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
            >
              Anilist Auth
            </a>

            <a
              href=""
              class="text-indigo-100 rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
            >
              Resources
            </a>
          </nav>
        </div>
        <Searchbar />
      </div>
    </div>
  );
};
