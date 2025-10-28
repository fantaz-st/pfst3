import { PAGE_BY_PATH } from "@/lib/queries";
import { Box, Container, Grid } from "@mui/material";
import { notFound } from "next/navigation";

import { wpFetch } from "@/lib/wp";
import BlockRenderer from "@/components/BlockRenderer/BlockRenderer";
import SubPageLink from "@/elements/SubPageLink/SubPageLink";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";

export const revalidate = 300;

export default async function WpPage(props) {
  const { slug } = await props.params;
  const segments = Array.isArray(slug) ? slug : [slug].filter(Boolean);
  const path = `/${segments.join("/")}/`;

  const pageData = await wpFetch(PAGE_BY_PATH, { path });
  const page = pageData?.page;
  if (!page) return notFound();

  return (
    <Container
      // maxWidth={"xxxl"}
      sx={{
        padding: "0",
        // paddingRight: { md: "4rem" },
        margin: { xs: "0 auto 1rem", md: "3rem auto" },
      }}
    >
      <BreadCrumbs data={pageData} />
      <Box sx={{ borderBottom: "1px solid", marginBottom: "2rem", marginTop: "0.5rem" }} />

      {pageData?.page?.blocks?.map((block, i) => {
        return <BlockRenderer block={block} key={i} />;
      })}
      {pageData?.page?.children?.nodes.length > 0 && (
        <Grid container spacing={3}>
          {pageData?.page?.children?.nodes.map((childPage, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} style={{ width: "100%" }} key={childPage.id}>
              <SubPageLink subpage={{ link: childPage.uri, name: childPage.title }} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
