"use client";

import { GET_NGON_NGU_TRUNG } from "@/app/api/GraphQl/ngonNguTrung";
import { fetchDataPage } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { defaultDataNnt } from "../../ultil/DefaultData/defaultDataNnt";

const LayoutNganh = dynamic(() =>
  import("@/layouts/layoutNganh").then((mod) => mod.LayoutNganh)
);
const FrameWrapper = dynamic(() =>
  import("@/components/FrameWrapper").then((mod) => mod.FrameWrapper)
);

export const Nnt = () => {
  const [nntData, setNntData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataPage(GET_NGON_NGU_TRUNG, "ngonNguTrung");
        setNntData(data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const ngonNguTrung = nntData?.ngonNguTrung || {};

  const list1 =
    ngonNguTrung?.list1?.content?.map((item: any) => item.text) ||
    defaultDataNnt.tongQuan.list;

  const list2 =
    ngonNguTrung?.list2?.content?.map((item: any) => item.text) ||
    defaultDataNnt.ngheNghiep.list;

  const notifyData = {
    tieuDe:
      nntData?.tuyenSinh?.header?.title || defaultDataNnt.notifyData.tieuDe,
    noiDung:
      nntData?.tuyenSinh?.header?.text || defaultDataNnt.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child:
          nntData?.tuyenSinh?.label1?.child ||
          defaultDataNnt.notifyData.tuyenSinh.label1.child
      },
      label2: {
        image:
          nntData?.tuyenSinh?.label2?.image ||
          defaultDataNnt.notifyData.tuyenSinh.label2.image
      }
    }
  };

  return (
    <LayoutNganh
      title={nntData?.tieuDe || defaultDataNnt.title}
      data={notifyData}
    >
      <FrameWrapper
        title1={ngonNguTrung?.list1?.title || defaultDataNnt.tongQuan.title}
        list1={list1}
        title2={ngonNguTrung?.list2?.title || defaultDataNnt.ngheNghiep.title}
        list2={list2}
        label="Đăng ký tư vấn"
      />
    </LayoutNganh>
  );
};
