import { NavLink } from "@solidjs/router";
import {
  BellIcon,
  GemIcon,
  GrapeIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
} from "lucide-solid";
import { Component, JSX, createSignal } from "solid-js";
import { TopNav } from "./TopNav.js";
import { MobileNav } from "../Authenticated/Navigation/Mobile/MobileNav.js";
import { DesktopNav } from "../Authenticated/Navigation/Desktop/DesktopNav.js";

export interface NavigationProps {
  children?: JSX.Element;
}

export const Navigation: Component<NavigationProps> = (props) => {
  return (
    <header class="bg-indigo-600 pb-24">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="relative flex items-center justify-center py-5 lg:justify-between">
          {/* Logo */}
          <div class="absolute left-0 flex-shrink-0 lg:static">
            <GrapeIcon class="text-gray-200" />
          </div>
          <TopNav />
          <MobileNav />
        </div>
        {props.children}
      </div>

      {/* <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} /> */}
    </header>
  );
};
