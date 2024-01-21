import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import KeyboardIcon from "@mui/icons-material/KeyboardOutlined";
import CrossWordIcon from "@mui/icons-material/SpellcheckOutlined";

import { themeOptions } from "./theme";

const theme = createTheme(themeOptions);

function App() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              秋鹿学びラボ プログラミング教室
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            width: "100vw",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Paper
                sx={{
                  m: 2,
                  p: 2,
                  bgcolor: "background.paper",
                  width: "100%",
                }}
              >
                <nav aria-label="main links">
                  <List>
                    <ListItem
                      disablePadding
                      component="a"
                      href="typing/index.html"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <KeyboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="タイピング練習" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      disablePadding
                      component="a"
                      href="word/index.html"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <CrossWordIcon />
                        </ListItemIcon>
                        <ListItemText primary="英単語クロスワード" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
              </Paper>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
