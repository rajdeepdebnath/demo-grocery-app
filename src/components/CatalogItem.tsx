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

interface Props {
    item:Product
}

const CatalogItem = ({item}: Props) => {
    const wishlistIds = useAppSelector((state: RootState) => state.wishlist.wishlistProductIds);
    const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useAppDispatch()
    
    const isItemInCart = () => {
        return cartItems.length>0 && Boolean(cartItems.find(ci => ci.productId === item.id));
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
    <Grid item lg={6} sm={6} md={6} xs={10}>
        <Card sx={{ display: 'flex', minWidth:300, minHeight:200 }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="shopping-cart"  onClick={() => handleCartClick(item.id)}>
                    {isItemInCart() ? <ShoppingCartIcon color='success'/>  : <ShoppingCartOutlinedIcon/>}
                </IconButton>
                <IconButton aria-label="favorite"  onClick={() => handleFavoriteClick(item.id)}>
                    {wishlistIds.includes(item.id) ? <FavoriteOutlinedIcon color='error'/>  : <FavoriteBorderOutlinedIcon/>}
                </IconButton>
            </Box>
        </Box>
        </Card>
    </Grid>
  )
}

export default CatalogItem
