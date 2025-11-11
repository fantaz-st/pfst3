import { Box, Typography } from "@mui/material";
import NewsCard from "../NewsCard/NewsCard";

export default function NewsList({ posts }) {
  if (!posts?.length) return null;
  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {posts.map((p) => (
        <Box key={p.id} sx={{ borderBottom: "1px solid #eee", pb: 2 }}>
          <NewsCard p={p} />
        </Box>
      ))}
    </Box>
  );
}
