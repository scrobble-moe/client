import { Component, Show, createEffect, createResource } from "solid-js";
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
    <div>
      <Show when={data.loading}>
        <p>Loading...</p>
      </Show>
      <Show when={data.error}>
        <p>Error: {data.error.message}</p>
      </Show>
      <Show when={data.latest}>
        <p>Success</p>
      </Show>
    </div>
  );
};
