"use client";

import useFancybox from "@/hooks/useFancybox";

export default function FancyboxScope({ children }) {
  const [setRef] = useFancybox({ Thumbs: { autoStart: true } });
  return <div ref={setRef}>{children}</div>;
}
