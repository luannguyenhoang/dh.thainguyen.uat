"use client";

import dynamic from "next/dynamic";

const Tmdt = dynamic(() =>
  import("@/features/nganh-tmdt").then((mod) => mod.Tmdt)
);

export default function Page() {
  return <Tmdt />;
}
