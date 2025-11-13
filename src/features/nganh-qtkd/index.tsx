"use client";

import { GET_QUAN_TRI_KINH_DOANH } from "@/app/api/GraphQl/quanTriKinhDoanh";
import { fetchDataPage } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { defaultDataQtkd } from "../../ultil/DefaultData/defaultDataQtkd";

const LayoutNganh = dynamic(() =>
  import("@/layouts/layoutNganh").then((mod) => mod.LayoutNganh)
);
const Branch = dynamic(() =>
  import("@/components/Branch").then((mod) => mod.Branch)
);

export const Qtkd = () => {
  const [qtkdData, setQtkdData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataPage(
          GET_QUAN_TRI_KINH_DOANH,
          "quanTriKinhDoanh"
        );
        setQtkdData(data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const nganhHoc = qtkdData?.nganhHocQtkd || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[0]?.text2 ||
      defaultDataQtkd.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[1]?.text2 ||
      defaultDataQtkd.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe:
      qtkdData?.tuyenSinh?.header?.title || defaultDataQtkd.notifyData.tieuDe,
    noiDung:
      qtkdData?.tuyenSinh?.header?.text || defaultDataQtkd.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child:
          qtkdData?.tuyenSinh?.label1?.child ||
          defaultDataQtkd.notifyData.tuyenSinh.label1.child
      },
      label2: {
        image:
          qtkdData?.tuyenSinh?.label2?.image ||
          defaultDataQtkd.notifyData.tuyenSinh.label2.image
      }
    }
  };

  return (
    <LayoutNganh
      title={qtkdData?.tieuDe || defaultDataQtkd.title}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) ||
          defaultDataQtkd.overview
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) ||
          defaultDataQtkd.jobs
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
            })) || defaultDataQtkd.programList
        }}
      />
    </LayoutNganh>
  );
};
