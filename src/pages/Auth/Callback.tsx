import { AuthService } from "@buf/scrobble-moe_protobufs.bufbuild_connect-es/moe/scrobble/auth/v1/auth_service_connect.js";
import {
  Component,
  Show,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { useClient } from "../../hooks/useClient.jsx";
// import { CircleNotchIcon, SpinnerIcon } from "solid-phosphor/regular";
import { startWebauthn } from "../../util/auth.js";
import { plexOauth } from "../../util/plex.js";
import { Card } from "../UI.jsx";

export const Callback: Component = () => {
  const authClient = useClient(AuthService)();

  const [webAuthnResponse, setWebAuthnResponse] = createSignal<string>();

  const pin = parseInt(localStorage.getItem("plexPin"));
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
    console.log(plexAuthenticationResource.latest);

    if (plexAuthenticationResource.latest) {
      const { webauthnOptions } = plexAuthenticationResource.latest;
      setWebAuthnResponse(await startWebauthn(webauthnOptions));
    }
  }, [plexAuthenticationResource.latest]);

  return (
    <Card title="Authentication">
      {JSON.stringify(webAuthnResponse())}
      {JSON.stringify(pin)}
      {JSON.stringify(plexTokenResource())}
      {JSON.stringify(plexAuthenticationResource())}
      {JSON.stringify(webauthnResource())}
      <Show
        when={plexTokenResource.loading || plexAuthenticationResource.loading}
      >
        <div class="m-auto">
          {/* <CircleNotchIcon class="animate-spin text-gray-700 w-16 h-16" /> */}
        </div>
      </Show>
      <Show
        when={
          plexTokenResource.error ||
          plexAuthenticationResource.error ||
          webauthnResource.error
        }
      >
        <p>Token Error: {plexTokenResource.error.message}</p>
        <p>Authenticate Error: {plexAuthenticationResource.error.message}</p>
        <p>Webauthn Error: {webauthnResource.error.message}</p>
      </Show>
      <Show
        when={plexTokenResource.latest && plexAuthenticationResource.latest}
      >
        <div>
          <img
            src={plexAuthenticationResource.latest.avatarUrl}
            alt="Plex Avatar"
          />
          <p>{plexAuthenticationResource.latest.username}</p>
        </div>
      </Show>

      <Show when={webauthnResource.loading}>
        <div class="m-auto">
          {/* <SpinnerIcon class="animate-spin text-gray-700 w-16 h-16" /> */}
        </div>
      </Show>
      <Show when={webauthnResource.latest}>
        <div>
          <p>{JSON.stringify(webauthnResource.latest)}</p>
        </div>
      </Show>

      {JSON.stringify(webAuthnResponse())}
    </Card>
  );
};
