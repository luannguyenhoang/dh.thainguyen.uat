"use client";

import { GET_LICH_KHAI_GIANG } from "@/app/api/GraphQl/lichKhaiGiang";
import { Loading } from "@/components/Loading";
import { fetchDataPage } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FrameWrapper = dynamic(
  () => import("@/components/FrameWrapper").then((mod) => mod.FrameWrapper),
  {
    loading: () => <Loading />
  }
);
const LayoutNganh = dynamic(() =>
  import("@/layouts/layoutNganh").then((mod) => mod.LayoutNganh)
);

export const revalidate = 20;

export const LichKg = () => {
  const [lichData, setLichData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataPage(GET_LICH_KHAI_GIANG, "lichKhaiGiang");
        setLichData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  let labelList: string[] = [];
  if (lichData?.section1?.label) {
    const label = lichData.section1.label;
    const lines = label.split(/\r?\n/);
    labelList = lines.filter((line: string) => line.trim() !== "");
  }

  return (
    <LayoutNganh
      title="Lịch khai giảng Đại học Thái Nguyên - E learning"
      data={lichData?.thongBao}
    >
      <FrameWrapper
        title1={lichData?.section1?.title}
        list1={labelList}
        label="Đăng ký tư vấn"
      />
    </LayoutNganh>
  );
};
