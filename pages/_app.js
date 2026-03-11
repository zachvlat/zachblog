import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useMemo, useState } from "react";

export default function App({ Component, pageProps }) {
  const { posts: appPosts = [], ...restPageProps } = pageProps;
  const posts = appPosts.length > 0 ? appPosts : restPageProps.posts || [];
  const [mode, setMode] = useState("dark");
  const [searchQuery, setSearchQuery] = useState("");

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
        <Layout toggleColorMode={toggleColorMode} mode={mode} posts={posts} searchQuery={searchQuery} onSearchChange={setSearchQuery}>
          <Component {...restPageProps} searchQuery={searchQuery} />
        </Layout>
      </div>
    </ThemeProvider>
  );
}

App.getInitialProps = async (ctx) => {
  if (typeof window === 'undefined') {
    const { getAllPosts } = await import("@/lib/getNews");
    const posts = getAllPosts();
    return { pageProps: { posts } };
  }
  return { pageProps: { posts: [] } };
};
