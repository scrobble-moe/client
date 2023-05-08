import {
  Component,
  Show,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/typescript-types";
import { plexOauth } from "../../util/plex.js";
import { useGraphQL } from "../../GraphQLProvider.jsx";
import {
  PlexAuthenticationMutationResponse,
  PlexAuthenticationMutationVariables,
  plexAuthenticationMutation,
} from "../../graphql/plexAuthentication.js";
import { Loader2Icon, LoaderIcon } from "lucide-solid";
import {
  WebauthnMutationResponse,
  WebauthnMutationVariables,
  webauthnMutation,
} from "../../graphql/webauthn.js";
import { startWebauthn } from "../../util/auth.js";

export const Callback: Component = () => {
  const { client } = useGraphQL();

  const [webAuthnResponse, setWebAuthnResponse] = createSignal<string>();

  const pin = parseInt(localStorage.getItem("plexPin"));
  localStorage.removeItem("plexPin");

  const [plexTokenResource] = createResource(() =>
    plexOauth.checkForAuthToken(pin),
  );
  const [plexAuthenticationResource] = createResource(plexTokenResource, () =>
    client
      .mutation<
        PlexAuthenticationMutationResponse,
        PlexAuthenticationMutationVariables
      >(plexAuthenticationMutation, {
        plexToken: plexTokenResource.latest,
      })
      .toPromise(),
  );
  const [webauthnResource] = createResource(webAuthnResponse, () => {
    client
      .mutation<WebauthnMutationResponse, WebauthnMutationVariables>(
        webauthnMutation,
        {
          plexToken: plexTokenResource.latest,
          verification: webAuthnResponse(),
        },
      )
      .toPromise();
  });

  createEffect(async () => {
    if (plexAuthenticationResource.latest) {
      const { type, webauthnOptions } =
        plexAuthenticationResource.latest.data.plexAuthentication;
      setWebAuthnResponse(await startWebauthn(type, webauthnOptions));
    }
  });

  return (
    <div class="flex rounded-lg bg-slate-200 -mt-12 max-w-4xl mx-auto h-72 p-6">
      <Show
        when={plexTokenResource.loading || plexAuthenticationResource.loading}
      >
        <div class="m-auto">
          <Loader2Icon class="animate-spin text-gray-700 w-16 h-16" />
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
            src={
              plexAuthenticationResource.latest.data.plexAuthentication.plexUser
                .avatar
            }
            alt="Plex Avatar"
          />
          <p>
            {
              plexAuthenticationResource.latest.data.plexAuthentication.plexUser
                .username
            }
          </p>
        </div>
      </Show>

      <Show when={webauthnResource.loading}>
        <div class="m-auto">
          <LoaderIcon class="animate-spin text-gray-700 w-16 h-16" />
        </div>
      </Show>
      <Show when={webauthnResource.latest}>
        <div>
          <p>{JSON.stringify(webauthnResource.latest)}</p>
        </div>
      </Show>

      {JSON.stringify(webAuthnResponse())}
    </div>
  );
};
