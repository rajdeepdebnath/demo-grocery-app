import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Product } from '../types/product';
import Grid from '@mui/material/Grid';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { addToWishlist, removeFromWishlist } from '../state/wishlistSlice';
import { RootState } from '../state/store';
import { addToCart, removeFromCart } from '../state/cartSlice';
import CartCounter from '../components/CartCounter';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { checkCouponValid, getCoupons } from '../api/coupon';
import Tooltip from '@mui/material/Tooltip';
import Button  from '@mui/material/Button';

const itemStyle = { 
    display: 'flex', 
    flexDirection: 'column', 
    width:'100%', 
    height:150, 
    overflow:'hidden', 
    textOverflow:'ellipsis',
    padding:{xs:1,md:2}
}

const descriptionStyle = {
    fontSize:{xs:14,md:14}, 
    lineHeight:{xs:1.2,md:1.2}, 
    marginY:1,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};

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
    const [coupon, _] = useState(getCoupons().find(c => c.type === item.type));
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
            <CartCounter item={item} quantity={quantity!} />
        </Grid>
        <Grid item xs={1} sx={{border:0, fontSize:'13px' }}>
            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
        </Grid>
    </Grid>
    // <Grid item sm={7} xs={10} sx={{ paddingX:'0 !important' }}>
    //     <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} 
    //         sx={{ minWidth:'200px', border:0, borderRadius: '0', 
    //         justifyContent: 'center', alignItems: 'center',
    //         boxShadow:2, padding:'0 !important' }}>
    //         <Box component="img" 
    //             sx={{ height: 75, width:{sm: 75, xs:'100%'}, border:0
    //                 , marginTop:{sm:1,md:0}, marginLeft:{sm:0,md:1}
    //                 , borderRadius: {xs:'16px',sm:1}}}
    //             alt={item.name} src={item.img} />
    //             <Typography component="div" variant="h5" sx={{fontSize:{xs:17,md:20}}}>
    //                 {item.name}
    //             </Typography>
    //             <Stack direction='row'>
    //                 {checkCouponValid(item.type, quantity) && coupon
    //                     && <Tooltip title={coupon.description}>
    //                             <Chip label={`Coupon: ${coupon?.coupon}`} 
    //                                     sx={applyCouponChipStyle} size="small" 
    //                                     onClick={() => handleProductCoupon(coupon.coupon)}/>
    //                         </Tooltip>
    //                 }
    //             </Stack>
    //             <Grid container spacing={1} sx={{backgroundColor:{xs:'#f7f5f5', md:'#fff'}, width:'100% !important'
    //                     , borderBottomLeftRadius:16, borderBottomRightRadius:16, margin:0}}>
    //                 <Grid item xs={2} sx={{border:'0px solid red', padding:'0 !important',
    //                                         display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
    //                     {item.price}
    //                 </Grid>
    //                 <Grid item xs={5} sx={{border:'0px solid red', padding:'0 !important',
    //                                         display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
    //                     <CartCounter item={item} quantity={quantity!} />
    //                 </Grid>
    //                 <Grid item xs={3} sx={{border:'0px solid red', padding:'0 !important'}}>
    //                     <Tooltip title="Delete">
    //                         <IconButton aria-label="delete" onClick={() => handleDelete(item.id)}>
    //                             <DeleteIcon/>
    //                         </IconButton>
    //                     </Tooltip>
    //                 </Grid>
    //             </Grid>
    //     </Stack>
    // </Grid>
    // <Grid item md={8} xs={10}>
    //     <Card sx={{ display: 'flex', minWidth:300, minHeight:200 }}>
    //         <CardMedia
    //         component="img"
    //         sx={{ width: 75, margin:5 }}
    //         image={item.img}
    //         alt={item.name}
    //         />
    //     <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    //         <CardContent sx={{ flex: '1 0 auto' }}>
    //             <Typography component="div" variant="h5">
    //                 {item.name}
    //             </Typography>
    //         </CardContent>
    //         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
    //             <div>{item.price}</div>&nbsp;
    //             <CartCounter item={item} quantity={quantity} />
    //             <IconButton aria-label="favorite"  onClick={() => handleDelete(item.id)}>
    //                 <DeleteIcon/>
    //             </IconButton>
    //         </Box>
    //     </Box>
    //     </Card>
    // </Grid>
  )
}

export default CartItem
