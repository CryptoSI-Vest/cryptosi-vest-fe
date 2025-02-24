import {
  useQuery as baseUseQuery,
  DocumentNode,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
} from "@apollo/client";
import * as React from "react";

import { Subgraph } from "../types";

import useSubgraphClient from "./useSubgraphClient";

export default function useSubgraph(subgraph) {
  const client = useSubgraphClient(subgraph);

  const useQuery = React.useCallback(
    function useQuery(query, options) {
      return baseUseQuery(query, { ...(options || {}), client });
    },
    [client]
  );

  return { useQuery };
}
