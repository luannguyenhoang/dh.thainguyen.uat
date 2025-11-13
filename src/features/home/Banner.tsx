"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";

export const Banner = ({ bannerData }: { bannerData?: any }) => {
  return (
    <Box>
      <Box position={"relative"}>
        <Image
          src={
            bannerData?.anhBanner?.node?.mediaItemUrl ||
            "/dai_hoc_thai_nguyen.jpg"
          }
          width={1920}
          height={1080}
          alt="Đại học Thái Nguyên"
          priority
          quality={75}
          style={{ objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
};
