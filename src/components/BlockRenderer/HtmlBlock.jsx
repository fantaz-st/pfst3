"use client";
import parseHtml from "@/functions/parser";
import { Box } from "@mui/material";

export default function HtmlBlock({ html, sx }) {
  if (!html) return null;
  return <Box sx={sx}>{parseHtml(html)}</Box>;
}
