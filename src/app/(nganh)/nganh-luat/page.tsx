"use client";

import dynamic from "next/dynamic";

const Luat = dynamic(() =>
  import("@/features/nganh-l").then((mod) => mod.Luat)
);

export default function Page() {
  return <Luat />;
}
