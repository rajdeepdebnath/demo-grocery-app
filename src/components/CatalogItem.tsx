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

const itemStyle = { 
    display: 'flex', 
    flexDirection: 'column', 
    width:'100%', 
    height:150, 
    overflow:'hidden', 
    textOverflow:'ellipsis',
    padding:{xs:1,md:0}
}

const descriptionStyle = {
    fontSize:{xs:14,md:18}, 
    lineHeight:{xs:1.2,md:2}, 
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
    <Grid item lg={6} sm={5} md={6} xs={10} sx={{ paddingX:'0 !important' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} 
            sx={{ minWidth:'200px', border:0, borderRadius: '16px', 
            justifyContent: 'center', alignItems: 'center',
            boxShadow:5, padding:'0 !important' }}>
            <Box component="img" 
                sx={{ height: 150, width:{sm: 150, xs:'100%'}, borderRadius: '16px'}}
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
                </Box>
                <Grid container spacing={1} sx={{backgroundColor:'#f7f5f5', width:'100% !important'
                        , borderBottomLeftRadius:16, borderBottomRightRadius:16, margin:0}}>
                    <Grid item xs={7} sx={{border:'0px solid red', padding:'0 !important',
                                            display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                        {isItemInCart() && <CartCounter item={item} quantity={getCartItem()?.quantity!} />}
                    </Grid>
                    <Grid item xs={2} sx={{border:'0px solid red', padding:'0 !important'}}>
                        <Tooltip title="Shopping cart">
                            <IconButton aria-label="shopping-cart"  onClick={() => handleCartClick(item.id)}>
                                {isItemInCart() ? <ShoppingCartIcon color='success'/>  : <ShoppingCartOutlinedIcon/>}
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={3} sx={{border:'0px solid red', padding:'0 !important'}}>
                        <Tooltip title="Favorites">
                            <IconButton aria-label="favorite"  onClick={() => handleFavoriteClick(item.id)}>
                                {wishlistIds.includes(item.id) ? <FavoriteOutlinedIcon color='error'/>  : <FavoriteBorderOutlinedIcon/>}
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
        {/* <Card sx={{ display: 'flex', minWidth:300, minHeight:200 }}>
            <CardMedia
            component="img"
            sx={{ width: 151, margin:5 }}
            image={item.img}
            alt="Live from space album cover"
            />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {item.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {item.description}
                </Typography>
            </CardContent>
            
            <Grid container spacing={2}>
                <Grid item xs={8} sx={{border:'1px solid red'}}>
                    {isItemInCart() && <CartCounter item={item} quantity={getCartItem()?.quantity!} />}
                </Grid>
                <Grid item xs={2} sx={{border:'1px solid red'}}>
                    <Tooltip title="Shopping cart">
                        <IconButton aria-label="shopping-cart"  onClick={() => handleCartClick(item.id)}>
                            {isItemInCart() ? <ShoppingCartIcon color='success'/>  : <ShoppingCartOutlinedIcon/>}
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={2} sx={{border:'1px solid red'}}>
                    <Tooltip title="Favorites">
                        <IconButton aria-label="favorite"  onClick={() => handleFavoriteClick(item.id)}>
                            {wishlistIds.includes(item.id) ? <FavoriteOutlinedIcon color='error'/>  : <FavoriteBorderOutlinedIcon/>}
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Box>
        </Card> */}
    </Grid>
  )
}

export default CatalogItem
