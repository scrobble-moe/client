import { gql } from "@urql/core";

export const UserQuery = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      accounts {
        accountId
      }
    }
  }
`;

export interface UserQueryResponse {
  user: {
    id: string;
    accounts: {
      accountId: string;
    }[];
  };
}

export interface UserQueryVariables {
  id: string;
}
