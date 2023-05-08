import { JSX, createContext, createSignal, useContext } from "solid-js";
import { createClient, Client, cacheExchange, fetchExchange } from "@urql/core";

export interface GraphQLProviderProps {
  children: JSX.Element;
}

export interface GraphQLContextProps {
  client: Client;
}

const GraphQLContext = createContext<GraphQLContextProps>();

export const GraphQLProvider = (props: GraphQLProviderProps) => {
  const client = createClient({
    url: import.meta.env.VITE_GQL_ENDPOINT,
    exchanges: [cacheExchange, fetchExchange],
  });

  return (
    <GraphQLContext.Provider value={{ client }}>
      {props.children}
    </GraphQLContext.Provider>
  );
};

export const useGraphQL = () => useContext(GraphQLContext)!;
