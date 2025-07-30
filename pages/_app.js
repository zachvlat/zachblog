import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useMemo, useState } from "react";

export default function App({ Component, pageProps }) {
  const [mode, setMode] = useState("dark");

  const toggleColorMode = () => {
    setMode(prev => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
      },
      background: {
        default: mode === "light" ? "#fafafa" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    typography: {
      fontFamily: "Arial, Helvetica, sans-serif",
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Layout toggleColorMode={toggleColorMode} mode={mode}>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  );
}
