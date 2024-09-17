import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

import { AccountState, AccountActionType , AuthenticateUser} from './types';

const initialState: AccountState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    LOGIN_REQUEST: (state) => {
      state.loading = true;
    },
    LOGIN_SUCCESS: (state, action: PayloadAction<{ user: AuthenticateUser, access_token: string }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.access_token;
    },
    LOGIN_FAILURE: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload.error;
    },
    LOG_OUT: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
});

export const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT } = accountSlice.actions;
export const selectAccount = (state: RootState) => state.account;
export default accountSlice.reducer;