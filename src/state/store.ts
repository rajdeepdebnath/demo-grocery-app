import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from '../state/wishlistSlice'
import catalogReducer from '../state/catalogSlice'
import cartReducer from '../state/cartSlice'
import searchReducer from '../state/searchSlice'

export const store = configureStore({
  reducer: {
    wishlist:wishlistReducer,
    catalog:catalogReducer,
    cart:cartReducer,
    search:searchReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch