import { ApolloClientOptions, NormalizedCacheObject } from "@apollo/client";
import { nanoid } from "nanoid/non-secure";
import * as React from "react";

import { createSubgraph } from "../constants";

export default function useCreateSubgraph(uris, options) {
  const id = React.useMemo(nanoid, []);
  return React.useMemo(
    () => createSubgraph(id, uris, options),
    [id, uris, options]
  );
}
