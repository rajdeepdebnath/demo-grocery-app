import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { RootState } from '../state/store';
import { fetchInventory } from '../state/catalogSlice';
import ProductList from './ProductList';

const Catalog = () => {
    const searchCriteria = useAppSelector((state: RootState) => state.search.searchText);
    const products = useAppSelector((state: RootState) => state.catalog.Products);
    const dispatch = useAppDispatch();
    
    const filteredProducts = products.filter(p => 
      (searchCriteria === null || searchCriteria === undefined) 
      || (p.name.toLowerCase().includes(searchCriteria) 
          || p.description.toLowerCase().includes(searchCriteria)));
    
  
    useEffect(() => {
      dispatch(fetchInventory());
    }, []);
    
    
  return (
    <ProductList title="Trending" products={filteredProducts} />
  )
}

export default Catalog
