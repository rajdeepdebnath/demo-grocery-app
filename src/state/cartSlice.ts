import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BaseState } from '../types/baseState'

interface cartItem {
    productId:number,
    quantity:number
}

export interface CartState extends BaseState {
    cartItems: Array<cartItem>
}

export interface CartPayload {
    productId:number,
    quantity:number
}

const initialState: CartState = {
  cartItems: [],
  loading:false,
  error:null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartPayload>) => {
        let existingItem = state.cartItems.find(ci => ci.productId === action.payload.productId);
        if(existingItem){
            existingItem.quantity = action.payload.quantity;
        }else{
            state.cartItems.push({...action.payload});
        }
    },
    removeFromCart: (state, action: PayloadAction<CartPayload>) => {
        let idx = state.cartItems.findIndex(i => i.productId === action.payload.productId);
        if(idx>-1){
            state.cartItems.splice(idx,1);
        }
    },
    clearCart: (state) => {
        state.cartItems = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer