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
import { addToWishlist, removeFromWishlist } from '../state/wishlistSlice';
import { RootState } from '../state/store';
import { addToCart, removeFromCart } from '../state/cartSlice';
import TextField from '@mui/material/TextField';
import CartCounter from './CartCounter';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';
import Chip from '@mui/material/Chip';
import { getCoupons } from '../api/coupon';
import { useState } from 'react';

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

interface Props {
    item:Product
}

const CatalogItem = ({item}: Props) => {
    const wishlistIds = useAppSelector((state: RootState) => state.wishlist.wishlistProductIds);
    const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
    const [coupon, setCoupon] = useState(getCoupons().find(c => c.type === item.type));
    const dispatch = useAppDispatch()
    
    
    const getCartItem = () => {
        return cartItems.find(ci => ci.productId === item.id);
    }
    
    const isItemInCart = () => {
        return cartItems.length>0 && Boolean(getCartItem());
    }
    
    const handleFavoriteClick = (id:number) => {
        if(wishlistIds.includes(item.id)){
            dispatch(removeFromWishlist({productId:id}));
        }else{
            dispatch(addToWishlist({productId:id}));
        }
    }
    
    const handleCartClick = (id:number) => {
        if(isItemInCart()){
            dispatch(removeFromCart({productId:item.id, quantity:0}));
        }else{
            dispatch(addToCart({productId:id, quantity:1}));
        }
    }

  return (
    <Grid item sm={5} xs={10} sx={{ paddingX:'0 !important' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} 
            sx={{ minWidth:'200px', border:0, borderRadius: '16px', 
            justifyContent: 'center', alignItems: 'center',
            boxShadow:5, padding:'0 !important' }}>
            <Box component="img" 
                sx={{ height: 150, width:{sm: 150, xs:'100%'}, border:0
                    , marginTop:{sm:1,md:0}, marginLeft:{sm:0,md:1}
                    , borderRadius: {xs:'16px',sm:1}}}
                alt={item.name} src={item.img} />
            <Stack direction='column' sx={{width:'100%'}}>
                <Box sx={itemStyle}>
                    <Typography component="div" variant="h5" sx={{fontSize:{xs:17,md:20}}}>
                        {item.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" 
                         sx={descriptionStyle}
                        component="div">
                        {item.description}
                    </Typography>
                    <Stack direction='row'>
                        {item.available<10 
                            ? <Chip label={`Only ${item.available} left`} 
                            sx={{ backgroundColor:'#f9c056', width:"40%" }} size="small" />
                            : <Chip label="Available" 
                                sx={{ backgroundColor:'#6dbd75', width:"40%" }} size="small" />}
                        {Boolean(coupon) 
                            && <Tooltip title={coupon?.description}>
                                    <Chip label={coupon?.coupon} 
                                        sx={{ backgroundColor:'#f294f5', width:"20%"
                                        , fontSize:10, marginLeft:1, paddingY:1 }} size="small" />
                                </Tooltip>
                        }
                    </Stack>
                </Box>
                <Grid container spacing={1} sx={{backgroundColor:{xs:'#f7f5f5', md:'#fff'}, width:'100% !important'
                        , borderBottomLeftRadius:16, borderBottomRightRadius:16, margin:0}}>
                    <Grid item xs={3} sx={{border:0, padding:'0 !important',fontSize:14,
                                            display:'flex', justifyContent:'center', 
                                            alignItems:'center'}}>
                        {item.price}
                    </Grid>
                    <Grid item xs={4} sx={{border:0, padding:'0 !important',
                                            display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                        {isItemInCart() && <CartCounter item={item} quantity={getCartItem()?.quantity!} />}
                    </Grid>
                    <Grid item xs={2} sx={{border:0, padding:'0 !important'}}>
                        <Tooltip title="Shopping cart">
                            <IconButton aria-label="shopping-cart"  onClick={() => handleCartClick(item.id)}>
                                {isItemInCart() ? <ShoppingCartIcon color='success'/>  : <ShoppingCartOutlinedIcon/>}
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={3} sx={{border:0, padding:'0 !important'}}>
                        <Tooltip title="Favorites">
                            <IconButton aria-label="favorite"  onClick={() => handleFavoriteClick(item.id)}>
                                {wishlistIds.includes(item.id) ? <FavoriteOutlinedIcon color='error'/>  : <FavoriteBorderOutlinedIcon/>}
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    </Grid>
  )
}

export default CatalogItem
