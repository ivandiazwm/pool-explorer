import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { environments } from '../config';
import ContractInteractor from '../lib/ContractInteractor';

type Environment = {
  name: string;
  contractAddress: string;
};

export interface AppState {
  environment: Environment,
  pool: {
    loading: boolean;
    id: string,
    name: string
  } | null,
  agents: {
    loading: boolean,
    id: string,
    name: string,
    version: string,
    fromAddress: string,
    date: string,
  }[],
}

const initialState: AppState = {
  environment: environments[0],
  pool: {
    loading: false,
    id: '0x9d3d1df113ae5f4ff7fb542439229d50a384f4c2162c4fe4e298beefc872ddf2',
    name: 'agent-devnet'
  },
  agents: [
    {
      loading: false,
      id: '0x1bccd1c56bdc239ee16547d38360d9b7629fa6d0aecdeaa76e0e19c1a0ae9704',
      name: 'agent1',
      version: '0.0.2',
      fromAddress: '0x5d8543faa52157de5eaeeb4b209ef09dbd47cad3',
      date: 'Mon, 26 Jul 2021',
    }
  ]
};

export const loadAgent = createAsyncThunk(
  'app/loadAgent',
  async ({poolId, index}: {poolId: string, index: number}, thunkAPI) => {
    // @ts-ignore
    const state: RootState = thunkAPI.getState();
    const contract = new ContractInteractor(state.app.environment.contractAddress);
    const agent = await contract.getAgentAt(poolId, index);
    const {manifest} = await fetch(`https://ipfs.infura.io/ipfs/${agent[1]}`)
      .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
      });
    return {
      id: agent[0],
      name: manifest.agentId,
      reference: agent[1],
      from: manifest.from,
      version: manifest.version,
      date: manifest.timestamp,
      poolId,
      index,
    };
  }
);

export const loadPool = createAsyncThunk(
  'app/loadPool',
  async (poolId: string, thunkAPI) => {
    // @ts-ignore
    const state: RootState = thunkAPI.getState();
    const contract = new ContractInteractor(state.app.environment.contractAddress);
    const agentsLength = (await contract.getAgentsLength(poolId)).toNumber();
    for(let index=0; index < agentsLength; index++) {
      thunkAPI.dispatch(loadAgent({poolId, index}))
    }
    return {
      poolId,
      agentsLength
    };
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setEnvironment: (state, action: PayloadAction<Environment>) => {
      state.environment = action.payload;
      state.pool = null;
      state.agents = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPool.pending, (state) => {
        state.pool.loading = true;
      })
      .addCase(loadPool.fulfilled, (state, action) => {
        state.pool.loading = false;
        state.pool.id = action.payload.poolId;
        state.agents = [...Array(action.payload.agentsLength)].map((_, index) => {
          return {
            loading: true,
            id: '',
            name: '',
            version: '',
            fromAddress: '',
            date: '',
          };
        });
      })
      .addCase(loadAgent.fulfilled, (state, { payload }) => {
        state.agents[payload.index] = {
          loading: false,
          id: payload.id,
          name: payload.name,
          version: payload.version,
          fromAddress: payload.from,
          date: payload.date,
        };
      })
  },
});

export const { setEnvironment } = appSlice.actions;

export default appSlice.reducer;
