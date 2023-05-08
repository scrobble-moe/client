import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { WebauthnAction } from "../graphql/plexAuthentication.js";

export const startWebauthn = async (
  type: WebauthnAction,
  webauthnOptions: string,
) => {
  let webauthnResponse: string;
  switch (type) {
    case "AUTHENTICATION":
      await startAuthentication(JSON.parse(atob(webauthnOptions))).then(
        (response) => {
          webauthnResponse = btoa(JSON.stringify(response));
        },
      );
      break;

    case "REGISTRATION":
      await startRegistration(JSON.parse(atob(webauthnOptions))).then(
        (response) => {
          webauthnResponse = btoa(JSON.stringify(response));
        },
      );

      break;
  }

  return webauthnResponse;
};
