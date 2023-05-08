import { Component, JSX } from "solid-js";

export interface ContentLeftProps {
  children: JSX.Element;
}

export const ContentLeft: Component<ContentLeftProps> = (props) => {
  return (
    <section class="grid grid-cols-1 p-6 rounded-lg bg-white shadow-md lg:col-span-2">
      {props.children}
    </section>
  );
};
