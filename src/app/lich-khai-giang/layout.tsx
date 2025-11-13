import { getSeoData } from "@/ultil/getSeoData";
import { Metadata } from "next";

import { generateMetadataFromFullHead } from "@/ultil/seoUtils";
import { GET_LICH_KHAI_GIANG } from "../api/GraphQl/lichKhaiGiang";
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_LICH_KHAI_GIANG, "pageBy");

  return {
    ...generateMetadataFromFullHead(
      seo.fullHead || "",
      seo.focusKeywords || ""
    ),
    robots: "index, follow"
  };
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
