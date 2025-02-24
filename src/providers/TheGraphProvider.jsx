import { ApolloClient, InMemoryCache } from "@apollo/client";
import * as React from "react";

import { TheGraphContext } from "../contexts";
import { useTheGraph } from "../hooks";

export default function TheGraphProvider({ chain, subgraphs, children }) {
  const cache = React.useMemo(() => new InMemoryCache(), []);
  const nextClients = React.useMemo(() => {
    return subgraphs.reduce(
      (e, { id, options, uris }) => ({
        ...e,
        [id]: new ApolloClient({
          ...(!!options && typeof options === "object" ? options : {}),
          uri: uris[chain],
          cache,
        }),
      }),
      {}
    );
  }, [subgraphs, chain, cache]);
  const parentContext = useTheGraph();
  const value = React.useMemo(() => {
    const { subgraphs: parentSubgraphs, clients: parentClients } =
      parentContext;
    return {
      chain,
      subgraphs: [...parentSubgraphs, ...subgraphs].filter(
        (e, i, orig) => orig.indexOf(e) === i
      ),
      clients: {
        ...parentClients,
        ...nextClients,
      },
    };
  }, [parentContext, chain, subgraphs, nextClients]);
  return (
    <TheGraphContext.Provider value={value}>
      {children}
    </TheGraphContext.Provider>
  );
}
