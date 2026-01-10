"server only";

import { ModalProvider } from "@/components/ModalContext";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import dynamic from "next/dynamic";
import { GET_FOOTER } from "./api/GraphQl/footer";
import { GET_HEADER } from "./api/GraphQl/header";
import { GET_CTA } from "./api/GraphQl/home";
import { Box } from "@chakra-ui/react";

const TrackingSession = dynamic(() =>
  import("@/components/TrackingSession").then((mod) => mod.TrackingSession)
);

const Footer = dynamic(() =>
  import("@/layouts/footer").then((mod) => mod.Footer)
);
import { Header } from "@/layouts/header";
const Providers = dynamic(() =>
  import("@/app/provider").then((mod) => mod.Providers)
);
const ClientCTA = dynamic(() =>
  import("@/components/ClientCTA").then((mod) => mod.ClientCTAWrapper)
);

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const { footerData, ctaData, headerData } = await getLayoutData();

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Preload font CSS - chỉ load weights cần thiết để giảm parsing time */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          as="style"
        />
        {/* Load font CSS - chỉ weights thường dùng (400, 500, 600, 700) thay vì tất cả */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        {/* Analytics sẽ load sau khi page interactive để không block render */}
        {/* {gtmId && <GoogleTagManager gtmId={gtmId} />} */}

        <Providers>
          <ModalProvider>
            <Box width={"full"} maxW={"1920px"} mx={"auto"}>
              <TrackingSession />
              <Header data={headerData} />
              {children}
              <Footer footerData={footerData} />
            </Box>
            <ClientCTA ctaData={ctaData} />
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
};

async function getLayoutData() {
  const API_GRAPHQL =
    process.env.NEXT_PUBLIC_API_GRAPHQL ||
    "https://dhthainguyen.aum.edu.vn/graphql";
  const API_TOKEN = process.env.TOKEN || "";

  const httpLink = new HttpLink({
    uri: API_GRAPHQL,
    // Tối ưu HTTP connection
    fetchOptions: {
      keepalive: true
    }
  });

  const authLink = setContext((_, context) => {
    const headers = context.headers ?? {};
    return {
      headers: {
        ...headers,
        authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : ""
      }
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: from([authLink, httpLink])
  });

  try {
    // Thêm timeout để fail fast nếu server response chậm
    const [footerResponse, ctaResponse, headerResponse] = await Promise.all([
      client.query({
        query: GET_FOOTER,
        fetchPolicy: "network-only",
        context: {
          fetchOptions: {
            timeout: 2000 // 2s timeout để fail fast
          }
        }
      }),
      client.query({
        query: GET_CTA,
        fetchPolicy: "network-only",
        context: {
          fetchOptions: {
            timeout: 2000
          }
        }
      }),
      client.query({
        query: GET_HEADER,
        fetchPolicy: "network-only",
        context: {
          fetchOptions: {
            timeout: 2000
          }
        }
      })
    ]);

    return {
      footerData: footerResponse?.data?.pageBy?.trangChu?.footer || {},
      ctaData: ctaResponse?.data?.allCTA?.nodes?.[0]?.ctaQuery || {},
      headerData: headerResponse?.data?.pageBy?.trangChu?.header || {}
    };
  } catch (error) {
    console.error("GraphQL Error:", error);
    return { footerData: {}, ctaData: {}, headerData: {} };
  }
}

export default RootLayout;
