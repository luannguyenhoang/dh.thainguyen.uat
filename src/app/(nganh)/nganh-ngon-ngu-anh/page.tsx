"use client";

import dynamic from "next/dynamic";

const Nna = dynamic(() =>
  import("@/features/nganh-nna").then((mod) => mod.Nna)
);

export default function Page() {
  return <Nna />;
}
