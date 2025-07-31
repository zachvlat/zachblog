
import { Container, Typography } from '@mui/material';
import Head from 'next/head';
import { getAllPosts, getPostBySlug } from '../../lib/getNews';
import ReactMarkdown from 'react-markdown';

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Container>
        <Typography variant="h3" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {post.date}
        </Typography>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug);
    return { props: { post } };
  }
