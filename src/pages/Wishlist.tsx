import React from 'react'
import Button from '@mui/material/Button';
import type { RootState } from '../state/store'
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { addToWishlist, removeFromWishlist, clearWishlist } from '../state/wishlistSlice'
import ProductList from '../components/ProductList';

const Wishlist = () => {
  const wishlistIds = useAppSelector((state: RootState) => state.wishlist.wishlistProductIds);
  const allProducts = useAppSelector((state: RootState) => state.catalog.Products);
  const dispatch = useAppDispatch();

  const products = allProducts.filter(p => wishlistIds.includes(p.id));

  console.log(products);
  
  
  return (
    <ProductList title="Favorites" products={products} />
  )
}

export default Wishlist
