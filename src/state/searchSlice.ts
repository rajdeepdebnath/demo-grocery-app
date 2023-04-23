import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BaseState } from '../types/baseState'


export interface SearchState extends BaseState {
    searchText: string|null|undefined
}

export interface SearchPayload {
    searchText:string|null|undefined
}

const initialState: SearchState = {
  searchText: null,
  loading:false,
  error:null
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchCriteria: (state, action: PayloadAction<SearchPayload>) => {
      state.searchText = action.payload.searchText?.trim().toLowerCase();
    },
    clearSearch: (state) => {
      state.searchText = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSearchCriteria, clearSearch } = searchSlice.actions

export default searchSlice.reducer