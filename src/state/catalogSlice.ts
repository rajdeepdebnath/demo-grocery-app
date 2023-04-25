import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from '../types/product'
import { fecthInventoryApi } from '../api/inventoryAPI'
import { BaseState } from '../types/baseState'

export interface CatalogState extends BaseState {
    Products: Array<Product>
}

export interface CatalogPayload {
  productId: number
}

const initialState: CatalogState = {
    Products: [],
    loading:false,
    error:null
}

export const catalogSlice = createSlice({
  name: 'Catalog',
  initialState,
  reducers: {
    // addToCatalog: (state, action: PayloadAction<CatalogPayload>) => {
    //     state.Products.push(action.payload.productId);
    // },
    // removeFromCatalog: (state, action: PayloadAction<CatalogPayload>) => {
    //     let idx = state.CatalogProductIds.findIndex(i => i === action.payload.productId);
    //     if(idx>-1){
    //         state.CatalogProductIds.splice(idx,1);
    //     }
    // },
    clearCatalog: (state) => {
        state.Products = [];
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false
        state.Products = action.payload;
    })
    .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })
  },
})


export const fetchInventory = createAsyncThunk("catalogue/fetchInventory", async () => {
    const response = await fecthInventoryApi()
    return response
})

// Action creators are generated for each case reducer function
export const { clearCatalog } = catalogSlice.actions

export default catalogSlice.reducer