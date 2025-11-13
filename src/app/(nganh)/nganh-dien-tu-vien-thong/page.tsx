"use client";

import dynamic from "next/dynamic";

const Dtvt = dynamic(() =>
  import("@/features/nganh-dtvt").then((mod) => mod.Dtvt)
);

export default function Page() {
  return <Dtvt />;
}
