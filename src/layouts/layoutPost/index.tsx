"use client";

import { Loading } from "@/components/Loading";
import { useModal } from "@/components/ModalContext";
import { Container, GridItem, SimpleGrid } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ReactNode, useEffect } from "react";

const ModalBase = dynamic(
  () => import("@/features/home/Modal").then((mod) => mod.ModalBase),
  {
    loading: () => <Loading />
  }
);
const FormWrapper = dynamic(
  () => import("@/components/FormWrapper").then((mod) => mod.FormWrapper),
  {
    loading: () => <Loading />
  }
);
const Sidebar = dynamic(
  () => import("@/layouts/components/Sidebar").then((mod) => mod.Sidebar),
  {
    loading: () => <Loading />
  }
);

export const LayoutPost = ({ children }: { children: ReactNode }) => {
  const { onOpen, onClose, isOpen } = useModal();

  useEffect(() => {
    if (onOpen) {
      onOpen();
    }
  }, [onOpen]);

  return (
    <Container padding={"0px"} maxW={"6xl"} mt={"42px"}>
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={"42px"}>
        <GridItem colSpan={{ lg: 2 }}>{children}</GridItem>
        <GridItem colSpan={{ lg: 1 }}>
          <Sidebar sticky="125px" />
        </GridItem>
      </SimpleGrid>
      <ModalBase
        isOpen={isOpen || false}
        onOpen={() => onOpen && onOpen()}
        onClose={() => onClose && onClose()}
      >
        <FormWrapper type="form-poup" title="Để lại thông tin" />
      </ModalBase>
    </Container>
  );
};
