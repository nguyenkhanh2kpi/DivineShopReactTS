import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import env from 'react-dotenv';

interface Search {
  text: string;
}

interface SearchState {
  search: Search | null;
  is_search: boolean;
}

const initialState: SearchState = {
  search: null,
  is_search: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startSearch: (state, text) => {
      state.is_search = true;
      state.search = {text: text.payload};
    },
    endSearch: (state) => {
      state.is_search = false;
    },
  },
});

export const { startSearch, endSearch } = searchSlice.actions;
export default searchSlice.reducer;



