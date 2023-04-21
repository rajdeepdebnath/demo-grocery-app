import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { RootState } from '../state/store';
import { fetchInventory } from '../state/catalogSlice';
import CatalogItem from './CatalogItem';
import Grid from '@mui/material/Grid';

const Catalog = ({}) => {
    const products = useAppSelector((state: RootState) => state.catalog.Products)
    const dispatch = useAppDispatch()
  
    useEffect(() => {
      dispatch(fetchInventory());
    }, []);

    console.log(products);
    
    
  return (
    <Grid container spacing={3}>
      {products && products.map(product => <CatalogItem item={product} />)}
    </Grid>
  )
}

export default Catalog
