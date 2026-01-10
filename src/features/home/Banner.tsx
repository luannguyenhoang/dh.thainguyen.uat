"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";

export const Banner = ({ bannerData }: { bannerData?: any }) => {
  return (
    <Box>
      <Box
        position={"relative"}
        w={"full"}
        overflow={"hidden"}
        aspectRatio={16 / 9}
      >
        <Image
          src={
            bannerData?.anhBanner?.node?.mediaItemUrl ||
            "/dai_hoc_thai_nguyen.jpg"
          }
          width={1920}
          height={1080}
          alt="Đại học Thái Nguyên"
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </Box>
    </Box>
  );
};
