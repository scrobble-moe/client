import { A } from "@solidjs/router";
import { Component, JSX } from "solid-js";

export interface NavLinkProps {
  href: string;
  children?: JSX.Element;
}

export const NavLink: Component<NavLinkProps> = (props) => {
  return (
    <A
      href={props.href}
      activeClass="text-fucia-400"
      inactiveClass="text-white"
      end={true}
      class="text-indigo-100 rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
    >
      {props.children}
    </A>
  );
};
