import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import type { RootState } from '../state/store'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { addToWishlist, removeFromWishlist, clearWishlist } from '../state/wishlistSlice'
import { fetchInventory } from '../state/catalogSlice'
import Catalog from '../components/Catalog';

const Home = () => {
  
  return (
    <div>
      Home
      <Catalog />
      {/* <Button variant="contained" onClick={() => dispatch(addToWishlist({ productId:1 }))}>Clear</Button> */}
    </div>
  )
}

export default Home
