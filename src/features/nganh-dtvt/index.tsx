"use client";

import { GET_DIEN_TU_VIEN_THONG } from "@/app/api/GraphQl/dienTuVienThong";
import { fetchDataPage } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { defaultDataDtvt } from "../../ultil/DefaultData/defaultDataDtvt";

const LayoutNganh = dynamic(() =>
  import("@/layouts/layoutNganh").then((mod) => mod.LayoutNganh)
);
const Branch = dynamic(() =>
  import("@/components/Branch").then((mod) => mod.Branch)
);
export const Dtvt = () => {
  const [dtvtData, setDtvtData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataPage(
          GET_DIEN_TU_VIEN_THONG,
          "dienTuVienThong"
        );
        setDtvtData(data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const nganhHoc = dtvtData?.nganhHocDtvt || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[0]?.cot?.text2 ||
      defaultDataDtvt.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[1]?.cot?.text2 ||
      defaultDataDtvt.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe:
      dtvtData?.tuyenSinh?.header?.title || defaultDataDtvt.notifyData.tieuDe,
    noiDung:
      dtvtData?.tuyenSinh?.header?.text || defaultDataDtvt.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child:
          dtvtData?.tuyenSinh?.label1?.child ||
          defaultDataDtvt.notifyData.tuyenSinh.label1.child
      },
      label2: {
        image:
          dtvtData?.tuyenSinh?.label2?.image ||
          defaultDataDtvt.notifyData.tuyenSinh.label2.image
      }
    }
  };

  return (
    <LayoutNganh
      title={dtvtData?.tieuDe || defaultDataDtvt.title}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) ||
          defaultDataDtvt.overview
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) ||
          defaultDataDtvt.jobs
        }
        program={{
          credits,
          subjects,
          tongQuan: nganhHoc?.tongQuan,
          ngheNghiep: nganhHoc?.ngheNghiep,
          chuongTrinhVaThoiGianDaoTao: nganhHoc?.chuongTrinhVaThoiGianDaoTao,
          list:
            nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.map((item: any) => ({
              title: item.text1 || "",
              content: item.text2 || ""
            })) || defaultDataDtvt.programList
        }}
      />
    </LayoutNganh>
  );
};
