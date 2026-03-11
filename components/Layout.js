import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
  Drawer,
  useMediaQuery
} from "@mui/material";
import { Brightness4, Brightness7, Search, Menu } from "@mui/icons-material";
import { useState } from "react";

export default function Layout({ children, toggleColorMode, mode, posts = [], searchQuery, onSearchChange }) {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  const filteredPosts = (posts || []).filter((post) =>
    post.title.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post.slug);
    router.push(`/news/${post.slug}`);
    if (isMobile) setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ p: 2 }}>
      <TextField
        size="small"
        placeholder="Search..."
        fullWidth
        value={searchQuery || ''}
        onChange={(e) => onSearchChange?.(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="h6" gutterBottom>
        All Posts
      </Typography>
      <List>
        {filteredPosts.map((post) => (
          <ListItem key={post.slug} disablePadding>
            <ListItemButton 
              onClick={() => handlePostClick(post)}
              selected={router.query.slug === post.slug}
            >
              <ListItemText primary={post.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="/">Zach Blog</Link>
          </Typography>

          <Box component="nav" sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/" style={{ marginRight: "1rem", display: { xs: 'none', md: 'block' } }}>Home</Link>
            <Link href="/about" style={{ marginRight: "1rem", display: { xs: 'none', md: 'block' } }}>About</Link>

            <Tooltip title="Toggle light/dark theme">
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 280 },
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, display: 'flex' }}>
        <Box
          sx={{
            width: 280,
            flexShrink: 0,
            borderRight: 1,
            borderColor: 'divider',
            display: { xs: 'none', md: 'block' },
            p: 2,
            height: 'calc(100vh - 64px)',
            position: 'sticky',
            top: 64,
            overflow: 'auto'
          }}
        >
          {drawer}
        </Box>
        <Container sx={{ mt: 4, mb: 4, flexGrow: 1 }}>{children}</Container>
      </Box>

      <Box component="footer" sx={{ p: 2, textAlign: "center", bgcolor: "background.paper" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Zach Blog. All rights reserved. Made by zachvlat.
        </Typography>
      </Box>
    </>
  );
}
