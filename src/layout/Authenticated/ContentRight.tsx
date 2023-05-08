import { Component, JSX } from "solid-js";

export interface ContentRightProps {
  children: JSX.Element;
}

export const ContentRight: Component<ContentRightProps> = (props) => {
  return (
    <section class="grid grid-cols-1 p-6 rounded-lg bg-white shadow-md">
      {props.children}
    </section>
  );
};
