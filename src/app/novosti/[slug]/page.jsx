import { wpFetch } from "@/lib/wp";
import { POST_BY_SLUG } from "@/lib/queries";
import { notFound } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import BlockRenderer from "@/components/BlockRenderer/BlockRenderer";
import Image from "next/image";

export const revalidate = 300;

export default async function Post(props) {
  const { slug } = await props.params;
  const data = await wpFetch(POST_BY_SLUG, { slug });
  const p = data?.post;
  if (!p) return notFound();

  const blocks = Array.isArray(p.blocks) ? p.blocks : typeof p.blocks === "string" ? JSON.parse(p.blocks) : [];

  console.log(p);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {p.title}
      </Typography>
      {p.featuredImage && (
        <Box sx={{ position: "relative", width: "100%", height: { xs: "200px", md: "400px" }, mb: 4 }}>
          <Image
            src={p.featuredImage.node.sourceUrl}
            alt={p.title} /* sizes='100vw'  width={500} height={200} */
            sizes="(min-width: 1480px) 1352px, 93.45vw"
            fill
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="eager"
            /*             layout='responsive'
             */
          />
        </Box>
      )}
      {blocks.map((block, i) => (
        <BlockRenderer block={block} key={block?.clientId || i} />
      ))}
    </Container>
  );
}
