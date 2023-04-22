import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
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
import { useNavigate } from 'react-router-dom';

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
    width: '90%',
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


const gridItemStyle = {
  border:'0px solid red',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft:'0 !important',
  paddingTop:'0 !important',
}


const Topbar = () => {
  const navigation = useNavigate();

  const handleFavoriteClick = () => {
    navigation('/wishlist');
  }


  return (
    <TopNavBar>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={gridItemStyle}>
          <Typography component="h2" 
          sx={{ fontFamily:'Arial', fontWeight:'bold' }}>GROCERIES</Typography>
        </Grid>
        <Grid item xs={7} sx={gridItemStyle}>
          <Search>
            <SearchInput placeholder='Search'/>
            <SearchIconWrapper>
              <TuneIcon fontSize='large'/>
            </SearchIconWrapper>
          </Search>
        </Grid>
        <Grid item xs={3} sx={gridItemStyle}>
          <Box sx={{ border:'0px solid red', width:'100%', 
          display:'flex', justifyContent:'space-evenly' }}>
            <IconButton aria-label="cart"  onClick={() => null}>
              <ShoppingCartOutlinedIcon fontSize='large' />
            </IconButton>
            <IconButton aria-label="profile"  onClick={() => null}>
              <AccountCircleRoundedIcon fontSize='large' />
            </IconButton>
            <IconButton aria-label="favorite"  onClick={handleFavoriteClick}>
                <FavoriteBorderOutlinedIcon fontSize='large' />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </TopNavBar>
  )
}

export default Topbar
