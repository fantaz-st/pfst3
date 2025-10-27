"use client";
import { Typography, Box } from "@mui/material";
import ListBlock from "../ListBlock/ListBlock";
import parseHtml from "@/functions/parser";

export default function ListItemBlock({ block }) {
  const { attributes = {}, innerBlocks = [] } = block || {};
  return (
    <Box>
      <Typography variant="body1" component="span">
        {parseHtml(attributes?.content || "")}
      </Typography>
      {innerBlocks?.length ? innerBlocks.filter((ib) => ib?.name === "core/list").map((ib, i) => <ListBlock key={ib?.clientId || i} block={ib} />) : null}
    </Box>
  );
}
