"use client";

import dynamic from "next/dynamic";

const LichKg = dynamic(() =>
  import("@/features/lich-khai-giang").then((mod) => mod.LichKg)
);
export default function Page() {
  return <LichKg />;
}
