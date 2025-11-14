"use client";

import { TextScroll } from "@/components/TextScroll";
import { Box, Skeleton } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

type TextScrollHomePageProps = {
  timelineData?: string[];
};

export const TextScrollHomePage = ({
  timelineData
}: TextScrollHomePageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Tính thời gian đã trôi qua
    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(0, 4000 - elapsed);

    // Đảm bảo skeleton luôn hiển thị đủ 7 giây
    timerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, remaining);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const defaultList = [
    "🎓 Lịch khai giảng tại Hà Nội: 15/10/2023",
    "📚 Lịch khai giảng tại Thái Nguyên: 08/10/2023",
    "📖 Lịch khai giảng tại Hồ Chí Minh: 01/10/2023",
    "📝 Lịch khai giảng tại Đà Nẵng: 09/10/2023",
    "🌟 Học bổng 50% cho sinh viên có thành tích xuất sắc",
    "💼 Cơ hội việc làm tại các doanh nghiệp đối tác",
    "📱 Hỗ trợ học tập trực tuyến 24/7",
    "🎯 Chương trình đào tạo chất lượng cao"
  ];

  const listInf =
    timelineData && timelineData.length > 0 ? timelineData : defaultList;

  if (isLoading) {
    return (
      <Box
        css={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "60px",
          background:
            "linear-gradient(70deg, rgba(246, 137, 32, 1), rgba(252, 89, 52, 1) 100%)",
          overflow: "hidden",
          zIndex: 5,
          alignItems: "center"
        }}
      >
        <Box
          css={{
            display: "flex",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: 0,
            alignItems: "center",
            width: "100%",
            height: "100%",
            whiteSpace: "nowrap",
            animation: "scrollText 15s infinite linear"
          }}
        >
          <Box
            css={{
              display: "flex",
              gap: "24px",
              padding: "0 16px"
            }}
          >
            {[...Array(8)].map((_, index) => (
              <Skeleton
                key={index}
                height="20px"
                width={`${150 + (index % 3) * 50}px`}
                startColor="rgba(255, 255, 255, 0.4)"
                endColor="rgba(255, 255, 255, 0.2)"
                borderRadius="4px"
                flexShrink={0}
              />
            ))}
          </Box>
          <Box
            css={{
              display: "flex",
              gap: "24px",
              padding: "0 16px"
            }}
          >
            {[...Array(8)].map((_, index) => (
              <Skeleton
                key={`duplicate-${index}`}
                height="20px"
                width={`${150 + (index % 3) * 50}px`}
                startColor="rgba(255, 255, 255, 0.4)"
                endColor="rgba(255, 255, 255, 0.2)"
                borderRadius="4px"
                flexShrink={0}
              />
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  return <TextScroll list={listInf} />;
};
