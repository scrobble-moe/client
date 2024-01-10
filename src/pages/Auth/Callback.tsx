import { AuthService } from "@buf/scrobble-moe_protobufs.bufbuild_connect-es/moe/scrobble/auth/v1/auth_service_connect.js";
import { Show, createEffect, createResource, createSignal } from "solid-js";
import type { Component } from "solid-js";
import { BallTriangle } from "solid-spinner";
import { useClient } from "../../hooks/useClient.jsx";
import { startWebauthn } from "../../util/auth.js";
import { plexOauth } from "../../util/plex.js";
import { TextButton } from "../UI.jsx";

export const Callback: Component = () => {
  const authClient = useClient(AuthService)();

  const [webAuthnResponse, setWebAuthnResponse] = createSignal<string>();

  const pin = Number.parseInt(localStorage.getItem("plexPin"));
  if (!pin) {
    window.location.href = "/landing";
  }
  localStorage.removeItem("plexPin");

  const [plexTokenResource] = createResource(() =>
    plexOauth.checkForAuthToken(pin),
  );
  const [plexAuthenticationResource] = createResource(plexTokenResource, () =>
    authClient.plexAuth({
      plexToken: plexTokenResource.latest,
    }),
  );
  const [webauthnResource] = createResource(webAuthnResponse, () => {
    authClient.webAuthn({
      plexToken: plexTokenResource.latest,
      verification: webAuthnResponse(),
    });
  });

  createEffect(async () => {
    webAuthn();
  }, [plexAuthenticationResource.latest]);

  const webAuthn = async () => {
    if (plexAuthenticationResource.latest) {
      const { webauthnOptions } = plexAuthenticationResource.latest;
      setWebAuthnResponse(await startWebauthn(webauthnOptions));
    }
  };

  return (
    <>
      <Show
        when={
          plexTokenResource.loading ||
          plexAuthenticationResource.loading ||
          webauthnResource.loading
        }
      >
        <BallTriangle class="text-textOne" />
      </Show>
      <Show
        when={
          plexTokenResource.error ||
          plexAuthenticationResource.error ||
          webauthnResource.error
        }
      >
        <p>Error</p>
      </Show>

      <Show
        when={plexTokenResource.latest && plexAuthenticationResource.latest}
      >
        <TextButton onclick={() => webAuthn}>Authenticate</TextButton>
      </Show>
    </>
  );
};
