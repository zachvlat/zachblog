---
title: "Next JS News Site"
date: "2025-06-19"
slug: "next-js-news-site"
---

```bash
#!/bin/bash

# Exit on error
set -e

# Project name
PROJECT_NAME=${1:-news-site}

echo "Creating Next.js app (JavaScript only): $PROJECT_NAME"
npx create-next-app@latest "$PROJECT_NAME" --no-app

cd "$PROJECT_NAME"

echo "Installing dependencies..."
npm install @mui/material @emotion/react @emotion/styled gray-matter react-markdown

echo "Creating folders..."
mkdir -p content components lib pages/news

# Sample Markdown content
cat > content/breaking-news-mui-awesome.md <<EOL
---
title: "Breaking News: MUI is Awesome"
date: "2025-06-18"
slug: "breaking-news-mui-awesome"
---

Material UI makes building beautiful UIs fast and efficient.
EOL

# getNews.js utility
cat > lib/getNews.js <<'EOL'
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const newsDir = path.join(process.cwd(), 'content');

export function getAllPosts() {
  const filenames = fs.readdirSync(newsDir);

  const posts = filenames.map((filename) => {
    const filePath = path.join(newsDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return data;
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const fullPath = path.join(newsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Markdown file not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { ...data, content };
}
EOL

# Home page
cat > pages/index.js <<'EOL'
import { Container, Typography, Grid } from '@mui/material';
import NewsCard from '../components/NewsCard';
import { getAllPosts } from '../lib/getNews';

export default function Home({ posts }) {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Latest News
      </Typography>
      <Grid container spacing={4}>
        {posts.map((post) => (
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
EOL

# NewsCard component
cat > components/NewsCard.js <<'EOL'
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import Link from 'next/link';

export default function NewsCard({ post }) {
  return (
    <Link href={`/news/${post.slug}`} passHref legacyBehavior>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {post.date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
EOL

# News article page
cat > pages/news/[slug].js <<'EOL'
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
EOL

echo "✅ Bootstrap complete (JavaScript only)"
echo "👉 cd $PROJECT_NAME && npm run dev"