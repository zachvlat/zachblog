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
