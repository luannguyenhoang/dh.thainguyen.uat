"use client";

import { CTA } from "@/layouts/components/Cta";

export const ClientCTAWrapper = ({ ctaData }: { ctaData?: any }) => {
  // Render CTA trực tiếp với suppressHydrationWarning để tránh mismatch
  // Popover trong BtnEmail đã có useId() để đảm bảo stable ID
  return (
    <div suppressHydrationWarning>
      <CTA ctaData={ctaData} />
    </div>
  );
};
