"use client";

import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export function Announcement() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <div className="h-10 flex items-center justify-center bg-asfalto text-calce text-[12px] font-medium px-4">
      {site.announcement}
    </div>
  );
}
