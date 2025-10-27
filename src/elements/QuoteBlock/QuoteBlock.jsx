"use client";
import { Typography, Box } from "@mui/material";
import classes from "./QuoteBlock.module.css";
import parseHtml from "@/functions/parser";

export default function QuoteBlock({ html }) {
  return (
    <Box className={classes.quote}>
      <Typography component="div" variant="h6">
        {parseHtml(html || "")}
      </Typography>
    </Box>
  );
}
