import classes from "./HeaderMenu.module.css";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeaderMenu({ menuItems }) {
  const rootRef = useRef(null);
  const overlayRef = useRef(null);
  const backdropRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const overlay = overlayRef.current;
      const backdrop = backdropRef.current;
      const items = root.querySelectorAll(`.${classes.hasChildren}`);

      const onEnter = (it) => {
        const submenu = it.querySelector(`.${classes.subMenu}`);
        if (!submenu) return;

        const cols = submenu.querySelectorAll(`.${classes.column}`);
        const heads = submenu.querySelectorAll(`.${classes.subMenuItem}`);
        const leaves = submenu.querySelectorAll(`.${classes.subSubMenuItem}`);

        gsap.killTweensOf([cols, heads]);
        gsap.set(leaves, { autoAlpha: 1, yPercent: 0 });
        gsap.set([cols, heads], { autoAlpha: 0, yPercent: -6 });

        const h = (submenu.scrollHeight || 0) + root.offsetHeight + 24;
        overlay.style.height = `${h}px`;

        gsap.to(backdrop, { autoAlpha: 0.6, duration: 0.14, onStart: () => (backdrop.style.pointerEvents = "auto") });
        gsap.to(cols, { autoAlpha: 1, yPercent: 0, duration: 0.14, stagger: 0.02, ease: "power2.out" });
        gsap.to(heads, { autoAlpha: 1, yPercent: 0, duration: 0.14, stagger: 0.01, ease: "power2.out", delay: 0.02 });
      };

      const onLeave = (it) => {
        const submenu = it.querySelector(`.${classes.subMenu}`);
        if (!submenu) return;

        const cols = submenu.querySelectorAll(`.${classes.column}`);
        const heads = submenu.querySelectorAll(`.${classes.subMenuItem}`);

        overlay.style.height = "0";
        gsap.to(backdrop, { autoAlpha: 0, duration: 0.14, onComplete: () => (backdrop.style.pointerEvents = "none") });
        gsap.killTweensOf([cols, heads]);
        gsap.to([cols, heads], { autoAlpha: 0, yPercent: -6, duration: 0.12, stagger: 0.01, ease: "power2.in" });
      };

      const fns = [];
      items.forEach((it) => {
        const enter = () => onEnter(it);
        const leave = () => onLeave(it);
        it.addEventListener("mouseenter", enter);
        it.addEventListener("mouseleave", leave);
        fns.push(() => {
          it.removeEventListener("mouseenter", enter);
          it.removeEventListener("mouseleave", leave);
        });
      });

      return () => fns.forEach((fn) => fn());
    },
    { scope: rootRef }
  );

  return (
    <>
      <Box as="nav" className={classes.navbar} ref={rootRef}>
        <Box component="ul" className={classes.menuItems}>
          {menuItems.map((menuItem) => (
            <Box component="li" key={menuItem.databaseId} className={`${classes.menuItem} ${menuItem.childNodes?.length ? classes.hasChildren : ""}`}>
              <Link href={menuItem.uri} className={classes.topLink}>
                <Box className={classes.inner}>
                  <Typography className={classes.label} variant="h6">
                    {menuItem.label}
                  </Typography>
                </Box>
                <Box className={classes.inner} aria-hidden="true">
                  <Typography className={classes.label} variant="h6">
                    {menuItem.label}
                  </Typography>
                </Box>
              </Link>

              {!!menuItem.childNodes?.length && (
                <Box className={classes.subMenu}>
                  <Box className={classes.columns}>
                    {menuItem.childNodes.map((subItem) => (
                      <Box key={subItem.databaseId} className={classes.column}>
                        <Box className={`${classes.subMenuItem} ${classes.columnHead}`}>
                          <Link href={subItem.uri}>
                            <Typography variant="h6" className={classes.label}>
                              {subItem.label}
                            </Typography>
                          </Link>
                        </Box>
                        {subItem.childNodes.map((subSubItem) => (
                          <Box className={classes.subSubMenuItem} key={subSubItem.databaseId}>
                            <Link href={subSubItem.uri}>
                              <Typography variant="subtitle1" className={classes.label}>
                                {subSubItem.label}
                              </Typography>
                            </Link>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box className={classes.overlay} ref={overlayRef} />
      <Box className={classes.backdrop} ref={backdropRef} />
    </>
  );
}
