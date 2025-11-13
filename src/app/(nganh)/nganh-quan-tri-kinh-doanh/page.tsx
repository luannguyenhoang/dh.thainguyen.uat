"use client";

import dynamic from "next/dynamic";

const Qtkd = dynamic(() =>
  import("@/features/nganh-qtkd").then((mod) => mod.Qtkd)
);

export default function Page() {
  return <Qtkd />;
}
