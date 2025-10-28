"use client";

import Link from "next/link";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Collapse, Box, List, ListItem, Typography, IconButton } from "@mui/material";
import classes from "./SideMenu.module.css";

const hasChildren = (node) => Array.isArray(node?.childNodes) && node.childNodes.length > 0;
const trimSlash = (s = "") => (s.endsWith("/") && s !== "/" ? s.slice(0, -1) : s);

const MenuItem = ({ item, pathname }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} pathname={pathname} />;
};

const SingleLevel = ({ item, pathname }) => {
  const itemHref = item.uri || "/";
  const isActive = trimSlash(pathname) === trimSlash(itemHref);

  return (
    <ListItem disableGutters className={classes.item}>
      <Box component={Link} href={itemHref} className={`${classes.link} ${isActive ? classes.linkActive : ""}`}>
        <Typography variant="body2" className={classes.label}>
          {item.label}
        </Typography>
      </Box>
    </ListItem>
  );
};

const MultiLevel = ({ item, pathname }) => {
  const itemHref = item.uri || "/";
  const children = item.childNodes || [];

  const isPathActive = useMemo(() => {
    const cur = trimSlash(pathname);
    const base = trimSlash(itemHref);
    return cur === base || cur.startsWith(base + "/");
  }, [pathname, itemHref]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isPathActive);
  }, [isPathActive]);

  const toggle = () => setOpen((p) => !p);

  return (
    <>
      <ListItem disableGutters className={classes.item}>
        <Box className={classes.row}>
          <Box component={Link} href={itemHref} className={`${classes.link} ${open ? classes.linkActive : ""}`}>
            <Typography variant="body2" className={classes.label}>
              {item.label}
            </Typography>
          </Box>

          <IconButton className={classes.caretBtn} onClick={toggle} aria-label={open ? "Collapse section" : "Expand section"} aria-expanded={open} size="small">
            {open ? <ExpandLess className={classes.caretIcon} /> : <ExpandMore className={classes.caretIcon} />}
          </IconButton>
        </Box>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit className={classes.collapse}>
        <List component="div" disablePadding className={classes.nestedList}>
          {children.map((child, i) => (
            <MenuItem key={child?.id || child?.uri || i} item={child} pathname={pathname} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default function SideMenu({ menuItems = [] }) {
  const pathname = usePathname();
  return (
    <List className={classes.menu}>
      {menuItems.map((item, i) => (
        <MenuItem key={item?.id || item?.uri || i} item={item} pathname={pathname} />
      ))}
    </List>
  );
}
