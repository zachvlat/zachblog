import { Container, Typography } from '@mui/material';
import { getPostBySlug, getAllPosts } from '../../lib/getNews';
import ReactMarkdown from 'react-markdown';

export default function NewsPage({ post }) {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>{post.title}</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>{post.date}</Typography>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </Container>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return { props: { post } };
}
