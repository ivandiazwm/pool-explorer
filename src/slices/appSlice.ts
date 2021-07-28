import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { fetchCount } from '../api/poolAPI';

export interface AppState {
  network: {
    name: string,
    contractAddress: string,
    baseAPI: string,
    baseExplorerAPI: string,
  },
  pool: {
    id: string,
    name: string
  },
  agents: {
    id: string,
    name: string,
    version: string,
    fromAddress: string,
    date: string,
  }[],
}

const initialState: AppState = {
  network: {
    name: 'Development',
    contractAddress: '0x30dB6Af76Ff4A9A30d7f927eFab235a7ea600e22',
    baseAPI: 'https://goerli.infura.io/v3/PROJECT-ID',
    baseExplorerAPI: 'https://goerli.etherscan.io',
  },
  pool: {
    id: '0x9d3d1df113ae5f4ff7fb542439229d50a384f4c2162c4fe4e298beefc872ddf2',
    name: 'agent-devnet'
  },
  agents: [
    {
      id: '0x1bccd1c56bdc239ee16547d38360d9b7629fa6d0aecdeaa76e0e19c1a0ae9704',
      name: 'agent1',
      version: '0.0.2',
      fromAddress: '0x5d8543faa52157de5eaeeb4b209ef09dbd47cad3',
      date: 'Mon, 26 Jul 2021',
    }
  ]
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export default appSlice.reducer;
