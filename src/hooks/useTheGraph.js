import * as React from "react";

import { TheGraphContext } from "../contexts";

export default function useTheGraph() {
  return React.useContext(TheGraphContext);
}
