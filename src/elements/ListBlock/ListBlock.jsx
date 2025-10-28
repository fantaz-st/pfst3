"use client";
import { List, ListItem } from "@mui/material";
import ListItemBlock from "@/elements/ListItemBlock/ListItemBlock";
import classes from "./ListBlock.module.css";

export default function ListBlock({ block }) {
  const { dynamicContent = "", attributes = {}, innerBlocks = [] } = block || {};
  const ordered = attributes?.ordered ?? /^\s*<ol/i.test(dynamicContent);
  const marker = attributes?.type || (ordered ? "decimal" : "disc");
  return (
    <List component={ordered ? "ol" : "ul"} sx={{ listStyleType: marker, pl: 3 }} className={classes.list}>
      {innerBlocks.map((b, i) => (
        <ListItem key={b?.clientId || i} sx={{ display: "list-item", pl: 1.5 }} className={classes.listItem}>
          <ListItemBlock block={b} />
        </ListItem>
      ))}
    </List>
  );
}
