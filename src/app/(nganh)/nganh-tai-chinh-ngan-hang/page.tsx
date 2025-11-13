"use client";

import dynamic from "next/dynamic";

const Tcnh = dynamic(() =>
  import("@/features/nganh-tcnh").then((mod) => mod.Tcnh)
);

export default function Page() {
  return <Tcnh />;
}
