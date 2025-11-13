"use client";

import { Loading } from "@/components/Loading";
import { Box, Container, Divider, Heading } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const ListPosts = dynamic(() =>
  import("@/features/posts/ListPosts").then((mod) => mod.ListPosts)
);
const LayoutBottom = dynamic(() =>
  import("@/layouts/layoutPosts/LayoutBottom").then((mod) => mod.LayoutBottom)
);
const SLiderPosts = dynamic(() =>
  import("@/features/posts/SliderPosts").then((mod) => mod.SLiderPosts)
);

export const Posts = () => {
  const router = useRouter();

  const handleRouter = ({ selected }: { selected: number }) => {
    router.push(`/tin-tuc?page=${selected + 1}`);
  };

  return (
    <Box pb={"40px"}>
      <Box bg="radial-gradient(circle, rgba(5,70,89,1) 2%, rgba(98,212,245,1) 100%, rgba(252,89,52,1) 100%)">
        <Container maxW={"6xl"} py="60px">
          <Heading
            as="h2"
            textAlign={"center"}
            size={"lg"}
            pb="16px"
            color={"white"}
          >
            Tin tức Đại học Thái Nguyên
          </Heading>
        </Container>
      </Box>
      <Box mt={"32px"}>
        <Suspense fallback={<Loading />}>
          <SLiderPosts />
        </Suspense>
      </Box>

      <Divider size={"xl"} />
      <Box pt={"32px"}>
        <LayoutBottom sticky="120px">
          <Box>
            <Heading
              size={"lg"}
              pb={"20px"}
              textAlign={{ base: "center", lg: "start" }}
            >
              Tin tức
            </Heading>
            <ListPosts handleRouter={handleRouter} />
          </Box>
        </LayoutBottom>
      </Box>
    </Box>
  );
};
