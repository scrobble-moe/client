import { gql } from "@urql/core";

export const addLinkedAccountMutation = gql`
  mutation($code: String!) {
    addLinkedAccount(input: {
      code: $code
    }) {
      accessToken
      accessTokenExpires
      accountId
      createdAt
      id
      provider
      refreshToken
      updatedAt
      userId
    }
  }
`;

export interface AddLinkedAccountMutationResponse {
  addLinkedAccount: {
    accessToken: string;
    accessTokenExpires: number;
    accountId: string;
    createdAt: number;
    id: string;
    provider: string;
    refreshToken: string;
    updatedAt: number;
    userId: string;
  };
}

export interface AddLinkedAccountMutationVariables {
  code: string;
}
