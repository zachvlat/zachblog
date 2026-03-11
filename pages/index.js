import { Container, Typography, Grid } from '@mui/material';
import NewsCard from '../components/NewsCard';
import { getAllPosts } from '../lib/getNews';

export default function Home({ posts: pagePosts, searchQuery }) {
  const filteredPosts = (pagePosts || []).filter((post) =>
    post.title.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Homepage
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
