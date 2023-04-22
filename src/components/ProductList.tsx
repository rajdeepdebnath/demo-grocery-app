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
    const [categories, setCategories] = useState<Array<string>|null>(null);

    useEffect(() => {
        if(products && products.length>0){
            setCategories([...new Set(products.map(p => capitalize(p.type)))]);
        }
    }, [products])
    
  return (
    <Container>
        <Box sx={{ marginBottom:5, display:'flex', border:'0px solid red', width:'fit-content' }}>
            {products && products.length>0 && <CategoryFilter label='All items' />}
            {categories && categories.map(c => <CategoryFilter label={c} />)}
        </Box>
        <Box sx={{ marginBottom:5, display:'flex', border:'0px solid red', width:'fit-content' }}>
            {title}
        </Box>
        {products && products.length===0 && 
        <Box sx={{ marginBottom:5, display:'flex', border:'0px solid red', width:'fit-content' }}>
            No items
        </Box>}
        <Grid container spacing={3}>
            {products && products.map(product => <CatalogItem item={product} />)}
        </Grid>
    </Container>
  )
}

export default ProductList
