import { Heading, Text, VStack } from "@chakra-ui/react";

export const HeadSection = ({
  subtitle,
  title,
  desc
}: {
  subtitle: string;
  title: string;
  desc: string;
}) => {
  return (
    <VStack justify={"center"}>
      {/* <Text color={"#FA692E"}>{subtitle}</Text> */}
      <Heading
        as={"h2"}
        size={{ base: "sm", md: "lg" }}
        textAlign={"center"}
        textTransform={"uppercase"}
        color={"blue.800"}
      >
        {title}
      </Heading>
      <Heading
        color={"gray.700"}
        fontWeight={"thin"}
        size={{ base: "sm", md: "md" }}
      >
        {desc}
      </Heading>
    </VStack>
  );
};

export const HeadSectionLight = ({
  subtitle,
  title,
  desc
}: {
  subtitle: string;
  title: string;
  desc: string;
}) => {
  return (
    <VStack justify={"center"}>
      {/* <Text color={"#FA692E"}>{subtitle}</Text> */}
      <Heading
        as={"h2"}
        size={{ base: "sm", md: "lg" }}
        textAlign={"center"}
        textTransform={"uppercase"}
        color={"whiteAlpha.900"}
      >
        {title}
      </Heading>
      <Text color={"whiteAlpha.900"} fontWeight={"sm"}>
        {desc}
      </Text>
    </VStack>
  );
};
