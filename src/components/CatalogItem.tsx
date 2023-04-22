import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Product } from '../types/product';
import Grid from '@mui/material/Grid';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useAppDispatch } from '../state/hooks';
import { addToWishlist } from '../state/wishlistSlice';

interface Props {
    item:Product
}

const CatalogItem = ({item}: Props) => {
    const dispatch = useAppDispatch()
    
    const handleFavoriteClick = (id:number) => {
        // dispatch(addToWishlist({productId:id}));
        throw Error(`Failed to`)
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
                <IconButton aria-label="shopping-cart">
                    <ShoppingCartOutlinedIcon />
                </IconButton>
                <IconButton aria-label="favorite"  onClick={() => handleFavoriteClick(item.id)}>
                    <FavoriteBorderOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>
        </Card>
    </Grid>
  )
}

export default CatalogItem
