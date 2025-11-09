"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Drawer, Box, IconButton, Typography, Paper, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import classes from "./MobileMenuDrawer.module.css";
import { usePathname } from "next/navigation";
import HeaderLogo from "../../HeaderLogo/HeaderLogo";

const byId = (m = {}) => m.databaseId;
const kids = (m = {}) => m.childNodes || [];
const hasKids = (m) => kids(m).length > 0;

export default function MobileMenuDrawer({ open, onClose, menuItems = [], ctaHref = "/upisi", ctaLabel = "Upisi" }) {
  const pathname = usePathname();
  const [stack, setStack] = useState([{ title: "Izbornik", items: menuItems }]);

  useEffect(() => {
    if (!open) return;
    const walk = (nodes, path) => {
      for (const n of nodes) {
        if (n.uri === pathname) return [n];
        const r = walk(kids(n), path);
        if (r) return [n, ...r];
      }
      return null;
    };
    const chain = walk(menuItems, []);
    if (!chain) {
      setStack([{ title: "Izbornik", items: menuItems }]);
      return;
    }
    const levels = [];
    let current = menuItems;
    levels.push({ title: "Izbornik", items: current });
    chain.forEach((n) => {
      current = kids(n);
      if (current.length) levels.push({ title: n.label, items: current });
    });
    setStack(levels);
  }, [open, pathname, menuItems]);

  /*   useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]); */

  const depth = stack.length;
  const currentLevel = stack[depth - 1];

  const onEnter = (node) => setStack((s) => [...s, { title: node.label, items: kids(node) }]);
  const onBack = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const onNavigate = () => onClose();

  const panels = useMemo(
    () =>
      stack.map((lvl, i) => (
        <Box key={i} className={classes.panel}>
          <Box className={classes.list}>
            {lvl.items.map((n) =>
              hasKids(n) ? (
                <div key={byId(n)} className={classes.row}>
                  <Link href={n.uri} className={classes.rowLink} onClick={onNavigate}>
                    <span className={classes.rowLabel}>{n.label}</span>
                  </Link>
                  <Button variant="outlined" onClick={() => onEnter(n)} aria-label="Otvori podizbornik">
                    <ChevronRightIcon fontSize="small" />
                  </Button>
                </div>
              ) : (
                <Link key={byId(n)} href={n.uri} className={classes.rowLink} onClick={onNavigate}>
                  <span className={classes.rowLabel}>{n.label}</span>
                </Link>
              )
            )}
          </Box>
        </Box>
      )),
    [stack]
  );

  return (
    <Drawer open={open} onClose={onClose} anchor="right" ModalProps={{ keepMounted: true }} slotProps={{ paper: { className: classes.paper } }}>
      <Box className={classes.wrap}>
        <Box className={classes.top}>
          <HeaderLogo />
          <Box className={classes.topRight}>
            {depth > 1 && (
              <IconButton aria-label="Natrag" onClick={onBack} className={classes.backBtn}>
                <ArrowBackIosNewIcon />
              </IconButton>
            )}
            <IconButton aria-label="Zatvori" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <Box className={classes.titleBar}>
          <Typography variant="h6" className={classes.title}>
            {currentLevel?.title || "Izbornik"}
          </Typography>
        </Box>

        <Box className={classes.viewport}>
          <Box className={classes.track} style={{ transform: `translateX(-${(depth - 1) * 100}%)` }}>
            {panels}
          </Box>
        </Box>

        <Box className={classes.bottom}>
          <Link href={ctaHref} onClick={onNavigate} className={classes.cta}>
            {ctaLabel}
          </Link>
          <Box className={classes.langs}>
            <Link href="/en" onClick={onNavigate}>
              EN
            </Link>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
