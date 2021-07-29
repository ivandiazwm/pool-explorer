import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { environments, network } from '../config';
import ContractInteractor from '../lib/ContractInteractor';

type Environment = {
  name: string;
  contractAddress: string;
};

export interface AppState {
  environment: Environment,
  pool: {
    loading: boolean,
    error: string | null | undefined,
    id: string,
    name: string
  },
  agents: {
    loading: boolean,
    id: string,
    name: string,
    reference: string,
    version: string,
    fromAddress: string,
    date: string,
  }[],
}

const initialState: AppState = {
  environment: environments[0],
  pool: {
    loading: false,
    error: null,
    id: null,
    name: null,
  },
  agents: []
};

export const loadAgent = createAsyncThunk(
  'app/loadAgent',
  async ({poolId, index}: {poolId: string, index: number}, thunkAPI) => {
    // @ts-ignore
    const state: RootState = thunkAPI.getState();
    const contract = new ContractInteractor(state.app.environment.contractAddress);
    const agent = await contract.getAgentAt(poolId, index);
    const {manifest} = await fetch(`${network.ipfs}/${agent[1]}`)
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
    if(!poolId) {
      return {
        poolId: null,
        agentsLength: 0
      };
    }
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
      state.pool = {
        loading: false,
        error: null,
        id: null,
        name: null,
      };
      state.agents = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPool.pending, (state) => {
        state.pool.loading = true;
        state.pool.error = null;
      })
      .addCase(loadPool.rejected, (state, action) => {
        state.pool.loading = false;
        state.pool.error = 'Pool not found';
      })
      .addCase(loadPool.fulfilled, (state, action) => {
        state.pool.loading = false;
        state.pool.id = action.payload.poolId;
        state.pool.error = null;
        state.agents = [...Array(action.payload.agentsLength)].map((_, index) => {
          return {
            loading: true,
            id: '',
            name: '',
            reference: '',
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
          reference: payload.reference,
          version: payload.version,
          fromAddress: payload.from,
          date: payload.date,
        };
      })
  },
});

export const { setEnvironment } = appSlice.actions;

export default appSlice.reducer;
