import { getAllPosts } from '../lib/getBlog';

export default function Home() {
  return (
    <div>
      {/* This space is intentionally left empty */}
    </div>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}
