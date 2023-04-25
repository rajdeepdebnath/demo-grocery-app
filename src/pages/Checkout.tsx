import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { useAppSelector } from "../state/hooks"
import { RootState } from "../state/store"
import CartItem from "./CartItem"
import Typography from "@mui/material/Typography"
import { checkCouponValid } from "../api/coupon"
import { useEffect, useState } from "react"
import { Paper, Stack } from "@mui/material"

interface ProductCoupon{
  productId:number,
  coupon:string
}

const Checkout = () => {
  const products = useAppSelector((state: RootState) => state.catalog.Products)
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems)
  // const [couponTxt, setCouponTxt] = useState('');
  const [productCoupons, setProductCoupons] = useState<ProductCoupon[]>([]);
  const [total, setTotal] = useState(0);

  const getProductPrice = (priceStr:string) => {
    return Number(priceStr.replace('£', ''));
  }

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(ci => {
      const product = products.find(p => ci.productId === p.id);
      if(product){
        const coupon = productCoupons.find(pc => pc.productId === product?.id);
        if(coupon){
          const freeCount = checkCouponValid(product.type, ci.quantity);   
          if(freeCount){
            total += getProductPrice(product.price) * (ci.quantity - freeCount);
          }
        }else{
          total += getProductPrice(product.price) * ci.quantity;
        }

      }
    });
    
    return total;
  }

  const handleProductCoupon = (id:number, c:string, type:string) => {
    const existingCoupon = productCoupons.find(pc => pc.productId === id);
    if(existingCoupon === undefined && type === 'add'){
      setProductCoupons(p => [...p, {productId:id,coupon:c}])
    }else if(type === 'remove'){
      setProductCoupons(pc => pc.filter(p => p.productId !== id));
    }
  }

  useEffect(() => {
    const newTotal = calculateTotal();
    setTotal(newTotal);
  }, [cartItems, productCoupons]);
  
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
        <Grid container spacing={5}>
          <Grid item md={7} xs={12}>
            <Stack direction="column" spacing={1}>
              {cartItems && products && cartItems.map(ci => {
                  const product = products.find(p => p.id === ci.productId);
                  return product && <CartItem key={product.id} item={product} 
                  quantity={ci.quantity} 
                  handleProductCoupon={(c,t) => handleProductCoupon(product.id,c,t)} />
                })}
            </Stack>
          </Grid>
          <Grid item md={5} xs={12}>
            <Stack direction='column' sx={{boxShadow:2, padding:3}}>
              {cartItems && cartItems.length!==0 && 
              <Box sx={{ marginBottom:5, display:'flex', border:'0px solid red', width:'fit-content' }}>
                <Typography component="div" variant="h5">
                  Total: £{total}
                </Typography>
              </Box>}
              {/* <Box sx={{ marginBottom:5, display:'flex', border:'0px solid red', width:'fit-content' }}>
                {cartItems && cartItems.length!==0 && <>Promotion (Enter Coupon code): 
                <input type="text" name="promotion" placeholder="Coupon" value={couponTxt} 
                  onChange={e => setCouponTxt(e.target.value)}/>
                  {couponValid !== null && (couponValid ? <CheckBoxIcon color="success" /> : <CancelIcon color="error" />)}
                <Button variant="outlined" onClick={handleCouponApply}>Apply</Button></>}
              </Box> */}
              <Stack direction="column" spacing={1}>
                {productCoupons && productCoupons.length>0 && 
                productCoupons.map(pc => 
                  <Paper key={pc.productId} sx={{ backgroundColor:'#e8e9e8', fontSize:12, paddingX:1 }} elevation={0}>
                      Coupon {pc.coupon} for {products.find(p => p.id===pc.productId)?.name} Applied
                  </Paper>)}
              </Stack>
            </Stack>
          </Grid>
        </Grid>        
    </Container>
  )
}

export default Checkout
