import * as React from 'react';
import { Chains } from '../constants/config';

const defaultValue = {
  chain: Chains.MAINNET,
  subgraphs: [],
  clients: {},
};

export default React.createContext(defaultValue);
