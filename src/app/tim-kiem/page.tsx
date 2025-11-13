import { Search } from "@/features/search";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tin tức và thông báo tuyển sinh - Đại học Thái Nguyên",
  description:
    "Đại học Thái Nguyên - tổng hợp các tin tức tuyển sinh mới nhất của Đại học Thái Nguyên"
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Đang tải dữ liệu tìm kiếm...</div>}>
      <Search />
    </Suspense>
  );
}
