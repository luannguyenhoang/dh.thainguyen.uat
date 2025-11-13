"use client";

import { GET_NGON_NGU_ANH } from "@/app/api/GraphQl/ngonNguAnh";
import { fetchDataPage } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { defaultDataNna } from "../../ultil/DefaultData/defaultDataNna";

const LayoutNganh = dynamic(() =>
  import("@/layouts/layoutNganh").then((mod) => mod.LayoutNganh)
);
const FrameWrapper = dynamic(() =>
  import("@/components/FrameWrapper").then((mod) => mod.FrameWrapper)
);

export const Nna = () => {
  const [nnaData, setNnaData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataPage(GET_NGON_NGU_ANH, "ngonNguAnh");
        setNnaData(data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);
  const ngonNguAnh = nnaData?.ngonNguAnh || {};

  const list1 =
    ngonNguAnh?.list1?.content?.map((item: any) => item.text) ||
    defaultDataNna.tongQuan.list;

  const list2 =
    ngonNguAnh?.list2?.content?.map((item: any) => item.text) ||
    defaultDataNna.ngheNghiep.list;

  const notifyData = {
    tieuDe:
      nnaData?.tuyenSinh?.header?.title || defaultDataNna.notifyData.tieuDe,
    noiDung:
      nnaData?.tuyenSinh?.header?.text || defaultDataNna.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child:
          nnaData?.tuyenSinh?.label1?.child ||
          defaultDataNna.notifyData.tuyenSinh.label1.child
      },
      label2: {
        image:
          nnaData?.tuyenSinh?.label2?.image ||
          defaultDataNna.notifyData.tuyenSinh.label2.image
      }
    }
  };

  return (
    <LayoutNganh
      title={nnaData?.tieuDe || defaultDataNna.title}
      data={notifyData}
    >
      <FrameWrapper
        title1={ngonNguAnh?.list1?.title || defaultDataNna.tongQuan.title}
        list1={list1}
        title2={ngonNguAnh?.list2?.title || defaultDataNna.ngheNghiep.title}
        list2={list2}
        label="Đăng ký tư vấn"
      />
    </LayoutNganh>
  );
};
