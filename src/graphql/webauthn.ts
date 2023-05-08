import { gql } from "@urql/core";

export const webauthnMutation = gql`
  mutation($plexToken: String! $verification: String!) {
    webauthn(input: {
      plexToken: $plexToken
      verification: $verification
    }) {
      success
    }
  }
`;

export interface WebauthnMutationResponse {
  webauthn: {
    success: boolean;
  };
}

export interface WebauthnMutationVariables {
  plexToken: string;
  verification: string;
}
