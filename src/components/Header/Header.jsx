"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AppBar, Toolbar, IconButton, Drawer, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import classes from "./Header.module.css";
import HeaderLogo from "./HeaderLogo/HeaderLogo";

export default function Header({ menuItems }) {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const headerH = useRef(100);
  const lastY = useRef(0);
  const raf = useRef(false);
  const appBarRef = useRef(null);

  useLayoutEffect(() => {
    if (appBarRef.current) headerH.current = appBarRef.current.offsetHeight || 100;
    const onResize = () => {
      if (appBarRef.current) headerH.current = appBarRef.current.offsetHeight || 100;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY || 0;
    const onScroll = () => {
      if (raf.current) return;
      raf.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const dy = y - lastY.current;
        let next = offset;
        if (dy > 0) next = Math.min(headerH.current, next + dy);
        else if (dy < 0) next = Math.max(0, next + dy);
        if (y <= 0) next = 0;
        if (next !== offset) setOffset(next);
        lastY.current = y;
        raf.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return (
    <>
      <Box>
        <AppBar ref={appBarRef} elevation={0} color="transparent" className={classes.header} style={{ transform: `translateY(${-offset}px)` }}>
          <Toolbar className={classes.toolbar} disableGutters>
            <Box className={classes.bar}>
              <Box className={classes.left}>
                <HeaderLogo />
                <HeaderMenu menuItems={menuItems || []} variant="horizontal" />
              </Box>
              <Box className={classes.right}>
                <Box className={classes.lang}>
                  <Link href="/en">EN</Link>
                </Box>

                <Box className={classes.burger}>
                  <IconButton edge="end" aria-label="menu" onClick={() => setOpen(true)}>
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box className={classes.spacer} />

      <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
        <Box className={classes.drawerWrap}>
          <Box className={classes.drawerLogo}>
            <HeaderLogo />
            <IconButton onClick={() => setOpen(false)} aria-label="close">
              <MenuIcon />
            </IconButton>
          </Box>
          <HeaderMenu menuItems={menuItems || []} variant="horizontal" />
          <Link href="/upisi" onClick={() => setOpen(false)} className={classes.drawerCta}>
            Upisi
          </Link>
        </Box>
      </Drawer>
    </>
  );
}
