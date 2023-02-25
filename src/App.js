import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { BrowserRouter,
  Navigate,
  Routes, Route
} from "react-router-dom";
import HomePage from "./scenes/HomePage";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <Box className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
              <Route exact path="/" element={<HomePage/>}></Route>            
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
}

export default App;
