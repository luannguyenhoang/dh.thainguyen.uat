"use client";

import { Loading } from "@/components/Loading";
import styles from "@/styles/Couters.module.css";
import {
  Box,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  SimpleGrid
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import CountUp from "react-countup";
import { defaultDataCounters } from "../../ultil/DefaultData/defaultDataCounters";

const HeadSectionLight = dynamic(
  () => import("@/components/HeadSection").then((mod) => mod.HeadSectionLight),
  {
    loading: () => <Loading />
  }
);

interface ICounter {
  start: number;
  end: number;
  subfix: string;
  prefix?: string;
}

export const Counter = (props: ICounter) => {
  const { start, end, subfix, prefix } = props;

  return (
    <CountUp
      {...({
        enableScrollSpy: true,
        start,
        end,
        duration: 2,
        suffix: prefix || "+",
        children: ({
          countUpRef
        }: {
          countUpRef: React.RefObject<HTMLElement>;
        }) => (
          <Flex justifyContent={"center"} flexDir="column" align={"center"}>
            <span
              style={{
                fontSize: "2.5rem",
                textAlign: "center",
                fontWeight: "bold",
                color: "#fff"
              }}
              ref={countUpRef}
            />
            <Heading fontSize="lg" color="red.500">
              {subfix}
            </Heading>
          </Flex>
        )
      } as any)}
    />
  );
};

export const Counters = ({ counterData }: { counterData?: any }) => {
  const title = counterData?.tieuDe || defaultDataCounters.title;
  const desc = counterData?.noiDung || defaultDataCounters.desc;

  let counters = defaultDataCounters.counters;

  if (counterData?.cot && Array.isArray(counterData.cot)) {
    counters = counterData.cot.map((item: any, index: number) => {
      const numberValue = parseInt(item.cot.text1, 10) || 0;

      return {
        start: 0,
        end: numberValue,
        suffix: item.cot.text2 || "Giá trị",
        prefix: numberValue > 90 ? "%" : "+"
      };
    });
  }

  return (
    <Box pos={"relative"} zIndex={0}>
      <Container
        maxW="6xl"
        py={"48px"}
        className={styles["context"]}
        pos={"absolute"}
        top={0}
        left={"50%"}
        transform={"translateX(-50%)"}
      >
        <HeadSectionLight title={title} subtitle="những con số" desc={desc} />
        <SimpleGrid
          gridTemplateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)"
          }}
          spacing={"8"}
          pt={"36px"}
        >
          {counters.map((counter: any, index: number) => (
            <Counter
              key={index}
              start={counter.start}
              end={counter.end}
              subfix={counter.suffix}
              prefix={counter.prefix}
            />
          ))}
        </SimpleGrid>
      </Container>

      {/* Animate  */}
      <Box className={styles["area"]} bg={"blue.900"} w={"100%"}>
        <List className={styles["circles"]}>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </List>
      </Box>
    </Box>
  );
};
