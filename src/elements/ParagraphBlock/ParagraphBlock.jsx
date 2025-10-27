"use client";
import parseHtml from "@/functions/parser";
import { Typography } from "@mui/material";

export default function ParagraphBlock({ content = "", align }) {
  return (
    <Typography variant="body1" sx={{ textAlign: align || "inherit" }} mt={2}>
      {parseHtml(content)}
    </Typography>
  );
}
