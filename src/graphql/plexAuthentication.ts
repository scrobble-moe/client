import { gql } from "@urql/core";

export const plexAuthenticationMutation = gql`
  mutation($plexToken: String!) {
    plexAuthentication(input: {
      plexToken: $plexToken
    }) {
      plexUser {
        avatar
        username
      }
      webauthnOptions
      type
    }
  }
`;

export type WebauthnAction = "AUTHENTICATION" | "REGISTRATION";

export interface PlexAuthenticationMutationResponse {
  plexAuthentication: {
    plexUser: {
      avatar: string;
      username: string;
    };
    webauthnOptions: string;
    type: WebauthnAction;
  };
}

export interface PlexAuthenticationMutationVariables {
  plexToken: string;
}
