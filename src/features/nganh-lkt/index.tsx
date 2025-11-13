"use client";

import { GET_LUAT_KING_TE } from "@/app/api/GraphQl/luatKingTe";
import { fetchDataPage } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { defaultDataLkt } from "../../ultil/DefaultData/defaultDataLkt";

const LayoutNganh = dynamic(() =>
  import("@/layouts/layoutNganh").then((mod) => mod.LayoutNganh)
);
const Branch = dynamic(() =>
  import("@/components/Branch").then((mod) => mod.Branch)
);

export const Lkt = () => {
  const [lktData, setLktData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataPage(GET_LUAT_KING_TE, "luatKinhTe");
        setLktData(data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);
  const nganhHoc = lktData?.nganhHocCntt || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label1?.cot?.text2 ||
      defaultDataLkt.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.cot?.text2 ||
      defaultDataLkt.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe:
      lktData?.tuyenSinh?.header?.title || defaultDataLkt.notifyData.tieuDe,
    noiDung:
      lktData?.tuyenSinh?.header?.text || defaultDataLkt.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child:
          lktData?.tuyenSinh?.label1?.child ||
          defaultDataLkt.notifyData.tuyenSinh.label1.child
      },
      label2: {
        image:
          lktData?.tuyenSinh?.label2?.image ||
          defaultDataLkt.notifyData.tuyenSinh.label2.image
      }
    }
  };

  return (
    <LayoutNganh
      title={lktData?.tieuDe || defaultDataLkt.title}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title || defaultDataLkt.name}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) ||
          defaultDataLkt.overview
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) ||
          defaultDataLkt.jobs
        }
        program={{
          credits,
          subjects,
          tongQuan: nganhHoc?.tongQuan,
          ngheNghiep: nganhHoc?.ngheNghiep,
          chuongTrinhVaThoiGianDaoTao: nganhHoc?.chuongTrinhVaThoiGianDaoTao,
          list:
            nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.map((item: any) => ({
              title: item.cot.text1 || "",
              content: item.cot.text2 || ""
            })) || defaultDataLkt.programList
        }}
      />
    </LayoutNganh>
  );
};
