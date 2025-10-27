"use client";
import parseHtml from "@/functions/parser";
import { Stack, Button, Typography, Link as MLink } from "@mui/material";

export default function FileBlock({ href, title, size, html, attributes }) {
  if (html && !href) return <>{parseHtml(html)}</>;
  const url = href || "";
  const label = `${title} ${size}` || "Download " + " " + size;
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button component={MLink} href={url} target="_blank" rel="noopener" variant="contained">
        {label}
      </Button>
      {size ? (
        <Typography variant="body2" color="text.secondary">
          {size}
        </Typography>
      ) : null}
    </Stack>
  );
}
