import Link from "next/link";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Tooltip,
  Drawer,
  useTheme,
  useMediaQuery,
  TextField,
  Grid,
} from "@mui/material";
import { Brightness4, Brightness7, Menu } from "@mui/icons-material";
import ArticleList from "./ArticleList";

export default function Layout({ children, toggleColorMode, mode, handleDrawerToggle, posts, drawerOpen }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts ? posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const sidebarContent = (
    <div style={{ paddingLeft: '24px' }}>
      <TextField
        label="Search"
        variant="standard"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: '0rem', p: 2 }}
      />
      <ArticleList posts={filteredPosts} />
    </div>
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="/">Zach Blog</Link>
          </Typography>

          <Box component="nav" sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/" style={{ marginRight: "1rem" }}>
              Home
            </Link>
            <Link href="/about" style={{ marginRight: "1rem" }}>
              About
            </Link>

            <Tooltip title="Toggle light/dark theme">
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, display: 'flex' }}>
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {sidebarContent}
          </Drawer>
        ) : (
          <Box sx={{ width: '21%', flexShrink: 0 }}>
            {sidebarContent}
          </Box>
        )}
        <Container sx={{ mt: 4, mb: 4, flexGrow: 1 }} maxWidth={false}>
          {children}
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{ p: 2, textAlign: "center", bgcolor: "background.paper" }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Zach Blog. All rights reserved. Made by
          zachvlat.
        </Typography>
      </Box>
    </>
  );
}