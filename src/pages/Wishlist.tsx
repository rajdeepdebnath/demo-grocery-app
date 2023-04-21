import React from 'react'
import Button from '@mui/material/Button';
import type { RootState } from '../state/store'
import { useSelector, useDispatch } from 'react-redux'
import { addToWishlist, removeFromWishlist, clearWishlist } from '../state/wishlistSlice'

const Wishlist = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlistProductIds)
  const dispatch = useDispatch()
  
  return (
    <div>
      Wishlist
      {JSON.stringify(wishlist)}
      <Button variant="contained" onClick={() => dispatch(addToWishlist({ productId:1 }))}>Clear</Button>
    </div>
  )
}

export default Wishlist
