//import data from "../photos_data";
import { useMediaQuery, Box, Button, Modal,useTheme, IconButton , ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useState } from "react";
import FlexBetween from "./FlexBetween";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
const ImageLayout = ({data}) => {
    const mode = useSelector((state) => state.mode);
    const [openData, setOpenData] = useState ({});
    
    const theme = useTheme();
    const light = theme.palette.primary.light;
    const dark = theme.palette.primary.dark;    
    const isSmall = useMediaQuery("(max-width: 650px");
    const isMaxSmall = useMediaQuery("(min-width: 651px)");
    const isMaxMedium = useMediaQuery("(max-width:989px)");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    
    const handleOpenImage = (imageData) => {
        setOpenData(imageData);
        setOpen(true);
    }
    
    return (
        <Box width="100%">
            
            <ImageList sx={{ width: "100%"}} variant="masonry" cols={(isSmall)? 2 : (isMaxSmall && isMaxMedium) ? 3: 4} gap={8}>
            {data.map((item) => (
                <ImageListItem key={item.urls.thumb}>
                
                <img
                    src={item.urls.thumb}
                    alt={item.alt_description}
                    loading="lazy"
                    onClick={() => handleOpenImage(item)}
                />
                <ImageListItemBar
            title={`${item.user.first_name} ${item.user.last_name}`}
            subtitle={item.user.username}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
                disabled
              >
              <ThumbUpOffAltIcon/>
              <Typography>
                {item.likes}
              </Typography>
              </IconButton>
            }
            />
                </ImageListItem>
            ))}
            </ImageList>
            {open ? <div>
          <Button onClick={handleOpen}>Open modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
                position: 'absolute' ,
                top: '50%',
                left: "50%",
                transform: 'translate(-50%, -50%)',
                padding: '2%',
                border: "2px solid white",
                boxShadow: 24,
                background: mode === "Dark" ? dark : light,
            }}>
              <img src={openData.urls.small} style={{"max-height": "70vh", "min-width": "100%"}}/>
              <Box  sx={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    <FlexBetween width={!isMaxMedium ? 
                    (openData.user.social.instagram_username === null &&
                        openData.user.social.twitter_username === null ) ? "100%" :
                    "50%": "100%"} padding="0 4%">
                    <img src={openData.user.profile_image.medium}/>
                    <Box>
                        <Typography>
                            {openData.user.first_name} {openData.user.last_name}
                        </Typography>
                        <Typography>
                            @{openData.user.username}
                        </Typography>
                    </Box>
                    </FlexBetween>
                    {(openData.user.social.instagram_username === null &&
                        openData.user.social.twitter_username === null ) ? <></> :
                        <FlexBetween width={!isMaxMedium ? "50%": "100%"} padding="0 4%">
                            <Box width= "100%">
                            <Box sx={{float: "right"}}>
                            {(openData.user.social.instagram_username === null) ?
                            <></> :
                            
                            <Typography >
                                <InstagramIcon fontSize="small"/>
                                {openData.user.social.instagram_username}
                            </Typography>
                            }
                            {(openData.user.social.twitter_username === null) ?
                            <></> :
                            <Typography>
                            <TwitterIcon />
                                {openData.user.social.twitter_username}
                            </Typography>
                            }
                            </Box>
                            </Box>
                            
                        </FlexBetween>
                    }
                
                    
                <FlexBetween width="100%" padding="0 4%">
                        <Box display="inline-flex">
                        <ThumbUpOffAltIcon fontSize="small"/>
                        <Typography>{openData.likes}</Typography>
                        </Box>
                        <Button variant="contained" color="error" href={openData.urls.small_s3}>Download</Button>
                </FlexBetween>
                
              </Box>
            </Box>
          </Modal>
        </div> : <></>}
        </Box>
        
    )

    }
export default ImageLayout;