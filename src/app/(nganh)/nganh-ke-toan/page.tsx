"use client";

import dynamic from "next/dynamic";

const Kt = dynamic(() => import("@/features/nganh-kt").then((mod) => mod.Kt));

export default function Page() {
  return <Kt />;
}
