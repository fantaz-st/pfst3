"use client";
import parseHtml from "@/functions/parser";
import { Typography } from "@mui/material";

export default function HeadingBlock({ content = "", level = 2 }) {
  const variant = level >= 1 && level <= 6 ? `h${level}` : "h2";
  return (
    <Typography variant={variant} component={variant}>
      {parseHtml(content)}
    </Typography>
  );
}
