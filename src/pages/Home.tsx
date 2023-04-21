import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import type { RootState } from '../state/store'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { addToWishlist, removeFromWishlist, clearWishlist } from '../state/wishlistSlice'
import { fetchInventory } from '../state/catalogSlice'

const Home = () => {
  const products = useAppSelector((state: RootState) => state.catalog.Products)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchInventory());
  }, []);
  
  return (
    <div>
      Home
      {JSON.stringify(products)}
      <Button variant="contained" onClick={() => dispatch(addToWishlist({ productId:1 }))}>Clear</Button>
    </div>
  )
}

export default Home
