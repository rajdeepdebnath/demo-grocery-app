import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BaseState } from '../types/baseState'

export interface WishListState extends BaseState {
    wishlistProductIds: Array<number>
}

export interface WishListPayload {
  productId: number
}

const initialState: WishListState = {
  wishlistProductIds: [],
  loading:false,
  error:null
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishListPayload>) => {
        state.wishlistProductIds.push(action.payload.productId);
    },
    removeFromWishlist: (state, action: PayloadAction<WishListPayload>) => {
        const idx = state.wishlistProductIds.findIndex(i => i === action.payload.productId);
        if(idx>-1){
            state.wishlistProductIds.splice(idx,1);
        }
    },
    clearWishlist: (state) => {
        state.wishlistProductIds = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer