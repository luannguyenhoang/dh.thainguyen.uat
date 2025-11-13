"use client";

import { Frame } from "./Frame";
import { useModal } from "./ModalContext";

interface FrameProps {
  title1: string;
  title2?: string;
  label: string;
  list1?: string[];
  list2?: string[];
}

export const FrameWrapper = (props: FrameProps) => {
  const { onOpen } = useModal();

  return <Frame {...props} onClick={onOpen} />;
};
