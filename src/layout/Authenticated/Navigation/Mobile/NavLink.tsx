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
      activeClass="text-fuchsia-500 hover:text-fuchsia-400"
      inactiveClass="text-gray-900 hover:text-gray-800"
      end={true}
      class="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100"
    >
      {props.children}
    </A>
  );
};
