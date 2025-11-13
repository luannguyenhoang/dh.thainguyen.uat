"use client";

import dynamic from "next/dynamic";

const Cntt = dynamic(() =>
  import("@/features/nganh-cntt").then((mod) => mod.Cntt)
);

export default function Page() {
  return <Cntt />;
}
