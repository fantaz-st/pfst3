"use client";
import { List, ListItem } from "@mui/material";
import ListItemBlock from "@/elements/ListItemBlock/ListItemBlock";

export default function ListBlock({ block }) {
  const { dynamicContent = "", attributes = {}, innerBlocks = [] } = block || {};
  const ordered = attributes?.ordered ?? /^\s*<ol/i.test(dynamicContent);
  const marker = attributes?.type || (ordered ? "decimal" : "disc");
  return (
    <List component={ordered ? "ol" : "ul"} sx={{ listStyleType: marker, pl: 3 }}>
      {innerBlocks.map((b, i) => (
        <ListItem key={b?.clientId || i} sx={{ display: "list-item", pl: 1.5 }}>
          <ListItemBlock block={b} />
        </ListItem>
      ))}
    </List>
  );
}
