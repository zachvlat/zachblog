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
