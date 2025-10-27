import { wpFetch } from "@/lib/wp";
import { PAGE_BY_PATH } from "@/lib/queries";
import { notFound } from "next/navigation";
import { Container, Typography, List, ListItem, Link as MUILink } from "@mui/material";
import BlockRenderer from "@/components/BlockRenderer/BlockRenderer";

export const revalidate = 300;

export default async function WpPage(props) {
  const { slug } = await props.params;
  const segments = Array.isArray(slug) ? slug : [slug].filter(Boolean);
  const path = `/${segments.join("/")}/`;

  const data = await wpFetch(PAGE_BY_PATH, { path });
  const page = data?.page;
  if (!page) return notFound();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {page.title}
      </Typography>
      {page.blocks && page.blocks.map((block, i) => <BlockRenderer block={block} key={i} />)}
    </Container>
  );
}
