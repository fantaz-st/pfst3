import Link from "next/link";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const fmt = (iso) => new Date(iso).toLocaleDateString("hr-HR", { year: "numeric", month: "long", day: "numeric" });

export default function NewsCard({ p }) {
  const img = p?.featuredImage?.node;
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "180px 1fr" }, gap: 2, py: 2 }}>
      <Box sx={{ position: "relative", width: "100%", height: { xs: 180, sm: 110 }, bgcolor: "#f5f5f5" }}>{img?.sourceUrl && <Image src={img.sourceUrl} alt={img.altText || p.title} fill sizes="(max-width:600px) 100vw, 180px" style={{ objectFit: "cover" }} />}</Box>
      <Box>
        <Link href={`/novosti/${p.slug}`}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {p.title}
          </Typography>
        </Link>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", fontSize: 12, opacity: 0.8, mb: 1 }}>
          <span>{fmt(p.date)}</span>
          {p.categories?.nodes?.map((c) => (
            <Link key={c.slug} href={{ pathname: "/novosti", query: { cat: c.slug } }}>
              {c.name}
            </Link>
          ))}
        </Box>
        <div dangerouslySetInnerHTML={{ __html: p.excerpt }} />
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
          {p.tags?.nodes?.map((t) => (
            <Link key={t.slug} href={{ pathname: "/novosti", query: { tag: t.slug } }}>
              #{t.name}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
