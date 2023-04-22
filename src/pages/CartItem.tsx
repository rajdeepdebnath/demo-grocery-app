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

interface Props {
    item:Product,
    quantity:number
}

const CartItem = ({item,quantity}: Props) => {
    const dispatch = useAppDispatch()

    const handleDelete = (id:number) => {
        dispatch(removeFromCart({productId:id, quantity:quantity}));
    }
    
    
  return (
    <Grid item md={8} xs={10}>
        <Card sx={{ display: 'flex', minWidth:300, minHeight:200 }}>
            <CardMedia
            component="img"
            sx={{ width: 75, margin:5 }}
            image={item.img}
            alt={item.name}
            />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {item.name}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <div>{item.price}</div>&nbsp;
                <div>{quantity}</div>
                <IconButton aria-label="favorite"  onClick={() => handleDelete(item.id)}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </Box>
        </Card>
    </Grid>
  )
}

export default CartItem
