"use client";
import { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import NewsList from "../NewsList/NewsList";

export default function PaginationLoadMore({ initialPosts, endCursor, hasNextPage, params }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [cursor, setCursor] = useState(endCursor || null);
  const [hasMore, setHasMore] = useState(!!hasNextPage);
  const [loading, setLoading] = useState(false);

  const baseQs = useMemo(() => {
    const p = new URLSearchParams();
    if (params.q) p.set("q", params.q);
    if (params.cat) p.set("cat", params.cat);
    if (params.tag) p.set("tag", params.tag);
    if (params.y) p.set("y", params.y);
    if (params.m) p.set("m", params.m);
    if (params.sort) p.set("sort", params.sort);
    return p;
  }, [params]);

  const loadMore = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    const qs = new URLSearchParams(baseQs);
    if (cursor) qs.set("after", cursor);
    const res = await fetch(`/api/news?${qs.toString()}`, { cache: "no-store" });
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const json = await res.json();
    const nextNodes = Array.isArray(json?.nodes) ? json.nodes : [];
    const nextInfo = json?.pageInfo || {};
    const seen = new Set(posts.map((p) => p.id));
    const merged = [...posts, ...nextNodes.filter((p) => !seen.has(p.id))];
    setPosts(merged);
    setCursor(nextInfo.endCursor || null);
    setHasMore(!!nextInfo.hasNextPage);
    setLoading(false);
  };

  return (
    <>
      <NewsList posts={posts} />
      {hasMore && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button onClick={loadMore} disabled={loading} variant="outlined">
            {loading ? "Učitavanje..." : "Učitaj još"}
          </Button>
        </Box>
      )}
    </>
  );
}
