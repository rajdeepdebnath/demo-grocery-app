import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Product } from '../types/product';
import Grid from '@mui/material/Grid';
import { useAppDispatch } from '../state/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromCart } from '../state/cartSlice';
import CartCounter from '../components/CartCounter';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { checkCouponValid, getCoupons } from '../api/coupon';
import Tooltip from '@mui/material/Tooltip';


const applyCouponChipStyle = { 
    backgroundColor:'#f294f5', 
    width:"auto", 
    '&:hover': {backgroundColor:'#f563fa'}, 
    fontSize:10, 
    marginLeft:1, 
    paddingY:1,
    cursor:'pointer' 
}

interface Props {
    handleProductCoupon: (c: string, type:string) => void,
    item:Product,
    quantity:number
}

const CartItem = ({item, handleProductCoupon, quantity}: Props) => {
    const [coupon] = useState(getCoupons().find(c => c.type === item.type));
    const dispatch = useAppDispatch()

    const handleDelete = (id:number) => {
        dispatch(removeFromCart({productId:id, quantity:quantity}));
        handleProductCoupon('', 'remove');
    }
    
    
  return (
    <Grid container spacing={1}
            sx={{ padding:'0px !important', boxShadow:2, margin:0 }}>
        <Grid item xs={2}>
            <Box component="img" 
                sx={{ height: 75, width:'100%', border:0
                    , marginTop:{sm:1,md:0}, marginLeft:{sm:0,md:0}
                    , borderRadius: 1}}
                alt={item.name} src={item.img} />
        </Grid>
        <Grid item xs={2} sx={{border:0, fontSize:'13px' }}>
            {item.name}
        </Grid>
        <Grid item xs={3} sx={{border:0, fontSize:'13px' }}>
            {checkCouponValid(item.type, quantity) && coupon
                && <Tooltip title={coupon.description}>
                        <Chip label={`Coupon: ${coupon?.coupon}`} 
                                sx={applyCouponChipStyle} size="small" 
                                onClick={() => handleProductCoupon(coupon.coupon, 'add')}/>
                    </Tooltip>
            }
        </Grid>
        <Grid item xs={2} sx={{border:0, fontSize:'13px', textAlign:'right' }}>
            {item.price}
        </Grid>
        <Grid item xs={2} sx={{border:0, fontSize:'13px' }}>
            <CartCounter item={item} quantity={quantity} />
        </Grid>
        <Grid item xs={1} sx={{border:0, fontSize:'13px' }}>
            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
        </Grid>
    </Grid>
  )
}

export default CartItem
