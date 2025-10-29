"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AppBar, Toolbar, IconButton, Drawer, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import classes from "./Header.module.css";
import HeaderLogo from "./HeaderLogo/HeaderLogo";

const MENU = [
  { href: "/rafmagn", label: "Rafmagn" },
  { href: "/hles", label: "Hleđslustöðvar" },
  { href: "/odrzivost", label: "Održivost" },
  { href: "/projekti", label: "Projekti" },
  { href: "/o-nama", label: "O nama" },
  { href: "/novosti", label: "Novosti" },
];

export default function Header({ menuItems }) {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const headerH = useRef(72);
  const lastY = useRef(0);
  const raf = useRef(false);
  const appBarRef = useRef(null);

  useLayoutEffect(() => {
    if (appBarRef.current) headerH.current = appBarRef.current.offsetHeight || 72;
    const onResize = () => {
      if (appBarRef.current) headerH.current = appBarRef.current.offsetHeight || 72;
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
          <Toolbar className={classes.toolbar}>
            <div className={classes.bar}>
              <HeaderLogo />
              <div className={classes.center}>
                <HeaderMenu menuItems={menuItems || []} variant="horizontal" />
              </div>
              <div className={classes.right}>
                <Link href="/en" className={classes.lang}>
                  EN
                </Link>
                <Link href="/moje-stranice" className={classes.account}>
                  <PersonOutlineIcon fontSize="small" style={{ marginRight: 8 }} />
                  Moje stranice
                </Link>
                <Link href="/upisi" className={classes.cta}>
                  Upisi
                </Link>
                <IconButton className={classes.burger} edge="end" aria-label="menu" onClick={() => setOpen(true)}>
                  <MenuIcon />
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <div className={classes.spacer} />

      <Drawer open={open} onClose={() => setOpen(false)} anchor="right" PaperProps={{ className: classes.drawerPaper }}>
        <div className={classes.drawerWrap}>
          <div className={classes.drawerLogo}>
            <Link href="/" onClick={() => setOpen(false)}>
              <img src="/assets/logo/logo-color-hr.svg" alt="PFST" className={classes.logo} />
            </Link>
            <IconButton onClick={() => setOpen(false)} aria-label="close">
              <MenuIcon />
            </IconButton>
          </div>
          <HeaderMenu menuItems={menuItems || []} variant="horizontal" />
          <Link href="/upisi" onClick={() => setOpen(false)} className={classes.drawerCta}>
            Upisi
          </Link>
        </div>
      </Drawer>
    </>
  );
}
