import { Container, Typography, Box, Link } from '@mui/material';

export default function About() {
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
            My Repos
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
