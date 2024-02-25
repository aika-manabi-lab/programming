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
import KeyboardIcon from "@mui/icons-material/KeyboardOutlined";
import CrossWordIcon from "@mui/icons-material/SpellcheckOutlined";
import TextIcon from "@mui/icons-material/LibraryBooksOutlined";
import PdfIcon from "@mui/icons-material/TextSnippetOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { themeOptions } from "./theme";
import { Collapse } from "@mui/material";

const theme = createTheme(themeOptions);

type TextMenuItemProps = {
  url: string;
  title: string;
};

const TextMenuItem: React.FC<TextMenuItemProps> = ({ url, title }) => (
  <ListItem disablePadding component="a" href={url}>
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemIcon>
        <PdfIcon />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  </ListItem>
);

type OtherMenuItemProps = TextMenuItemProps & {
  icon: React.ReactElement;
};

const OtherMenuItem: React.FC<OtherMenuItemProps> = ({ icon, url, title }) => (
  <ListItem disablePadding component="a" href={url}>
    <ListItemButton>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  </ListItem>
);

const textMenus: TextMenuItemProps[] = [
  { url: "text/lesson01.pdf", title: "lesson 01 初級" },
  { url: "text/lesson02.pdf", title: "lesson 02 ステップアップ その１" },
  { url: "text/lesson03.pdf", title: "lesson 03 ステップアップ その２" },
  { url: "text/lesson04.pdf", title: "lesson 04 ステップアップ その３" },
  { url: "text/pen.pdf", title: "ペンを使ってみよう" },
  { url: "text/routing.pdf", title: "スプライトを道に沿って移動させてみよう" },
  { url: "text/jump.pdf", title: "スプライトをジャンプさせてみよう" },
  { url: "text/function.pdf", title: "関数を使ってみよう" },
  { url: "text/motion.pdf", title: "ビデオモーションセンサーを使ってみよう" },
  { url: "text/irobot-root.pdf", title: "iRobot Root プログラミング" },
];

const otherMenus: OtherMenuItemProps[] = [
  { icon: <KeyboardIcon />, url: "typing/index.html", title: "タイピング練習" },
  {
    icon: <CrossWordIcon />,
    url: "word/index.html",
    title: "英単語クロスワード",
  },
];

function App() {
  const [open, setOpen] = React.useState(false);
  const toggleTextMenu = () => {
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
                    <ListItemButton onClick={toggleTextMenu}>
                      <ListItemIcon>
                        <TextIcon />
                      </ListItemIcon>
                      <ListItemText primary="テキスト" />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {textMenus.map((props) => (
                          <TextMenuItem {...props} />
                        ))}
                      </List>
                    </Collapse>
                    {otherMenus.map((props) => (
                      <OtherMenuItem {...props} />
                    ))}
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
