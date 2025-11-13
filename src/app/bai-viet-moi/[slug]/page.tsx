"server only";

import { Post } from "@/features/post";

const api_url =
  process.env.API_URL || "https://dhthainguyen.aum.edu.vn/wp-json/wp/v2";
const getLatestPosts = async () => {
  try {
    const res = await fetch(
      `${api_url}/posts?per_page=10&orderby=date&order=desc`,
      {
        next: { revalidate: 1 }
      }
    );
    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }
    const posts: any[] = await res.json();

    return { posts: posts || [] };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [] };
  }
};

const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const { posts } = await getLatestPosts();
  const post = posts?.find((post) => post.slug === slug);

  if (!post) {
    return <div>Bài viết không tồn tại</div>;
  }

  return <Post post={post} />;
};

export default Page;
