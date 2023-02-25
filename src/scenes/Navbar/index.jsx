import React from 'react'
import FlexBetween from '../../components/FlexBetween';
import { Box, 
    IconButton, 
    InputBase, 
    Typography, 
    Select, 
    MenuItem, 
    FormControl, 
    useTheme ,
    useMediaQuery 
} from "@mui/material";
import { Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from '../../state';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primerylight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
        <FlexBetween padding={(isNonMobileScreens) ? "1rem 10%" : "1rem"} backgroundColor={alt}>
      
            <Typography
                fontWeight="bold"
                fontSize="clamp(1rem,2rem,2.25rem)"
                color="primary"
                onClick={() => navigate("/")}
                sx={{
                    "&:hover": {
                    color: primerylight,
                    cursor: "pointer",
                    },
                }}
                >
                ImageGallery
            </Typography>
            <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{fontSize: "25px"}}/>
                    ):
                    (
                        <LightMode sx={{ color: dark ,fontSize: "25px"}}/>
                    )}
            </IconButton>
        </FlexBetween>
)
}
export default Navbar;
