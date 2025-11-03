"use client";
import Link from "next/link";
import classes from "./HeaderMenu.module.css";
import { Box, Grid, Typography } from "@mui/material";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeaderMenu({ menuItems, variant = "horizontal" }) {
  if (variant === "vertical") {
    return (
      <nav className={`${classes.menu} ${classes.vertical}`}>
        {menuItems.map((it) => (
          <Link key={it.databaseId} href={it.uri} className={classes.vItem}>
            <Typography variant="h6">{it.label}</Typography>
          </Link>
        ))}
      </nav>
    );
  }

  const rootRef = useRef(null);
  const overlayRef = useRef(null);
  const backdropRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const overlay = overlayRef.current;
      const backdrop = backdropRef.current;
      const items = gsap.utils.toArray(`.${classes.hasChildren}`, root);
      const allLinks = root.querySelectorAll("a");
      const initialColor = getComputedStyle(allLinks[0])?.color || "inherit";
      // gsap.set(overlay, { height: "100%" });
      items.forEach((it) => {
        const submenu = it.querySelector(`.${classes.subMenu}`);
        const subs = submenu ? submenu.querySelectorAll(`.${classes.subMenuItem}`) : [];
        gsap.set(subs, { opacity: 0, y: -10 });

        it.addEventListener("mouseenter", () => {
          const h = (submenu?.offsetHeight || 0) + it.offsetHeight;
          overlay.style.height = `${h}px`;

          gsap.to(backdrop, { opacity: 0.6, pointerEvents: "auto", duration: 0.3, ease: "power2.out" });
          gsap.to(allLinks, { color: "#000", duration: 0.3, ease: "power3.out" });
          gsap.to(subs, { opacity: 1, y: 0, duration: 0.3, stagger: 0.07, ease: "power3.out" });
        });

        it.addEventListener("mouseleave", () => {
          overlay.style.height = "0";

          gsap.to(backdrop, { opacity: 0, pointerEvents: "none", duration: 0.3, ease: "power2.in" });
          gsap.to(allLinks, { color: initialColor, duration: 0.3, ease: "power3.in" });
          gsap.to(subs, { opacity: 0, y: -10, duration: 0.3, stagger: 0.1, ease: "power3.in" });
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <>
      <nav className={classes.menu} ref={rootRef}>
        <Box className={classes.menuItems}>
          {menuItems.map((it) => (
            <Box key={it.databaseId} className={`${classes.menuItem} ${it.childNodes?.length ? classes.hasChildren : ""}`}>
              <Link href={it.uri} className={classes.topLink}>
                <Typography variant="h6" className={classes.label}>
                  {it.label}
                </Typography>
              </Link>
              {!!it.childNodes?.length && (
                <Box className={classes.subMenu}>
                  <Grid container>
                    {it.childNodes.map((subIt) => (
                      <Grid size={it.childNodes.length <= 3 ? 4 : 3} key={subIt.databaseId}>
                        <Box className={classes.subMenuItem}>
                          <Link href={subIt.uri}>
                            <Typography variant="subtitle1" className={classes.label}>
                              {subIt.label}
                            </Typography>
                          </Link>
                          {subIt.childNodes.map((subSubIt) => (
                            <Box className={classes.subSubMenuItem} key={subSubIt.databaseId}>
                              <Link href={subSubIt.uri}>
                                <Typography variant="subtitle1">{subSubIt.label}</Typography>
                              </Link>
                            </Box>
                          ))}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </nav>
      <div className={classes.overlay} ref={overlayRef} />
      <div className={classes.backdrop} ref={backdropRef} />
    </>
  );
}
