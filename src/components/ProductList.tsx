import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import CategoryFilter from "./CategoryFilter"
import Grid from "@mui/material/Grid"
import CatalogItem from "./CatalogItem"
import { Product } from "../types/product"
import { useEffect, useState } from "react"
import capitalize from "@mui/material/utils/capitalize"

interface Props{
    products: Product[],
    title:string
}

const ProductList = ({title, products}:Props) => {
    const [filteredProducts, setFilteredProducts] = useState<Array<Product>|null>(null);
    const [categories, setCategories] = useState<Array<string>|null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string|null>(null);

    useEffect(() => {
        if(products){
            setCategories([...new Set(products.map(p => capitalize(p.type)))]);
        }
    }, [products])

    useEffect(() => {
        if(categoryFilter === null || categoryFilter === 'all items'){
            setFilteredProducts(products);
        }else if(categoryFilter !== null && products !== null){
            setFilteredProducts(products.filter(p => p.type === categoryFilter));
        }
    }, [products, categoryFilter]);

    const handleCatgoryFilterClick = (category:string) => {
        let filter = category === categoryFilter ? null : category;
        setCategoryFilter(filter);        
    }
    
  return (
    <Container sx={{ padding:'0 !important' }}>
        <Box sx={{ marginBottom:5, display:'flex', border:'0px solid red'
                , width:'fit-content', marginTop:2 }}>
            {products && products.length>0 
            && <CategoryFilter handleCatgoryFilterClick={handleCatgoryFilterClick} 
            currentCategoryFilter={categoryFilter}
            label='All items' />}
            {categories && categories.map(c => 
            <CategoryFilter key={c} handleCatgoryFilterClick={handleCatgoryFilterClick} 
            currentCategoryFilter={categoryFilter}
            label={c} />)}
        </Box>
        <Box sx={{ marginBottom:{xs:1,md:5}, display:'flex', marginX:{xs:1},
                border:'0px solid red', width:'fit-content' }}>
            {title}
        </Box>
        {filteredProducts && filteredProducts.length===0 && 
        <Box sx={{ marginBottom:5, display:'flex', border:'0px solid red', width:'fit-content' }}>
            No items
        </Box>}
        <Grid container spacing={4} sx={{ border:0, padding:0, margin:0, width:'100%',
                                        justifyContent:{xs:'center',sm:'space-evenly'} }}>
            {filteredProducts && filteredProducts.map(product => <CatalogItem key={product.id} item={product} />)}
        </Grid>
    </Container>
  )
}

export default ProductList
