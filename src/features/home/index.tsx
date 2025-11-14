"use client";

import { Loading } from "@/components/Loading";
import { useModal } from "@/components/ModalContext";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Banner } from "./Banner";
import { TextScrollHomePage } from "./TextScroll";

const Categorys = dynamic(
  () => import("@/features/home/Categorys").then((mod) => mod.Categorys),
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

const Benefit = dynamic(
  () => import("@/features/home/Benefit").then((mod) => mod.Benefit),
  {
    loading: () => <Loading />
  }
);

const Notify = dynamic(
  () => import("@/features/home/Notify").then((mod) => mod.Notify),
  {
    loading: () => <Loading />
  }
);

const Support = dynamic(
  () => import("@/features/home/Support").then((mod) => mod.Support),
  {
    loading: () => <Loading />
  }
);

const Counters = dynamic(
  () => import("@/features/home/Counters").then((mod) => mod.Counters),
  {
    loading: () => <Loading />
  }
);

const Review = dynamic(
  () => import("@/features/home/Review").then((mod) => mod.Review),
  {
    loading: () => <Loading />
  }
);

const Contact = dynamic(
  () => import("@/features/home/Contact").then((mod) => mod.Contact),
  {
    loading: () => <Loading />
  }
);

const Event = dynamic(
  () => import("@/features/home/Event").then((mod) => mod.Event),
  {
    loading: () => <Loading />,
    ssr: false
  }
);
const ModalBase = dynamic(
  () => import("@/features/home/Modal").then((mod) => mod.ModalBase),
  {
    loading: () => <Loading />,
    ssr: false
  }
);

export const Home = ({
  homeData = {},
  timelineData = [],
  news = [],
  notifis = []
}: {
  homeData?: any;
  timelineData?: string[];
  news?: any[];
  notifis?: any[];
}) => {
  const { setAutoOpen } = useModal();
  const { onOpen, onClose, isOpen } = useModal();
  const timerSetRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5 // Kích hoạt khi 50% của phần tử hiển thị trong viewport
  });
  useEffect(() => {
    if (!timerSetRef.current) {
      const timer = setTimeout(() => {
        onOpen && onOpen();
      }, 10000);

      timerSetRef.current = true;

      return () => {
        setAutoOpen && setAutoOpen(false);
        clearTimeout(timer);
      };
    }
  }, [setAutoOpen, onOpen]);

  useEffect(() => {
    // Kiểm tra xem trongView và isVisible đều là true
    if (inView && !isVisible) {
      setIsVisible(true); // Nếu không thì hiển thị
    }
  }, [inView, isVisible]);
  return (
    <>
      <Banner bannerData={homeData?.banner} />
      <Box>
        <TextScrollHomePage timelineData={timelineData} />
      </Box>
      <Categorys categoryData={homeData?.cacNganhDaoTao} />
      <div ref={ref}>
        {isVisible && (
          <>
            <Benefit benefitData={homeData?.banNhan} />
            <Box py={"62px"}>
              <Notify notifyData={homeData?.thongBao} />
            </Box>
            <Support supportData={homeData?.hoTro} />
            <Counters counterData={homeData?.nhungConSo} />
            <Review reviewData={homeData?.danhGia} />
            <Contact contactData={homeData?.tuyenSinh} />
            <Event news={news} notifis={notifis} />
          </>
        )}
      </div>
      <ModalBase
        isOpen={isOpen || false}
        onOpen={() => onOpen && onOpen()}
        onClose={() => onClose && onClose()}
      >
        <FormWrapper type="form-poup" title="Để lại thông tin" />
      </ModalBase>
    </>
  );
};
