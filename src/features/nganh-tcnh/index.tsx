"use client";

import { GET_TAI_CHINH_NGAN_HANG } from "@/app/api/GraphQl/taiChinhNganHang";
import { fetchDataPage } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { defaultDataTcnh } from "../../ultil/DefaultData/defaultDataTcnh";

const LayoutNganh = dynamic(() =>
  import("@/layouts/layoutNganh").then((mod) => mod.LayoutNganh)
);
const Branch = dynamic(() =>
  import("@/components/Branch").then((mod) => mod.Branch)
);

export const Tcnh = () => {
  const [tcnhData, setTcnhData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataPage(
          GET_TAI_CHINH_NGAN_HANG,
          "taiChinhNganHang"
        );
        setTcnhData(data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);
  const nganhHoc = tcnhData?.nganhHocTcnh || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label1?.text2 ||
      defaultDataTcnh.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.text2 ||
      defaultDataTcnh.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe:
      tcnhData?.tuyenSinh?.header?.title || defaultDataTcnh.notifyData.tieuDe,
    noiDung:
      tcnhData?.tuyenSinh?.header?.text || defaultDataTcnh.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child:
          tcnhData?.tuyenSinh?.label1?.child ||
          defaultDataTcnh.notifyData.tuyenSinh.label1.child
      },
      label2: {
        image:
          tcnhData?.tuyenSinh?.label2?.image ||
          defaultDataTcnh.notifyData.tuyenSinh.label2.image
      }
    }
  };

  return (
    <LayoutNganh
      title={tcnhData?.tieuDe || defaultDataTcnh.title}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) ||
          defaultDataTcnh.overview
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) ||
          defaultDataTcnh.jobs
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
            })) || defaultDataTcnh.programList
        }}
      />
    </LayoutNganh>
  );
};
