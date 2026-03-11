import { Container, Typography, Box, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getAllPosts } from '../lib/getNews';

export default function About({ posts }) {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h4">
          <Link href="https://github.com/zachvlat" target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}
