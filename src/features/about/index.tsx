"use client";

import { GET_PAGE_ABOUT } from "@/app/api/GraphQl/about";
import { fetchDataPage } from "@/lib/getData";
import { Box, Container, Grid, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const About = () => {
  const [aboutData, setAbountData] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataPage(GET_PAGE_ABOUT, "gioiThieu");
        setAbountData(data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    getData();
  }, []);

  return (
    <Box color={"blue.800"}>
      <Box bg="radial-gradient(circle, rgba(5,70,89,1) 2%, rgba(98,212,245,1) 100%, rgba(252,89,52,1) 100%)">
        <Container maxW={"6xl"} py="60px">
          <Heading
            as="h2"
            textAlign={"center"}
            size={"lg"}
            pb="16px"
            color={"white"}
          >
            {aboutData?.tenGioiThieu || "Giới thiệu Đại học Thái Nguyên"}
          </Heading>
        </Container>
      </Box>

      <Container maxW={"6xl"} py="60px">
        <Heading as="h2" size={{ base: "md" }} py="16px" pb={"10px"}>
          {aboutData?.title ||
            "Lịch sử hình thành và phát triển Đại học Thái Nguyên"}
        </Heading>
        <Text>
          {aboutData?.description ||
            "Đại học Thái Nguyên (ĐHTN – tên tiếng Anh: ThaiNguyen University; viết tắt là TNU) được thành lập ngày 04/04/1994 theo Nghị định số 31/CP của Chính Phủ trên cơ sở tổ chức sắp xếp lại các trường đại học thuộc địa bàn tỉnh Thái Nguyên."}
        </Text>
        <Grid placeItems={"center"} py={"24px"}>
          <Image
            src={
              aboutData?.anhGioiThieu?.node?.mediaItemUrl ||
              "/truong-dai-hoc-nong-lam-thai-nguyen.webp"
            }
            alt="Đại học Thái Nguyên"
            width={600}
            height={436}
            quality={75}
            sizes="(max-width: 768px) 100vw, 600px"
            style={{ width: "100%", height: "auto" }}
          />
          <Text fontWeight={"bold"}>Trường Đại học Thái Nguyên</Text>
        </Grid>

        {aboutData?.label?.map((item: any, index: number) => (
          <Box key={index}>
            <Heading as="h2" size={{ base: "md" }} py="16px" pb={"10px"}>
              {item.title}
            </Heading>
            <Text>{item.description}</Text>
          </Box>
        ))}

        <Box>
          <Heading as="h2" size={{ base: "md" }} py="16px" pb={"10px"}>
            {aboutData?.giaTriCotLoi?.text1 || "Giá trị cốt lõi"}
          </Heading>
          <Text fontWeight={"700"}>
            {aboutData?.giaTriCotLoi?.text2 ||
              "SÁNG TẠO - NHÂN VĂN - CHẤT LƯỢNG"}
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size={{ base: "md" }} py="16px" pb={"10px"}>
            {aboutData?.slogan?.text1 || "Slogan"}
          </Heading>
          <Text fontWeight={"600"}>
            {aboutData?.slogan?.text2 ||
              "Cùng kiến tạo những giá trị mới - Together we create new success."}
          </Text>
        </Box>

        {aboutData?.label2?.map((item: any, index: number) => (
          <Box key={index}>
            <Heading as="h2" size={{ base: "md" }} py="16px" pb={"10px"}>
              {item.title}
            </Heading>
            <Text>{item.description}</Text>
          </Box>
        ))}
      </Container>
    </Box>
  );
};
