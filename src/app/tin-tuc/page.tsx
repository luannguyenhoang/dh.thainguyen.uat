"server only";

import { getSeoData } from "@/ultil/getSeoData";
import { generateMetadataFromFullHead } from "@/ultil/seoUtils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { GET_SEO_PAGE_POSTS } from "../api/GraphQl/posts";

const Posts = dynamic(() =>
  import("@/features/posts").then((mod) => mod.Posts)
);
const ErrorBoundary = dynamic(() => import("@/components/ErrorBoundary"));
const Loading = dynamic(() =>
  import("@/components/Loading").then((mod) => mod.Loading)
);

export const revalidate = 60;
export async function generateMetadata(): Promise<Metadata> {
  const post = await getSeoData(GET_SEO_PAGE_POSTS, "pageBy");

  return {
    ...generateMetadataFromFullHead(
      post.seo.fullHead || "",
      post.seo.focusKeywords || ""
    ),
    robots: "index, follow"
  };
}
export default async function Page() {
  return (
    <>
      <ErrorBoundary fallback={<h1>Lỗi server</h1>}>
        <Suspense fallback={<Loading />}>
          <Posts />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
