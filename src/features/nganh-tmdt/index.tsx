"use client";

import { GET_THUONG_MAI_DIEN_TU_VA_MARKETING_SO } from "@/app/api/GraphQl/thuongMaiDienTuVaMarketingSo";
import { fetchDataPage } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { defaultDataTmdt } from "../../ultil/DefaultData/defaultDataTmdt";

const LayoutNganh = dynamic(() =>
  import("@/layouts/layoutNganh").then((mod) => mod.LayoutNganh)
);
const Branch = dynamic(() =>
  import("@/components/Branch").then((mod) => mod.Branch)
);

export const Tmdt = () => {
  const [tmdtData, setTmdtData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataPage(
          GET_THUONG_MAI_DIEN_TU_VA_MARKETING_SO,
          "thuongMaiDienTu"
        );
        setTmdtData(data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const nganhHoc = tmdtData?.nganhHocCntt || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label1?.cot?.text2 ||
      defaultDataTmdt.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.cot?.text2 ||
      defaultDataTmdt.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe:
      tmdtData?.tuyenSinh?.header?.title || defaultDataTmdt.notifyData.tieuDe,
    noiDung:
      tmdtData?.tuyenSinh?.header?.text || defaultDataTmdt.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child:
          tmdtData?.tuyenSinh?.label1?.child ||
          defaultDataTmdt.notifyData.tuyenSinh.label1.child
      },
      label2: {
        image:
          tmdtData?.tuyenSinh?.label2?.image ||
          defaultDataTmdt.notifyData.tuyenSinh.label2.image
      }
    }
  };

  return (
    <LayoutNganh
      title={tmdtData?.tieuDe || defaultDataTmdt.title}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title || defaultDataTmdt.name}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) ||
          defaultDataTmdt.overview
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) ||
          defaultDataTmdt.jobs
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
            })) || defaultDataTmdt.programList
        }}
      />
    </LayoutNganh>
  );
};
