"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AppBar, Toolbar, IconButton, Drawer, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import classes from "./Header.module.css";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import MobileMenuDrawer from "./HeaderMenu/MobileMenuDrawer/MobileMenuDrawer";

export default function Header({ menuItems }) {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [spacerH, setSpacerH] = useState(72);

  const headerH = useRef(100);
  const lastY = useRef(0);
  const offRef = useRef(0);
  const ticking = useRef(false);
  const appBarRef = useRef(null);
  const drawerId = "main-nav-drawer";

  useLayoutEffect(() => {
    if (appBarRef.current) {
      headerH.current = appBarRef.current.offsetHeight || 100;
      setSpacerH(headerH.current);
    }
    const ro = new ResizeObserver(() => {
      if (!appBarRef.current) return;
      headerH.current = appBarRef.current.offsetHeight || 100;
      setSpacerH(headerH.current);
    });
    if (appBarRef.current) ro.observe(appBarRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY || 0;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const dy = y - lastY.current;
        let next = offRef.current;
        if (dy > 0) next = Math.min(headerH.current, next + dy);
        else if (dy < 0) next = Math.max(0, next + dy);
        if (y <= 0) next = 0;
        if (next !== offRef.current) {
          offRef.current = next;
          setOffset(next);
        }
        setScrolled(y > 1);
        lastY.current = y;
        ticking.current = false;
      });
    };
    const onResize = () => {
      if (!appBarRef.current) return;
      headerH.current = appBarRef.current.offsetHeight || 100;
      setSpacerH(headerH.current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <Box>
        <AppBar ref={appBarRef} elevation={0} color="transparent" className={`${classes.header} ${scrolled ? classes.scrolled : ""}`} style={{ transform: `translateY(${-offset}px)` }}>
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
                  <IconButton edge="end" aria-label="Open menu" aria-controls={drawerId} aria-expanded={open ? "true" : "false"} onClick={() => setOpen(true)}>
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box className={classes.spacer} style={{ minHeight: spacerH }} />

      <MobileMenuDrawer open={open} onClose={() => setOpen(false)} menuItems={menuItems || []} />
    </>
  );
}
