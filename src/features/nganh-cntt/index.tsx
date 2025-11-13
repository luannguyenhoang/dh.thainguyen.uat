"use client";

import { GET_CONG_NGHE_THONG_TIN } from "@/app/api/GraphQl/congNgheThongTin";
import { fetchDataPage } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { defaultDataCntt } from "../../ultil/DefaultData/defaultDataCntt";

const LayoutNganh = dynamic(() =>
  import("@/layouts/layoutNganh").then((mod) => mod.LayoutNganh)
);
const Branch = dynamic(() =>
  import("@/components/Branch").then((mod) => mod.Branch)
);
export const Cntt = () => {
  const [cnttData, setCnttData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataPage(
          GET_CONG_NGHE_THONG_TIN,
          "congNgheThongTin"
        );
        setCnttData(data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const nganhHoc = cnttData?.nganhHocCntt || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[0]?.cot?.text2 ||
      defaultDataCntt.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[1]?.cot?.text2 ||
      defaultDataCntt.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe:
      cnttData?.tuyenSinh?.header?.title || defaultDataCntt.notifyData.tieuDe,
    noiDung:
      cnttData?.tuyenSinh?.header?.text || defaultDataCntt.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child:
          cnttData?.tuyenSinh?.label1?.child ||
          defaultDataCntt.notifyData.tuyenSinh.label1.child
      },
      label2: {
        image:
          cnttData?.tuyenSinh?.label2?.image ||
          defaultDataCntt.notifyData.tuyenSinh.label2.image
      }
    }
  };

  return (
    <LayoutNganh
      title={cnttData?.tieuDe || defaultDataCntt.title}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) ||
          defaultDataCntt.overview
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) ||
          defaultDataCntt.jobs
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
            })) || defaultDataCntt.programList
        }}
      />
    </LayoutNganh>
  );
};
