import type { RootState } from '../state/store'
import { useAppSelector } from '../state/hooks';
import ProductList from '../components/ProductList';

const Wishlist = () => {
  const searchCriteria = useAppSelector((state: RootState) => state.search.searchText);
  const wishlistIds = useAppSelector((state: RootState) => state.wishlist.wishlistProductIds);
  const allProducts = useAppSelector((state: RootState) => state.catalog.Products);

  const wishlistProducts = allProducts.filter(p => wishlistIds.includes(p.id));
  const filteredProducts = wishlistProducts.filter(p => 
    (searchCriteria === null || searchCriteria === undefined) 
    || (p.name.toLowerCase().includes(searchCriteria) 
        || p.description.toLowerCase().includes(searchCriteria)));
  
  
  return (
    <ProductList title="Favorites" products={filteredProducts} />
  )
}

export default Wishlist
