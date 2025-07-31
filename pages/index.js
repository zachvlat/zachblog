import { Container, Typography, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import NewsCard from '../components/NewsCard';
import { getAllPosts } from '../lib/getNews';

export default function Home({ posts }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: '2rem', '& .MuiOutlinedInput-root': { borderRadius: '22px' } }}
      />
      <Typography variant="h3" gutterBottom>
        Latest News
      </Typography>
      <Grid container spacing={4}>
        {filteredPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.slug}>
            <NewsCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}
