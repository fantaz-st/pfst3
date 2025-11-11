"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Chip, Button } from "@mui/material";

export default function ActiveFilters() {
  const router = useRouter();
  const sp = useSearchParams();
  const entries = ["q", "cat", "tag", "y", "m", "sort"].map((k) => [k, sp.get(k)]).filter(([, v]) => v);

  const clearOne = (k) => {
    const p = new URLSearchParams(sp.toString());
    p.delete(k);
    p.delete("after");
    router.push(`/novosti?${p.toString()}`);
  };
  const clearAll = () => router.push("/novosti");

  if (!entries.length) return null;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
      {entries.map(([k, v]) => (
        <Chip key={k} label={`${k}: ${v}`} onDelete={() => clearOne(k)} />
      ))}
      <Button size="small" onClick={clearAll}>
        Očisti sve
      </Button>
    </Box>
  );
}
