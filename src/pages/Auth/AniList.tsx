import { ModelService } from "@buf/scrobble-moe_protobufs.bufbuild_connect-es/moe/scrobble/model/v1/model_service_connect.js";
import {
  Component,
  Show,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { useClient } from "../../hooks/useClient.jsx";
// import { useGraphQL } from "../../GraphQLProvider.jsx";
// import {
//   AddLinkedAccountMutationResponse,
//   AddLinkedAccountMutationVariables,
//   addLinkedAccountMutation,
// } from "../../graphql/addLinkedAccount.js";
// import { CircleNotchIcon } from "solid-phosphor/regular";

export const AniList: Component = () => {
  // const { client } = useGraphQL();
  const { addLinkedAccount } = useClient(ModelService)();
  const [code, setCode] = createSignal<string>();

  createEffect(() => {
    setCode(window.location.search.substring(1).split("&")[0].split("=")[1]);
  }, [window.location.search]);

  createEffect(() => {
    if (code()) {
      addLinkedAccount({
        code: code(),
      });
    }
  }, [code]);

  // const [addLinkedAccountResource] = createResource(code, () =>
  //   client
  //     .mutation<
  //       AddLinkedAccountMutationResponse,
  //       AddLinkedAccountMutationVariables
  //     >(addLinkedAccountMutation, {
  //       code: code(),
  //     })
  //     .toPromise(),
  // );

  return (
    <div>
      Data:
      {code()}

      {/* <Show when={addLinkedAccountResource.loading}>
        <CircleNotchIcon class="animate-spin" />
      </Show>
      <Show when={addLinkedAccountResource.error}>
        <div>Error: {addLinkedAccountResource.error}</div>
      </Show>
      <Show when={addLinkedAccountResource.latest}>
        <div>Data: {JSON.stringify(addLinkedAccountResource.latest)}</div>
      </Show> */}
    </div>
  );
};
