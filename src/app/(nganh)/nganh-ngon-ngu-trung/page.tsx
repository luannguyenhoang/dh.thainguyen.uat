"use client";

import dynamic from "next/dynamic";

const Nnt = dynamic(() =>
  import("@/features/nganh-nnt").then((mod) => mod.Nnt)
);

export default function Page() {
  return <Nnt />;
}
