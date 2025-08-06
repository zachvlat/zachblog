import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Tooltip
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function Layout({ children, toggleColorMode, mode }) {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="/">Zach Blog</Link>
          </Typography>

          <Box component="nav" sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/" style={{ marginRight: "1rem" }}>Home</Link>
            <Link href="/about" style={{ marginRight: "1rem" }}>About</Link>

            <Tooltip title="Toggle light/dark theme">
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container sx={{ mt: 4, mb: 4 }}>{children}</Container>
      </Box>

      <Box component="footer" sx={{ p: 2, textAlign: "center", bgcolor: "background.paper" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Zach Blog. All rights reserved. Made by zachvlat.
        </Typography>
      </Box>
    </>
  );
}
