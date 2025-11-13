"use client";

import dynamic from "next/dynamic";

const Lkt = dynamic(() =>
  import("@/features/nganh-lkt").then((mod) => mod.Lkt)
);

export default function Page() {
  return <Lkt />;
}
