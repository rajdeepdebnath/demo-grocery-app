import * as React from 'react';
import { styled, alpha, Theme, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import TuneIcon from '@mui/icons-material/Tune';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {debounce} from '@mui/material/utils';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { setSearchCriteria } from '../state/searchSlice';
import { RootState } from '../state/store';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import { useMediaQuery } from '@mui/material';

const TopNavBar = styled('div')(({theme}) => ({
  position:'relative',
  top: '30px',
  marginBottom: 50,
  backgroundColor:'#fff',
  width:'100%',
  height:100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    height:130,
  }
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  color:'#908e8e',
  borderRadius: theme.searchBox.borderRadius,
  border:'1px solid #e0dfdf',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '90%',
  marginLeft:'5%',
  marginRight:'5%',
  [theme.breakpoints.up('sm')]: {
    width: '90%'
  },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  width: '90%',
  height: '50px',
  outline: 'none',
  fontSize: '1rem',
  color:'#716f6f',
  marginLeft:20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: '0px solid yellow',
  '::placeholder':{
    color:'#d3d3d3'
  },
  [theme.breakpoints.down('md')]: {
    height:40,
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '0px solid red',
}));

const GridContainer = styled('div')(({ theme }) => ({
  display:'flex',
  flexDirection:'row',
  [theme.breakpoints.down('md')]: {
    flexDirection:'column',
  },
}));


const gridItemStyle = {
  border:'0px solid red',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft:'0 !important',
  paddingTop:'0 !important',
  marginTop:{xs:1,md:0}
}


const Topbar = () => {
  const wishlistIds = useAppSelector((state: RootState) => state.wishlist.wishlistProductIds);
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems)
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch()

  useEffect(() => {
    setSearchText('');
    dispatch(setSearchCriteria({searchText:null}));
  }, [location]);

  const handleFavoriteClick = () => {
    navigation('/wishlist');
  }

  const handleCartClick = () => {
    navigation('/checkout');
  }

  const handleHomeClick = () => {
    navigation('/');
  }

  const debouncedSearch = React.useRef(
    debounce(async (criteria) => {
      dispatch(setSearchCriteria({searchText:criteria}));
    }, 300)
  ).current;

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  }


  return (
    <TopNavBar>
      <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <Grid item xs={12} md={2} sx={gridItemStyle}>
            <Tooltip title="Click to Home">
              <Typography component="h2" 
              sx={{ fontFamily:'Arial', fontWeight:'bold', marginTop:{xs:2, md:0} }}>
                <Link to='/' style={{textDecoration:'none', color:'#545454'}}>GROCERIES</Link>
              </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={7} sx={gridItemStyle}>
          <Search>
            <SearchInput placeholder='Search' value={searchText} onChange={handleSearchTextChange}/>
            <SearchIconWrapper>
              <TuneIcon fontSize='large'/>
            </SearchIconWrapper>
          </Search>
        </Grid>
        <Grid item md={3} sx={gridItemStyle}>
          <Box sx={{ border:'0px solid red', width:'100%', marginY:{xs:2, md:0}, 
              display:'flex', justifyContent:'space-evenly' }}>
            <Tooltip title="Home" sx={{ display:{md:'none'} }}>
              <IconButton aria-label="home"  onClick={handleHomeClick}>
                <HomeIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
            <Tooltip title="Shopping cart">
              <IconButton aria-label="cart"  onClick={handleCartClick}>
                {cartItems.length > 0
                  ? <Badge badgeContent={cartItems.length} color="primary">
                      <ShoppingCartIcon color='success' fontSize='medium' />
                    </Badge>
                : <ShoppingCartOutlinedIcon fontSize='medium' />}
                
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton aria-label="profile"  onClick={() => null}>
                <AccountCircleRoundedIcon color="primary" fontSize='medium' />
              </IconButton>
            </Tooltip>
            <Tooltip title="Favorites">
              <IconButton aria-label="favorite"  onClick={handleFavoriteClick}>
                {wishlistIds.length > 0
                  ? <Badge badgeContent={wishlistIds.length} color="primary">
                      <FavoriteOutlinedIcon color='error' fontSize='medium' />
                    </Badge>
                : <FavoriteBorderOutlinedIcon fontSize='medium' />}
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </TopNavBar>
  )
}

export default Topbar
