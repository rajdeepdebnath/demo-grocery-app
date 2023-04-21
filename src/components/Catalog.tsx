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
import {capitalize} from 'lodash'

const Catalog = ({}) => {
    const [categories, setCategories] = useState<Array<string>|null>(null);
    const products = useAppSelector((state: RootState) => state.catalog.Products)
    const dispatch = useAppDispatch()
  
    useEffect(() => {
      dispatch(fetchInventory());
    }, []);

    useEffect(() => {
        if(products && products.length>0){
            setCategories([...new Set(products.map(p => capitalize(p.type)))]);
        }
    }, [products])

    console.log(products);
    
    
  return (
    <Container>
        <Box sx={{ marginBottom:5, display:'flex', border:'0px solid red', width:'fit-content' }}>
            <CategoryFilter label='All items' />
            {categories && categories.map(c => <CategoryFilter label={c} />)}
        </Box>
        <Grid container spacing={3}>
            {products && products.map(product => <CatalogItem item={product} />)}
        </Grid>
    </Container>
  )
}

export default Catalog
