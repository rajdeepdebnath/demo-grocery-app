import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { RootState } from '../state/store';
import { fetchInventory } from '../state/catalogSlice';
import CatalogItem from './CatalogItem';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import Box from '@mui/material/Box';
import ProductList from './ProductList';

const Catalog = ({}) => {
    const products = useAppSelector((state: RootState) => state.catalog.Products)
    const dispatch = useAppDispatch()
  
    useEffect(() => {
      dispatch(fetchInventory());
    }, []);
    
    
  return (
    <ProductList title="Trending" products={products} />
  )
}

export default Catalog
