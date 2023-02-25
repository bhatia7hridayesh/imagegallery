import { Typography, 
  Box, 
  useMediaQuery, 
  useTheme, 
  InputBase, 
  IconButton,
  Grid, TextField
 } from '@mui/material';
 import Popover from '@mui/material/Popover';
import { Search } from '@mui/icons-material';
import React, {useState, useEffect} from 'react';
import Navbar from '../Navbar';
import FlexBetween from '../../components/FlexBetween';
import ImageLayout from '../../components/ImagesLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setData, setSearchSuggestions } from '../../state';
function HomePage() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const data = useSelector((state) => state.data);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const primerylight = theme.palette.primary.light;
  const searchSuggestions = useSelector((state) => state.searchSuggestions);
  const handleClick = (event) => {
    if(searchSuggestions === []){
      return;
    }else{
      setAnchorEl(event.currentTarget);
    }
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const getData = async () => {
      const response = await fetch('https://api.unsplash.com/photos/?page=1&per_page=24&client_id=jQsCYsEYH_PEdTDtFLaKcli-JeqdFqFn-lXeP0Vq42U');
      const response_data = await response.json();
      console.log(response_data);
      dispatch(setData({data : response_data}));
  }
  useEffect(() => {
      getData();
      
  }, []);
  const getSearchResult = async() => {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&page=1&per_page=24&client_id=jQsCYsEYH_PEdTDtFLaKcli-JeqdFqFn-lXeP0Vq42U`);
      const response_data = await response.json();
      console.log(response_data.results);
      dispatch(setData({data : response_data.results}));
  }
  const onClickSearch = () => {
      dispatch(setSearchSuggestions({setSearchSuggestions: searchQuery}));
      getSearchResult();
  }
  const handleSearch = (event) => {
          setSearchQuery(event.target.value);
          getSearchResult();
  }
  
  return (
    <Box>
    {console.log(typeof(searchSuggestions))}
        <Navbar/>
        <Box width="100%" padding={(isNonMobileScreens) ? "1rem 10%" : "1rem 3%"}>
          <FlexBetween 
          backgroundColor={primerylight} 
          borderRadius="9px" 
          padding="0.1rem 1rem"
          width={((isNonMobileScreens) ? "80%" : "100%")}
          >
          <TextField sx={{minWidth: (isNonMobileScreens) ? "95%" : "90%"}}  
          id="standard-basic" label="Search" variant="standard" 
          onChange={handleSearch} onClick={handleClick}/>
          <IconButton onClick={onClickSearch}>
              <Search />
          </IconButton>
          {searchSuggestions===0 ? <></> :<Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            {searchSuggestions.map((sS) => {
              return (
                <Typography sx={{ p: 2 }}>
                  {sS}
                </Typography>
              )
            })}
          </Popover>}
          </FlexBetween>

          <Box sx={{ display: 'inline-flex',  flexDirection: "row", minWidth: "100%" }}>
            <ImageLayout data={data}/>
          </Box>
        </Box>
    </Box>
  )
}

export default HomePage;
