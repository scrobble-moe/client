import {
  Component,
  For,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { A } from "@solidjs/router";
import { ContentLeft } from "../layout/Authenticated/ContentLeft.jsx";
import { ContentRight } from "../layout/Authenticated/ContentRight.jsx";
import { useClient } from "../hooks/useClient.jsx";
import { AsyncIterableConsumer } from "../util/AsyncIterableConsumer.jsx";
import { FeedService } from "@buf/scrobble-moe_protobufs.bufbuild_connect-es/moe/scrobble/feed/v1/feed_service_connect.js";
import { ModelService } from "@buf/scrobble-moe_protobufs.bufbuild_connect-es/moe/scrobble/model/v1/model_service_connect.js";
import { startRegistration } from "@simplewebauthn/browser";
import { AuthService } from "@buf/scrobble-moe_protobufs.bufbuild_connect-es/moe/scrobble/auth/v1/auth_service_connect.js";
import { CrownIcon, CrownSimpleIcon } from "solid-phosphor/regular";

export const Dashboard: Component = () => {
  const [registrationOptions, setRegistrationOptions] = createSignal<string>();
  const [newCredName, setNewCredName] = createSignal<string>("");
  const {
    getAuthenticators,
    revokeAuthenticator,
    getAuthenticatorRegistrationOptions,
    addAuthenticator,
    getTokens,
    revokeToken,
  } = useClient(AuthService)();

  createEffect(async () => {
    if (registrationOptions()) {
      await startRegistration(JSON.parse(atob(registrationOptions()))).then(
        (response) => {
          addAuthenticator({
            name: newCredName(),
            verification: btoa(JSON.stringify(response)),
          }).then(() => {
            authenticatorsActions.refetch();
          });
        },
      );
    }
  });

  const { scrobbleFeed } = useClient(FeedService)();

  // const [feedResponse] = createResource(() => scrobbleFeed({}));

  const [authenticatorsResponse, authenticatorsActions] = createResource(() =>
    getAuthenticators({}),
  );

  const [tokensResponse, tokensActions] = createResource(() => getTokens({}));

  return (
    <>
      <ContentLeft>
        {/* <AsyncIterableConsumer asyncIterable={feedResponse()}>
          {(item) => <div>{JSON.stringify(item)}</div>}
        </AsyncIterableConsumer> */}
      </ContentLeft>

      <ContentRight>
        <A
          href="/auth/redirect"
          class="rounded-md bg-blue-500 text-white p-2 m-5"
        >
          Login
        </A>
        <h1>Authenticators</h1>
        <div class="flex bg-slate-200 rounded-md p-2 m-2">
          <input
            class="p-2 w-full"
            value={newCredName()}
            onChange={(e) => {
              setNewCredName(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={() => {
              getAuthenticatorRegistrationOptions({}).then((options) => {
                setRegistrationOptions(options.options);
              });
            }}
            class="p-2 shrink-0 bg-slate-400 hover:bg-slate-500 flex cursor-pointer "
          >
            Register new authenticator.
          </button>
        </div>
        <For each={authenticatorsResponse()?.authenticators}>
          {(item) => (
            <div class="rounded-md p-2 m-2 bg-slate-200 flex justify-between">
              <div class="my-auto flex gap-2">
                <span
                  class={`h-3 w-3 m-auto rounded-full ${
                    item.revoked ? "bg-red-500" : "bg-green-500"
                  }`}
                />
                <div>
                  {item.friendlyName} - {item.aaguid}
                </div>
              </div>
              <button
                onClick={() =>
                  revokeAuthenticator({
                    id: item.id,
                  }).then(() => {
                    authenticatorsActions.refetch();
                  })
                }
                type="button"
                class="rounded-md p-1 bg-slate-400"
              >
                revoke
              </button>
            </div>
          )}
        </For>
        <br />
        <br />
        <h1>Tokens</h1>
        <For each={tokensResponse()?.tokens}>
          {(item) => (
            <div class="rounded-md p-2 m-2 bg-slate-200 flex justify-between">
              <div class="flex">
                {item.id} - {item.expires} -{" "}
                {item.current && <CrownSimpleIcon />}
              </div>
              <button
                onClick={() =>
                  revokeToken({
                    id: item.id,
                  }).then(() => {
                    tokensActions.refetch();
                  })
                }
                type="button"
                class="rounded-md p-1 bg-slate-400"
              >
                revoke
              </button>
            </div>
          )}
        </For>
      </ContentRight>
    </>
  );
};
