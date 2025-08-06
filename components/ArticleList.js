import { List, ListItem, Typography } from '@mui/material';
import Link from 'next/link';

export default function ArticleList({ posts }) {
  const groupedPosts = posts.reduce((acc, post) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const key = `${month} ${year}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(post);

    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedPosts).map(([group, posts]) => (
        <div key={group}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            {group}
          </Typography>
          <List dense>
            {posts.map((post) => (
              <ListItem key={post.slug} sx={{ pl: 2 }}>
                <Link href={`/blog/${post.slug}`} passHref>
                  <Typography variant="body2">{post.title}</Typography>
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
}
