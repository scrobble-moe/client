import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

import type { PlexAuthResponse } from "@buf/scrobble-moe_protobufs.bufbuild_es/moe/scrobble/auth/v1/auth_pb.js";

export const startWebauthn = async (
  webauthnOptions: Pick<PlexAuthResponse, "webauthnOptions">["webauthnOptions"],
) => {
  let webauthnResponse: string;
  switch (webauthnOptions.case) {
    case "request": {
      await startAuthentication(JSON.parse(atob(webauthnOptions.value))).then(
        (response) => {
          webauthnResponse = btoa(JSON.stringify(response));
        },
      );
      break;
    }

    case "create": {
      await startRegistration(JSON.parse(atob(webauthnOptions.value))).then(
        (response) => {
          webauthnResponse = btoa(JSON.stringify(response));
        },
      );

      break;
    }
  }

  return webauthnResponse;
};
