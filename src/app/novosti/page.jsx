import { wpFetch } from "@/lib/wp";
import { ALL_NEWS } from "@/lib/queries";
import FiltersBar from "./components/FiltersBar/FiltersBar";
import ActiveFilters from "./components/ActiveFilters/ActiveFilters";
import PaginationLoadMore from "./components/PaginationLoadMore/PaginationLoadMore";
import EmptyState from "./components/EmptyState/EmptyState";
import { Box, Grid, Typography } from "@mui/material";
import { unstable_noStore as noStore } from "next/cache";

export const revalidate = 300;

export default async function AllNewsPage({ searchParams }) {
  const sp = (await searchParams) || {};

  const q = sp.q || "";
  const cat = sp.cat || "";
  const tag = sp.tag || "";
  const y = sp.y ? parseInt(sp.y, 10) : null;
  const m = sp.m ? parseInt(sp.m, 10) : null;
  const after = sp.after || null;

  const hasFilters = q || cat || tag || y || m || after;
  if (hasFilters) noStore();

  const vars = {
    first: 12,
    after,
    search: q || null,
    category: cat || null,
    tag: tag || null,
    year: y,
    month: m,
    order: "DESC",
  };

  const data = await wpFetch(ALL_NEWS, vars);
  const posts = data?.posts?.nodes || [];
  const pageInfo = data?.posts?.pageInfo || { hasNextPage: false, endCursor: null };
  const categories = data?.categories?.nodes || [];
  const tags = data?.tags?.nodes || [];

  const params = { q, cat, tag, y: sp.y || "", m: sp.m || "" };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Novosti
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <FiltersBar categories={categories} tags={tags} />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <ActiveFilters />
          {posts.length === 0 ? <EmptyState /> : <PaginationLoadMore initialPosts={posts} endCursor={pageInfo.endCursor} hasNextPage={pageInfo.hasNextPage} params={params} />}
        </Grid>
      </Grid>
    </Box>
  );
}
