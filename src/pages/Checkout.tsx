import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import capitalize from "@mui/material/utils/capitalize"
import { useAppSelector } from "../state/hooks"
import { RootState } from "../state/store"
import CartItem from "./CartItem"
import Typography from "@mui/material/Typography"

const Checkout = () => {
  const products = useAppSelector((state: RootState) => state.catalog.Products)
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems)

  const getProductPrice = (priceStr:string) => {
    return Number(priceStr.replace('£', ''));
  }

  const calculateTotal = () => {
    let total = 0;
    products.forEach((product) => {
      let productInCart = cartItems.find(ci => ci.productId === product.id);
      if(Boolean(productInCart) && productInCart != undefined){        
        total += getProductPrice(product.price) * productInCart.quantity;
      }
    });
    return total;
  }
  
  return (
    <Container>
        <Box sx={{ marginBottom:5, display:'flex', border:'0px solid red', width:'fit-content' }}>
          <Typography component="h4" variant="h4">
              Cart
          </Typography>
        </Box>
        {(!cartItems || cartItems.length===0) && 
        <Box sx={{ marginBottom:5, display:'flex', border:'0px solid red', width:'fit-content' }}>
            No items
        </Box>}
        <Grid container spacing={3}>
            {cartItems && cartItems.map(ci => {
              let product = products.find(p => p.id === ci.productId)!;
              return <CartItem item={product} quantity={ci.quantity} />
            })}
        </Grid>
        {cartItems && cartItems.length!==0 && 
        <Box sx={{ marginBottom:5, display:'flex', border:'0px solid red', width:'fit-content' }}>
          <Typography component="div" variant="h5">
            Total: £{calculateTotal()}
          </Typography>
        </Box>}
    </Container>
  )
}

export default Checkout
