import { Component, createResource } from "solid-js";
import { useGraphQL } from "../GraphQLProvider.jsx";
import { gql } from "@urql/core";
import {
  UserQuery,
  UserQueryResponse,
  UserQueryVariables,
} from "../graphql/user.js";
import { A } from "@solidjs/router";
import { ContentLeft } from "../layout/Authenticated/ContentLeft.jsx";
import { ContentRight } from "../layout/Authenticated/ContentRight.jsx";

export const Dashboard: Component = () => {
  const { client } = useGraphQL();

  const [data, something] = createResource(() =>
    client
      .query<UserQueryResponse, UserQueryVariables>(UserQuery, {
        id: "cku6pw09b00574hmc4tkal10g",
      })
      .toPromise(),
  );

  return (
    <>
      <ContentLeft>
        <A
          href="/auth/redirect"
          class="rounded-md bg-blue-500 text-white p-2 m-5"
        >
          \auth\redirect Login
        </A>
      </ContentLeft>

      <ContentRight>
        <A
          href="/auth/redirect"
          class="rounded-md bg-blue-500 text-white p-2 m-5"
        >
          Login
        </A>
      </ContentRight>
    </>
  );
};
