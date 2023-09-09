import { Component, Show, createEffect, createResource } from "solid-js";
import { BallTriangle } from "solid-spinner";
import { plexOauth } from "../../util/plex.js";

export const Redirect: Component = () => {
  const [data] = createResource(() => plexOauth.requestHostedLoginURL());

  createEffect(() => {
    if (data.latest) {
      const [url, pin] = data.latest;
      localStorage.setItem("plexPin", pin.toString());
      window.location.href = url;
    }
  });

  return (
    <div class="m-auto">
      <Show when={data.loading || data.latest}>
        <BallTriangle class="text-textOne" />
      </Show>
      <Show when={data.error}>
        <p>Error</p>
      </Show>
    </div>
  );
};
